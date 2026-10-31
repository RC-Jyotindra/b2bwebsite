import { Webhook } from "svix";
import { headers } from "next/headers";
import type { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!SIGNING_SECRET) {
    console.error("Error: Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to your environment variables.");
    return new Response("Error: Missing CLERK_WEBHOOK_SECRET", { status: 400 });
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get raw body text for verification
  const body = await req.text();

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
    evt = JSON.parse(body) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, first_name, last_name, email_addresses, phone_numbers } = evt.data;

    const primaryEmail = email_addresses?.[0]?.email_address || "";
    const primaryPhone = phone_numbers?.[0]?.phone_number || "";

    const panelId = process.env.PANEL_ID || "ad4b2955-e074-449f-8bb9-794274ca2d36";
    const apiKey = process.env.PANEL_API_KEY;
    const baseUrl = process.env.PANEL_API_BASE_URL || "https://curioxm.com";

    if (apiKey && primaryEmail) {
      try {
        const panelPayload = {
          firstName: first_name || "Member",
          lastName: last_name || "User",
          email: primaryEmail,
          phone: primaryPhone,
          properties: {
            clerkId: id,
            source: "clerk_signup",
          },
        };

        console.log(`[Clerk Webhook] Ingesting new user ${id} into panel ${panelId}...`);

        const response = await fetch(`${baseUrl}/api/pmm/ingest/${panelId}/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Panel-Api-Key": apiKey.trim(),
          },
          body: JSON.stringify(panelPayload),
        });

        if (!response.ok) {
          const errText = await response.text();
          console.error(`[Clerk Webhook] Panel ingestion failed (${response.status}):`, errText);
        } else {
          console.log(`[Clerk Webhook] Successfully ingested user ${id} into panel!`);
        }
      } catch (err) {
        console.error("[Clerk Webhook] Error calling panel API:", err);
      }
    } else {
      console.warn("[Clerk Webhook] Skipped panel ingestion: missing PANEL_API_KEY or primary email.");
    }
  }

  return new Response("Webhook processed successfully", { status: 200 });
}

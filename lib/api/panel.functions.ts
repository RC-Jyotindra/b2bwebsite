"use server";

import process from "node:process";
import { waitlistSchema, type WaitlistInput, type PanelSchemaResponse } from "./panel.schema";

export async function getPanelSchema(panelId: string): Promise<PanelSchemaResponse> {
  const apiKey = process.env.PANEL_API_KEY;
  if (!apiKey) {
    throw new Error("Server configuration error: missing API key");
  }

  const response = await fetch(
    `https://surveybuilder.io/api/pmm/ingest/${panelId}/schema`,
    {
      headers: {
        "X-Panel-Api-Key": apiKey.trim(),
      },
      // next: { revalidate: 180 }, // 3minutes
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch schema: ${errorText}`);
  }

  const jsonSchema = await response.json();
  
  // Map JSON Schema to PanelField array
  const fields = [];
  const customProps = jsonSchema.properties?.properties?.properties || {};
  const requiredCustomProps = jsonSchema.properties?.properties?.required || [];

  for (const [key, fieldDef] of Object.entries<any>(customProps)) {
    let type: "TEXT" | "NUMBER" | "DATE" | "SINGLE_SELECT" | "MULTI_SELECT" | "TRUE_FALSE" | "EMAIL" = "TEXT";
    if (fieldDef.enum) {
      type = "SINGLE_SELECT";
    } else if (fieldDef.format === "date") {
      type = "DATE";
    } else if (fieldDef.type === "number") {
      type = "NUMBER";
    }

    fields.push({
      key,
      label: fieldDef.title || key,
      type,
      required: requiredCustomProps.includes(key),
      options: fieldDef.enum,
      stepIndex: typeof fieldDef.stepIndex === 'number' ? fieldDef.stepIndex : 0,
    });
  }

  return { fields };
}

export async function submitWaitlistForm(panelId: string, data: WaitlistInput) {
  try {
    const parsedData = waitlistSchema.parse(data);

    const apiKey = process.env.PANEL_API_KEY;
    if (!apiKey) {
      throw new Error("Server configuration error: missing API key");
    }

    const payload = {
      firstName: parsedData.firstName,
      lastName: parsedData.lastName,
      email: parsedData.email,
      phone: parsedData.phone,
      properties: parsedData.properties || {},
    };

    const response = await fetch(
      `https://surveybuilder.io/api/pmm/ingest/${panelId}/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Panel-Api-Key": apiKey.trim(),
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to submit waitlist form: ${errorText}`);
    }

    return { success: true };
  } catch (error: any) {
    console.error("Waitlist submission error:", error);
    throw new Error(error.message || "Failed to submit form");
  }
}

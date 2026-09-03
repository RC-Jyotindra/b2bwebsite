import { z } from "zod";

export interface PanelField {
  key: string;
  label: string;
  type: "TEXT" | "NUMBER" | "DATE" | "SINGLE_SELECT" | "MULTI_SELECT" | "TRUE_FALSE" | "EMAIL";
  description?: string;
  required?: boolean;
  options?: string[];
}

export interface PanelSchemaResponse {
  fields: PanelField[];
}

export const waitlistSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  properties: z.record(z.string(), z.any()).optional(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

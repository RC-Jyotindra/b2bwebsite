import { z } from "zod";

export interface PanelField {
  key: string;
  label: string;
  type: "TEXT" | "NUMBER" | "DATE" | "SINGLE_SELECT" | "MULTI_SELECT" | "TRUE_FALSE" | "EMAIL";
  description?: string;
  required?: boolean;
  options?: string[];
  stepIndex?: number; // <-- ADD THIS
}

export interface PanelSchemaResponse {
  fields: PanelField[];
}

export const waitlistSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Please confirm your password"),
  properties: z.record(z.string(), z.any()).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

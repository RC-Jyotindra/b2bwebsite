"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { submitWaitlistForm, getPanelSchema } from "@/lib/api/panel.functions";
import { waitlistSchema, type WaitlistInput, type PanelField } from "@/lib/api/panel.schema";
import { toast } from "sonner";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  panelId?: string;
}

export function WaitlistModal({ open, onOpenChange, panelId = "ad4b2955-e074-449f-8bb9-794274ca2d36" }: WaitlistModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [schemaFields, setSchemaFields] = useState<PanelField[]>([]);
  const [isLoadingSchema, setIsLoadingSchema] = useState(false);

  const form = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      properties: {},
    },
  });

  useEffect(() => {
    if (open && panelId) {
      setIsLoadingSchema(true);
      getPanelSchema(panelId)
        .then((res) => {
          setSchemaFields(res.fields || []);
        })
        .catch((err) => {
          console.error("Failed to fetch schema:", err);
          toast.error("Failed to load form fields");
        })
        .finally(() => {
          setIsLoadingSchema(false);
        });
    }
  }, [open, panelId]);

  async function onSubmit(data: WaitlistInput) {
    try {
      setIsSubmitting(true);
      await submitWaitlistForm(panelId, data);
      toast.success("Success! You have been added to the waitlist.");
      form.reset();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Determine grid span classes for different fields to make it look clean
  const getFieldColSpanClass = (key: string) => {
    const fullWidthFields = ["education_level", "employment_status", "email"];
    if (fullWidthFields.includes(key)) {
      return "col-span-1 md:col-span-2";
    }
    return "col-span-1";
  };

  const renderCustomField = (field: PanelField) => {
    const isStandardField = ["firstName", "lastName", "email", "phone"].includes(field.key);
    if (isStandardField) return null;

    return (
      <div key={field.key} className={getFieldColSpanClass(field.key)}>
        <FormField
          control={form.control}
          name={`properties.${field.key}` as any}
          render={({ field: formField }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-white text-xs uppercase tracking-wider font-semibold">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </FormLabel>
              <FormControl>
                {(() => {
                  switch (field.type) {
                    case "TEXT":
                    case "EMAIL":
                      return (
                        <Input
                          placeholder={field.label}
                          required={field.required}
                          className="bg-zinc-900 border-zinc-800 text-white placeholder:text-gray-500 rounded-none h-10 w-full focus-visible:ring-1 focus-visible:ring-apex-blue focus-visible:ring-offset-0"
                          {...formField}
                          value={formField.value || ''}
                        />
                      );
                    case "NUMBER":
                      return (
                        <Input
                          type="number"
                          placeholder={field.label}
                          required={field.required}
                          className="bg-zinc-900 border-zinc-800 text-white placeholder:text-gray-500 rounded-none h-10 w-full focus-visible:ring-1 focus-visible:ring-apex-blue focus-visible:ring-offset-0"
                          {...formField}
                          value={formField.value || ''}
                        />
                      );
                    case "DATE":
                      return (
                        <Input
                          type="date"
                          required={field.required}
                          className="bg-zinc-900 border-zinc-800 text-white placeholder:text-gray-500 rounded-none h-10 w-full focus-visible:ring-1 focus-visible:ring-apex-blue focus-visible:ring-offset-0"
                          {...formField}
                          value={formField.value || ''}
                        />
                      );
                    case "SINGLE_SELECT":
                      return (
                        <Select
                          onValueChange={formField.onChange}
                          value={formField.value || ''}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full bg-zinc-900 border-zinc-800 text-white rounded-none h-10 px-3 focus:ring-1 focus:ring-apex-blue focus:ring-offset-0 flex justify-between items-center">
                              <SelectValue placeholder={`Select ${field.label}`} className="text-white" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-zinc-950 border-zinc-800 text-white rounded-none">
                            {field.options?.map((opt) => (
                              <SelectItem key={opt} value={opt} className="focus:bg-zinc-800 focus:text-white text-white rounded-none">
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      );
                    case "MULTI_SELECT":
                      return (
                        <Input
                          placeholder="Comma separated values"
                          required={field.required}
                          className="bg-zinc-900 border-zinc-800 text-white placeholder:text-gray-500 rounded-none h-10 w-full focus-visible:ring-1 focus-visible:ring-apex-blue focus-visible:ring-offset-0"
                          {...formField}
                          value={formField.value || ''}
                        />
                      );
                    case "TRUE_FALSE":
                      return (
                        <div className="flex items-center space-x-2 mt-2 h-10">
                          <Checkbox
                            id={field.key}
                            checked={!!formField.value}
                            onCheckedChange={formField.onChange}
                            className="border-zinc-800 data-[state=checked]:bg-apex-blue data-[state=checked]:text-white"
                          />
                          <label
                            htmlFor={field.key}
                            className="text-xs font-semibold uppercase tracking-wider text-white cursor-pointer select-none"
                          >
                            {field.label}
                          </label>
                        </div>
                      );
                    default:
                      return (
                        <Input
                          placeholder={field.label}
                          required={field.required}
                          className="bg-zinc-900 border-zinc-800 text-white placeholder:text-gray-500 rounded-none h-10 w-full focus-visible:ring-1 focus-visible:ring-apex-blue"
                          {...formField}
                          value={formField.value || ''}
                        />
                      );
                  }
                })()}
              </FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] bg-apex-black text-white border-apex-blue/20 max-h-[90vh] overflow-y-auto rounded-none p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-heading font-bold text-white uppercase tracking-tight">
            Join ApexIntel Waitlist
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm mt-1">
            Provide your details below to apply to our clinical intelligence network.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
              
              {/* First Name */}
              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-white text-xs uppercase tracking-wider font-semibold">
                        First Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John"
                          required
                          className="bg-zinc-900 border-zinc-800 text-white placeholder:text-gray-500 rounded-none h-10 focus-visible:ring-1 focus-visible:ring-apex-blue focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Last Name */}
              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-white text-xs uppercase tracking-wider font-semibold">
                        Last Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Doe"
                          required
                          className="bg-zinc-900 border-zinc-800 text-white placeholder:text-gray-500 rounded-none h-10 focus-visible:ring-1 focus-visible:ring-apex-blue focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email Address */}
              <div className="col-span-1 md:col-span-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-white text-xs uppercase tracking-wider font-semibold">
                        Email Address <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john.doe@hospital.edu"
                          required
                          className="bg-zinc-900 border-zinc-800 text-white placeholder:text-gray-500 rounded-none h-10 focus-visible:ring-1 focus-visible:ring-apex-blue focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Phone Number */}
              <div className="col-span-1 md:col-span-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-white text-xs uppercase tracking-wider font-semibold">
                        Phone Number <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          required
                          className="bg-zinc-900 border-zinc-800 text-white placeholder:text-gray-500 rounded-none h-10 focus-visible:ring-1 focus-visible:ring-apex-blue focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Dynamic / Custom Fields */}
              {isLoadingSchema ? (
                <div className="col-span-1 md:col-span-2 text-sm text-gray-500 py-4 flex items-center justify-center">
                  Loading additional fields...
                </div>
              ) : (
                schemaFields.map(renderCustomField)
              )}

            </div>

            {/* Submission Section */}
            <div className="pt-4 flex justify-end border-t border-zinc-800/40">
              <button
                type="submit"
                disabled={isSubmitting || isLoadingSchema}
                className="rounded-none bg-apex-blue px-8 py-3 text-sm font-semibold text-white uppercase tracking-wider transition hover:bg-apex-blue-hover disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

import z from "zod";

export const DatePresetSchema = z.enum(["this_month", "last_month", "last_3_months", "last_6_months", "custom"]);
export type DatePreset = z.infer<typeof DatePresetSchema>;

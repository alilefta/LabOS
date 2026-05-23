import z from "zod";

export const DatePresetSchema = z.enum(["this_month", "last_month", "last_3_months", "last_6_months", "custom"]);
export type DatePreset = z.infer<typeof DatePresetSchema>;

// Consider moving this type to a shared schema file since it's used globally now
export const GlobalTimeFramePeriodSchema = z.enum(["30d", "90d", "ytd", "all"]);
export type GlobalTimeFramePeriod = "30d" | "90d" | "ytd" | "all";

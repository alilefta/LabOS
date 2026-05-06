import z from "zod";

export const ClinicDashboardTimeFramePeriodSchema = z.enum(["30d", "90d", "ytd", "all"]);
export type ClinicDashboardTimeFramePeriod = z.infer<typeof ClinicDashboardTimeFramePeriodSchema>;

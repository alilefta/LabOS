import z from "zod";

export const ClinicDashboardTimeFramePeriodSchema = z.enum(["30d", "90d", "ytd", "all"]);
export type ClinicDashboardTimeFramePeriod = z.infer<typeof ClinicDashboardTimeFramePeriodSchema>;

export const ClinicDashboardTabsSchema = z.enum(["overview", "pipeline", "roster", "ledger"]);
export type ClinicDashboardTab = z.infer<typeof ClinicDashboardTabsSchema>;

export const CLINIC_PAGE_TABS = ["overview", "pipeline", "roster", "ledger"] as const;
export const CLINIC_PAGE_TIME_PERIODS = ["30d", "90d", "ytd", "all"] as const; // adjust to your actual values

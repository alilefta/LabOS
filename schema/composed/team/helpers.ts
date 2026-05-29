// schema/composed/team/helpers.ts
import z from "zod";

export const TeamDashboardTabsSchema = z.enum(["overview", "cases", "payroll", "settings"]);
export type TeamDashboardTab = z.infer<typeof TeamDashboardTabsSchema>;

export const TeamDashboardTimeFramePeriodSchema = z.enum(["30d", "90d", "ytd", "all"]);
export type TeamDashboardTimeFramePeriod = z.infer<typeof TeamDashboardTimeFramePeriodSchema>;

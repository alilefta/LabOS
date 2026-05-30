import { endOfDay, startOfDay, startOfMonth, subMonths } from "date-fns";
import z from "zod";

export const DatePresetSchema = z.enum(["this_month", "last_month", "last_3_months", "last_6_months", "custom"]);
export type DatePreset = z.infer<typeof DatePresetSchema>;

// Consider moving this type to a shared schema file since it's used globally now
export const GlobalTimeFramePeriodSchema = z.enum(["30d", "90d", "ytd", "all"]);
export type GlobalTimeFramePeriod = "30d" | "90d" | "ytd" | "all";

// ── Date preset resolver ──────────────────────────────────────────────────────
export function resolveDatePreset(preset: DatePreset, from: Date | null, to: Date | null): { gte: Date; lte: Date } | null {
	const now = new Date();

	switch (preset) {
		case "this_month":
			return { gte: startOfMonth(now), lte: endOfDay(now) };
		case "last_month": {
			const start = startOfMonth(subMonths(now, 1));
			const end = endOfDay(new Date(now.getFullYear(), now.getMonth(), 0));
			return { gte: start, lte: end };
		}
		case "last_3_months":
			return { gte: startOfDay(subMonths(now, 3)), lte: endOfDay(now) };
		case "last_6_months":
			return { gte: startOfDay(subMonths(now, 6)), lte: endOfDay(now) };
		case "custom":
			if (!from || !to) return null;
			return { gte: startOfDay(from), lte: endOfDay(to) };
	}
}

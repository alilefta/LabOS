// schema/composed/team/payroll-history.dtos.ts

import { z } from "zod";

export const StaffPayoutHistoryItemSchema = z.object({
	id: z.string(), // "2026-05-24" - acts as the virtual primary key for row selection
	payoutDate: z.coerce.date(),
	casesCount: z.number().int().min(1),
	totalPaid: z.number().min(0),
	status: z.literal("SETTLED").default("SETTLED"), // History payouts are always settled
});

export type StaffPayoutHistoryItemDTO = z.infer<typeof StaffPayoutHistoryItemSchema>;

export const GetStaffPayoutHistoryResultSchema = z.object({
	payouts: z.array(StaffPayoutHistoryItemSchema),
	totalCount: z.number().int().min(0),
});

export type GetStaffPayoutHistoryResultDTO = z.infer<typeof GetStaffPayoutHistoryResultSchema>;

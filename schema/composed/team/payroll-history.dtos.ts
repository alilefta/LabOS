// schema/composed/team/payroll-history.dtos.ts

import { PayoutStatusSchema } from '@/schema/base/enums.base'
import { z } from 'zod'

export const StaffPayoutHistoryItemSchema = z.object({
	id: z.string(), // "2026-05-24" - acts as the virtual primary key for row selection
	payoutDate: z.coerce.date(),
	casesCount: z.number().int().min(1),
	totalPaid: z.number().min(0),
	status: PayoutStatusSchema, // History payouts are always settled
	payoutNumber: z.string(),
})

export type StaffPayoutHistoryItemDTO = z.infer<
	typeof StaffPayoutHistoryItemSchema
>

export const GetStaffPayoutHistoryResultSchema = z.object({
	payouts: z.array(StaffPayoutHistoryItemSchema),
	totalCount: z.number().int().min(0),
})

export type GetStaffPayoutHistoryResultDTO = z.infer<
	typeof GetStaffPayoutHistoryResultSchema
>

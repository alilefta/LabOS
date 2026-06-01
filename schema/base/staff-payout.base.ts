import z from 'zod'
import { PaymentMethodSchema, PayoutStatusSchema } from './enums.base'

export const StaffPayoutBaseSchema = z.object({
	id: z.string(),
	payoutNumber: z.string(),
	labId: z.string(),
	staffId: z.string(),
	amount: z.number(),
	method: PaymentMethodSchema,
	status: PayoutStatusSchema,
	reference: z.string().nullable(),
	notes: z.string().nullable(),

	paidAt: z.date().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
})

export type StaffPayoutBase = z.infer<typeof StaffPayoutBaseSchema>

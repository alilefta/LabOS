import * as z from 'zod';
import { PaymentMethodSchema } from '../../enums/PaymentMethod.schema';
import { PayoutStatusSchema } from '../../enums/PayoutStatus.schema';
// prettier-ignore
export const StaffPayoutInputSchema = z.object({
    id: z.string(),
    payoutNumber: z.string(),
    labId: z.string(),
    lab: z.unknown(),
    staffId: z.string(),
    staff: z.unknown(),
    amount: z.number(),
    method: PaymentMethodSchema,
    status: PayoutStatusSchema,
    reference: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
    caseAssignments: z.array(z.unknown()),
    paidAt: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type StaffPayoutInputType = z.infer<typeof StaffPayoutInputSchema>;

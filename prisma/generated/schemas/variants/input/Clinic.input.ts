import * as z from 'zod';
import { ClinicStatusSchema } from '../../enums/ClinicStatus.schema';
import { ClinicTypeSchema } from '../../enums/ClinicType.schema';
// prettier-ignore
export const ClinicInputSchema = z.object({
    id: z.string(),
    labId: z.string(),
    lab: z.unknown(),
    name: z.string(),
    description: z.string().optional().nullable(),
    website: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
    status: ClinicStatusSchema,
    type: ClinicTypeSchema,
    city: z.string(),
    zipcode: z.string().optional().nullable(),
    address1: z.string(),
    address2: z.string().optional().nullable(),
    email: z.string(),
    phoneNumber: z.string(),
    billingEmail: z.string().optional().nullable(),
    billingPhoneNumber: z.string().optional().nullable(),
    taxNumber: z.string().optional().nullable(),
    discount: z.number().optional().nullable(),
    creditLimit: z.number().optional().nullable(),
    currentBalance: z.number(),
    cases: z.array(z.unknown()),
    dentists: z.array(z.unknown()),
    casePricingPlans: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ClinicInputType = z.infer<typeof ClinicInputSchema>;

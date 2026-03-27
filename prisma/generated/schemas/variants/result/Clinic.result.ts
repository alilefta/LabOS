import * as z from 'zod';
import { ClinicStatusSchema } from '../../enums/ClinicStatus.schema';
import { ClinicTypeSchema } from '../../enums/ClinicType.schema';
// prettier-ignore
export const ClinicResultSchema = z.object({
    id: z.string(),
    labId: z.string(),
    lab: z.unknown(),
    name: z.string(),
    description: z.string().nullable(),
    website: z.string().nullable(),
    notes: z.string().nullable(),
    status: ClinicStatusSchema,
    type: ClinicTypeSchema,
    city: z.string(),
    zipcode: z.string().nullable(),
    address1: z.string(),
    address2: z.string().nullable(),
    email: z.string(),
    phoneNumber: z.string(),
    billingEmail: z.string().nullable(),
    billingPhoneNumber: z.string().nullable(),
    taxNumber: z.string().nullable(),
    discount: z.number().nullable(),
    creditLimit: z.number().nullable(),
    currentBalance: z.number(),
    cases: z.array(z.unknown()),
    dentists: z.array(z.unknown()),
    casePricingPlans: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ClinicResultType = z.infer<typeof ClinicResultSchema>;

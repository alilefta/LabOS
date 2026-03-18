import * as z from 'zod';
// prettier-ignore
export const PatientInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional().nullable(),
    city: z.string(),
    zipcode: z.string(),
    address1: z.string(),
    address2: z.string().optional().nullable(),
    email: z.string(),
    phoneNumber: z.string(),
    case: z.array(z.unknown()),
    labId: z.string(),
    Lab: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type PatientInputType = z.infer<typeof PatientInputSchema>;

import * as z from 'zod';
// prettier-ignore
export const PatientInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional().nullable(),
    city: z.string(),
    zipcode: z.string().optional().nullable(),
    address1: z.string(),
    address2: z.string().optional().nullable(),
    email: z.string().optional().nullable(),
    phoneNumber: z.string().optional().nullable(),
    cases: z.array(z.unknown()),
    labId: z.string(),
    lab: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type PatientInputType = z.infer<typeof PatientInputSchema>;

import * as z from 'zod';
// prettier-ignore
export const PatientModelSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    city: z.string(),
    zipcode: z.string().nullable(),
    address1: z.string(),
    address2: z.string().nullable(),
    email: z.string().nullable(),
    phoneNumber: z.string().nullable(),
    cases: z.array(z.unknown()),
    labId: z.string(),
    lab: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type PatientPureType = z.infer<typeof PatientModelSchema>;

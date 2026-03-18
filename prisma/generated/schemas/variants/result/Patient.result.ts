import * as z from 'zod';
// prettier-ignore
export const PatientResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    city: z.string(),
    zipcode: z.string(),
    address1: z.string(),
    address2: z.string().nullable(),
    email: z.string(),
    phoneNumber: z.string(),
    case: z.array(z.unknown()),
    labId: z.string(),
    Lab: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type PatientResultType = z.infer<typeof PatientResultSchema>;

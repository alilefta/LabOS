import * as z from 'zod';
// prettier-ignore
export const ClinicModelSchema = z.object({
    id: z.string(),
    labId: z.string(),
    Lab: z.unknown(),
    name: z.string(),
    description: z.string().nullable(),
    city: z.string(),
    zipcode: z.string(),
    address1: z.string(),
    address2: z.string().nullable(),
    email: z.string(),
    phoneNumber: z.string(),
    cases: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ClinicPureType = z.infer<typeof ClinicModelSchema>;

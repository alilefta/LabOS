import * as z from 'zod';
// prettier-ignore
export const SalesRepresentativeModelSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    city: z.string(),
    zipcode: z.string().nullable(),
    address1: z.string(),
    address2: z.string().nullable(),
    labId: z.string(),
    lab: z.unknown(),
    email: z.string(),
    phoneNumber: z.string(),
    avatarUrl: z.string(),
    cases: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type SalesRepresentativePureType = z.infer<typeof SalesRepresentativeModelSchema>;

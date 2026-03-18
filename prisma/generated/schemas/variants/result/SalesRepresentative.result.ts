import * as z from 'zod';
// prettier-ignore
export const SalesRepresentativeResultSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    city: z.string(),
    zipcode: z.string(),
    address1: z.string(),
    address2: z.string().nullable(),
    labId: z.string(),
    Lab: z.unknown(),
    email: z.string(),
    phoneNumber: z.string(),
    avatarUrl: z.string(),
    cases: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type SalesRepresentativeResultType = z.infer<typeof SalesRepresentativeResultSchema>;

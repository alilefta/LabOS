import * as z from 'zod';
// prettier-ignore
export const TechnicianInputSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    city: z.string(),
    zipcode: z.string().optional().nullable(),
    address1: z.string(),
    address2: z.string().optional().nullable(),
    labId: z.string(),
    lab: z.unknown(),
    email: z.string(),
    phoneNumber: z.string(),
    avatarUrl: z.string(),
    cases: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type TechnicianInputType = z.infer<typeof TechnicianInputSchema>;

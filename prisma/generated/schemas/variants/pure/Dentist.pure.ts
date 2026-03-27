import * as z from 'zod';
// prettier-ignore
export const DentistModelSchema = z.object({
    id: z.string(),
    clinicId: z.string(),
    clinic: z.unknown(),
    labId: z.string(),
    lab: z.unknown(),
    name: z.string(),
    email: z.string().nullable(),
    phoneNumber: z.string().nullable(),
    isOwner: z.boolean(),
    isDefault: z.boolean(),
    notes: z.string().nullable(),
    cases: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type DentistPureType = z.infer<typeof DentistModelSchema>;

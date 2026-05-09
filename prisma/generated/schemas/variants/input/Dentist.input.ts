import * as z from 'zod';
// prettier-ignore
export const DentistInputSchema = z.object({
    id: z.string(),
    clinicId: z.string(),
    clinic: z.unknown(),
    labId: z.string(),
    lab: z.unknown(),
    name: z.string(),
    email: z.string().optional().nullable(),
    phoneNumber: z.string().optional().nullable(),
    isOwner: z.boolean(),
    isDefault: z.boolean(),
    notes: z.string().optional().nullable(),
    cases: z.array(z.unknown()),
    isActive: z.boolean(),
    avatarUrl: z.string().optional().nullable(),
    specialty: z.string().optional().nullable(),
    licenseNumber: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type DentistInputType = z.infer<typeof DentistInputSchema>;

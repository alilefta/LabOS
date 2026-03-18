import * as z from 'zod';
import { UserRoleSchema } from '../../enums/UserRole.schema';
// prettier-ignore
export const LabUserInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    city: z.string(),
    zipcode: z.string(),
    address1: z.string(),
    address2: z.string().optional().nullable(),
    avatarUrl: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    role: UserRoleSchema,
    labId: z.string(),
    Lab: z.unknown(),
    isActive: z.boolean(),
    lastTimeActive: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type LabUserInputType = z.infer<typeof LabUserInputSchema>;

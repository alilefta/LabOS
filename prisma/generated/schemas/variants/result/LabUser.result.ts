import * as z from 'zod';
import { UserRoleSchema } from '../../enums/UserRole.schema';
// prettier-ignore
export const LabUserResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    city: z.string(),
    zipcode: z.string(),
    address1: z.string(),
    address2: z.string().nullable(),
    avatarUrl: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    role: UserRoleSchema,
    labId: z.string(),
    Lab: z.unknown(),
    isActive: z.boolean(),
    lastTimeActive: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type LabUserResultType = z.infer<typeof LabUserResultSchema>;

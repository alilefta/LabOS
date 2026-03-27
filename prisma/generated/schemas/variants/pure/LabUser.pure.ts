import * as z from 'zod';
import { LabRoleSchema } from '../../enums/LabRole.schema';
// prettier-ignore
export const LabUserModelSchema = z.object({
    id: z.string(),
    name: z.string(),
    city: z.string(),
    zipcode: z.string().nullable(),
    address1: z.string(),
    address2: z.string().nullable(),
    avatarUrl: z.string(),
    secondaryEmail: z.string().nullable(),
    phoneNumber: z.string(),
    role: LabRoleSchema,
    authUserId: z.string(),
    authUser: z.unknown(),
    labId: z.string(),
    lab: z.unknown(),
    isActive: z.boolean(),
    lastTimeActive: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type LabUserPureType = z.infer<typeof LabUserModelSchema>;

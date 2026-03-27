import * as z from 'zod';
import { SuperUserRoleSchema } from '../../enums/SuperUserRole.schema';
// prettier-ignore
export const SuperUserModelSchema = z.object({
    id: z.string(),
    name: z.string(),
    city: z.string(),
    zipcode: z.string().nullable(),
    address1: z.string(),
    address2: z.string().nullable(),
    avatarUrl: z.string(),
    secondaryEmail: z.string().nullable(),
    phoneNumber: z.string(),
    role: SuperUserRoleSchema,
    authUserId: z.string(),
    authUser: z.unknown(),
    isActive: z.boolean(),
    lastTimeActive: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type SuperUserPureType = z.infer<typeof SuperUserModelSchema>;

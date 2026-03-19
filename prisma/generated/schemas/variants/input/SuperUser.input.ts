import * as z from 'zod';
import { UserRoleSchema } from '../../enums/UserRole.schema';
// prettier-ignore
export const SuperUserInputSchema = z.object({
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
    authUserId: z.string(),
    authUser: z.unknown(),
    isActive: z.boolean(),
    lastTimeActive: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type SuperUserInputType = z.infer<typeof SuperUserInputSchema>;

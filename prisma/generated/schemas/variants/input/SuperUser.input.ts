import * as z from 'zod';
import { SuperUserRoleSchema } from '../../enums/SuperUserRole.schema';
// prettier-ignore
export const SuperUserInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    city: z.string(),
    zipcode: z.string().optional().nullable(),
    address1: z.string(),
    address2: z.string().optional().nullable(),
    avatarUrl: z.string(),
    secondaryEmail: z.string().optional().nullable(),
    phoneNumber: z.string(),
    role: SuperUserRoleSchema,
    authUserId: z.string(),
    authUser: z.unknown(),
    isActive: z.boolean(),
    lastTimeActive: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type SuperUserInputType = z.infer<typeof SuperUserInputSchema>;

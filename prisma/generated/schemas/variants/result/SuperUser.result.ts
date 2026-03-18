import * as z from 'zod';
import { UserRoleSchema } from '../../enums/UserRole.schema';
// prettier-ignore
export const SuperUserResultSchema = z.object({
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
    isActive: z.boolean(),
    lastTimeActive: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type SuperUserResultType = z.infer<typeof SuperUserResultSchema>;

import * as z from 'zod';
import { LabRoleSchema } from '../../enums/LabRole.schema';
// prettier-ignore
export const LabUserResultSchema = z.object({
    id: z.string(),
    labId: z.string(),
    lab: z.unknown(),
    authUserId: z.string(),
    authUser: z.unknown(),
    labStaffId: z.string().nullable(),
    labStaff: z.unknown().nullable(),
    role: LabRoleSchema,
    isActive: z.boolean(),
    lastTimeActive: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    activityLogs: z.array(z.unknown())
}).strict();

export type LabUserResultType = z.infer<typeof LabUserResultSchema>;

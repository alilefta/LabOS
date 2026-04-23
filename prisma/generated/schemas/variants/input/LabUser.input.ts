import * as z from 'zod';
import { LabRoleSchema } from '../../enums/LabRole.schema';
// prettier-ignore
export const LabUserInputSchema = z.object({
    id: z.string(),
    labId: z.string(),
    lab: z.unknown(),
    authUserId: z.string(),
    authUser: z.unknown(),
    labStaffId: z.string().optional().nullable(),
    labStaff: z.unknown().optional().nullable(),
    role: LabRoleSchema,
    isActive: z.boolean(),
    lastTimeActive: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    activityLogs: z.array(z.unknown())
}).strict();

export type LabUserInputType = z.infer<typeof LabUserInputSchema>;

import * as z from 'zod';
export const LabUserUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  labId: z.string(),
  lab: z.unknown(),
  authUserId: z.string(),
  authUser: z.unknown(),
  labStaffId: z.string().optional(),
  labStaff: z.unknown().optional(),
  role: z.unknown(),
  isActive: z.boolean(),
  lastTimeActive: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  activityLogs: z.array(z.unknown())
}));
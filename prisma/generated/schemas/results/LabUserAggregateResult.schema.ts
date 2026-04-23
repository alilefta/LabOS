import * as z from 'zod';
export const LabUserAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    labId: z.number(),
    lab: z.number(),
    authUserId: z.number(),
    authUser: z.number(),
    labStaffId: z.number(),
    labStaff: z.number(),
    role: z.number(),
    isActive: z.number(),
    lastTimeActive: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    activityLogs: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    labId: z.string().nullable(),
    authUserId: z.string().nullable(),
    labStaffId: z.string().nullable(),
    lastTimeActive: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    labId: z.string().nullable(),
    authUserId: z.string().nullable(),
    labStaffId: z.string().nullable(),
    lastTimeActive: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});
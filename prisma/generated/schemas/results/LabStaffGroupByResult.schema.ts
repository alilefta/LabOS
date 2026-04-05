import * as z from 'zod';
export const LabStaffGroupByResultSchema = z.array(z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  labId: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  avatarUrl: z.string(),
  isActive: z.boolean(),
  jobTitle: z.string(),
  specialization: z.string(),
  commissionValue: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    firstName: z.number(),
    lastName: z.number(),
    labId: z.number(),
    lab: z.number(),
    email: z.number(),
    phoneNumber: z.number(),
    avatarUrl: z.number(),
    isActive: z.number(),
    roleCategory: z.number(),
    jobTitle: z.number(),
    specialization: z.number(),
    commissionType: z.number(),
    commissionValue: z.number(),
    cases: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    commissionValue: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    commissionValue: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    labId: z.string().nullable(),
    email: z.string().nullable(),
    phoneNumber: z.string().nullable(),
    avatarUrl: z.string().nullable(),
    jobTitle: z.string().nullable(),
    specialization: z.string().nullable(),
    commissionValue: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    labId: z.string().nullable(),
    email: z.string().nullable(),
    phoneNumber: z.string().nullable(),
    avatarUrl: z.string().nullable(),
    jobTitle: z.string().nullable(),
    specialization: z.string().nullable(),
    commissionValue: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));
import * as z from 'zod';
export const MemberAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    organizationId: z.number(),
    organization: z.number(),
    userId: z.number(),
    authuser: z.number(),
    role: z.number(),
    createdAt: z.number(),
    labStaff: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    organizationId: z.string().nullable(),
    userId: z.string().nullable(),
    role: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    organizationId: z.string().nullable(),
    userId: z.string().nullable(),
    role: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()});
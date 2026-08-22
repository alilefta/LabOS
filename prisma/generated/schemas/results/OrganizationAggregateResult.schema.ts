import * as z from 'zod';
export const OrganizationAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    name: z.number(),
    slug: z.number(),
    logo: z.number(),
    createdAt: z.number(),
    metadata: z.number(),
    members: z.number(),
    invitations: z.number(),
    lab: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    slug: z.string().nullable(),
    logo: z.string().nullable(),
    createdAt: z.date().nullable(),
    metadata: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    slug: z.string().nullable(),
    logo: z.string().nullable(),
    createdAt: z.date().nullable(),
    metadata: z.string().nullable()
  }).nullable().optional()});
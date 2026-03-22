import * as z from 'zod';
export const AuthUserGroupByResultSchema = z.array(z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  labId: z.string(),
  _count: z.object({
    id: z.number(),
    name: z.number(),
    email: z.number(),
    emailVerified: z.number(),
    image: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    role: z.number(),
    sessions: z.number(),
    accounts: z.number(),
    labUser: z.number(),
    superUser: z.number(),
    labId: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    email: z.string().nullable(),
    image: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    labId: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    email: z.string().nullable(),
    image: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    labId: z.string().nullable()
  }).nullable().optional()
}));
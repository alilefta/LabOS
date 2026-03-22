import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  email: z.literal(true).optional(),
  emailVerified: z.literal(true).optional(),
  image: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  role: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const AuthUserCountAggregateInputObjectSchema: z.ZodType<Prisma.AuthUserCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserCountAggregateInputType>;
export const AuthUserCountAggregateInputObjectZodSchema = makeSchema();

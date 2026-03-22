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
  labId: z.literal(true).optional()
}).strict();
export const AuthUserMinAggregateInputObjectSchema: z.ZodType<Prisma.AuthUserMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserMinAggregateInputType>;
export const AuthUserMinAggregateInputObjectZodSchema = makeSchema();

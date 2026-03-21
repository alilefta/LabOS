import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  city: z.literal(true).optional(),
  zipcode: z.literal(true).optional(),
  address1: z.literal(true).optional(),
  address2: z.literal(true).optional(),
  avatarUrl: z.literal(true).optional(),
  secondaryEmail: z.literal(true).optional(),
  phoneNumber: z.literal(true).optional(),
  role: z.literal(true).optional(),
  authUserId: z.literal(true).optional(),
  isActive: z.literal(true).optional(),
  lastTimeActive: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const SuperUserCountAggregateInputObjectSchema: z.ZodType<Prisma.SuperUserCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.SuperUserCountAggregateInputType>;
export const SuperUserCountAggregateInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  title: z.literal(true).optional(),
  slug: z.literal(true).optional(),
  brandAvatarUrl: z.literal(true).optional(),
  subtitle: z.literal(true).optional(),
  nextCaseNumber: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const LabCountAggregateInputObjectSchema: z.ZodType<Prisma.LabCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.LabCountAggregateInputType>;
export const LabCountAggregateInputObjectZodSchema = makeSchema();

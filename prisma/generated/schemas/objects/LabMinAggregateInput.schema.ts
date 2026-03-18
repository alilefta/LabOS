import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const LabMinAggregateInputObjectSchema: z.ZodType<Prisma.LabMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.LabMinAggregateInputType>;
export const LabMinAggregateInputObjectZodSchema = makeSchema();

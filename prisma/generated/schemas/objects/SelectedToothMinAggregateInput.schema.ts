import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  toothPosition: z.literal(true).optional(),
  caseWorkItemId: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const SelectedToothMinAggregateInputObjectSchema: z.ZodType<Prisma.SelectedToothMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothMinAggregateInputType>;
export const SelectedToothMinAggregateInputObjectZodSchema = makeSchema();

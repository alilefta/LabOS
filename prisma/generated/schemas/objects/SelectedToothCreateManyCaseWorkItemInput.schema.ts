import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ToothPositionSchema } from '../enums/ToothPosition.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  toothPosition: ToothPositionSchema,
  labId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const SelectedToothCreateManyCaseWorkItemInputObjectSchema: z.ZodType<Prisma.SelectedToothCreateManyCaseWorkItemInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothCreateManyCaseWorkItemInput>;
export const SelectedToothCreateManyCaseWorkItemInputObjectZodSchema = makeSchema();

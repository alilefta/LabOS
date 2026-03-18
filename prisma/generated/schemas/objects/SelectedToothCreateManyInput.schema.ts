import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ToothPositionSchema } from '../enums/ToothPosition.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  toothPosition: ToothPositionSchema,
  caseWorkItemId: z.string(),
  labId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const SelectedToothCreateManyInputObjectSchema: z.ZodType<Prisma.SelectedToothCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothCreateManyInput>;
export const SelectedToothCreateManyInputObjectZodSchema = makeSchema();

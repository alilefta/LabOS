import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ToothPositionSchema } from '../enums/ToothPosition.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  toothPosition: ToothPositionSchema,
  caseWorkItemId: z.string(),
  labId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();
export const SelectedToothUncheckedCreateInputObjectSchema: z.ZodType<Prisma.SelectedToothUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothUncheckedCreateInput>;
export const SelectedToothUncheckedCreateInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ToothPositionSchema } from '../enums/ToothPosition.schema';
import { LabCreateNestedOneWithoutSelectedTeethInputObjectSchema as LabCreateNestedOneWithoutSelectedTeethInputObjectSchema } from './LabCreateNestedOneWithoutSelectedTeethInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  toothPosition: ToothPositionSchema,
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Lab: z.lazy(() => LabCreateNestedOneWithoutSelectedTeethInputObjectSchema)
}).strict();
export const SelectedToothCreateWithoutCaseWorkItemInputObjectSchema: z.ZodType<Prisma.SelectedToothCreateWithoutCaseWorkItemInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothCreateWithoutCaseWorkItemInput>;
export const SelectedToothCreateWithoutCaseWorkItemInputObjectZodSchema = makeSchema();

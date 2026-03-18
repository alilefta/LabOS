import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ToothPositionSchema } from '../enums/ToothPosition.schema';
import { CaseWorkItemCreateNestedOneWithoutSelectedTeethInputObjectSchema as CaseWorkItemCreateNestedOneWithoutSelectedTeethInputObjectSchema } from './CaseWorkItemCreateNestedOneWithoutSelectedTeethInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  toothPosition: ToothPositionSchema,
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  caseWorkItem: z.lazy(() => CaseWorkItemCreateNestedOneWithoutSelectedTeethInputObjectSchema)
}).strict();
export const SelectedToothCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.SelectedToothCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothCreateWithoutLabInput>;
export const SelectedToothCreateWithoutLabInputObjectZodSchema = makeSchema();

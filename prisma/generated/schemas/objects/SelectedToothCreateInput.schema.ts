import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ToothPositionSchema } from '../enums/ToothPosition.schema';
import { CaseWorkItemCreateNestedOneWithoutSelectedTeethInputObjectSchema as CaseWorkItemCreateNestedOneWithoutSelectedTeethInputObjectSchema } from './CaseWorkItemCreateNestedOneWithoutSelectedTeethInput.schema';
import { LabCreateNestedOneWithoutSelectedTeethInputObjectSchema as LabCreateNestedOneWithoutSelectedTeethInputObjectSchema } from './LabCreateNestedOneWithoutSelectedTeethInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  toothPosition: ToothPositionSchema,
  createdAt: z.coerce.date().optional(),
  caseWorkItem: z.lazy(() => CaseWorkItemCreateNestedOneWithoutSelectedTeethInputObjectSchema),
  lab: z.lazy(() => LabCreateNestedOneWithoutSelectedTeethInputObjectSchema)
}).strict();
export const SelectedToothCreateInputObjectSchema: z.ZodType<Prisma.SelectedToothCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothCreateInput>;
export const SelectedToothCreateInputObjectZodSchema = makeSchema();

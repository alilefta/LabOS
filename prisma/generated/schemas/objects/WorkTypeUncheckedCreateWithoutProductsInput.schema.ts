import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemUncheckedCreateNestedManyWithoutWorkTypeInputObjectSchema as CaseWorkItemUncheckedCreateNestedManyWithoutWorkTypeInputObjectSchema } from './CaseWorkItemUncheckedCreateNestedManyWithoutWorkTypeInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  labId: z.string(),
  requireTeethSelection: z.boolean().optional(),
  caseCategoryId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemUncheckedCreateNestedManyWithoutWorkTypeInputObjectSchema).optional()
}).strict();
export const WorkTypeUncheckedCreateWithoutProductsInputObjectSchema: z.ZodType<Prisma.WorkTypeUncheckedCreateWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUncheckedCreateWithoutProductsInput>;
export const WorkTypeUncheckedCreateWithoutProductsInputObjectZodSchema = makeSchema();

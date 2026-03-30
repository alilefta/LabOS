import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductUncheckedCreateNestedManyWithoutWorkTypeInputObjectSchema as ProductUncheckedCreateNestedManyWithoutWorkTypeInputObjectSchema } from './ProductUncheckedCreateNestedManyWithoutWorkTypeInput.schema';
import { CaseWorkItemUncheckedCreateNestedManyWithoutWorkTypeInputObjectSchema as CaseWorkItemUncheckedCreateNestedManyWithoutWorkTypeInputObjectSchema } from './CaseWorkItemUncheckedCreateNestedManyWithoutWorkTypeInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  labId: z.string(),
  requireTeethSelection: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutWorkTypeInputObjectSchema).optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemUncheckedCreateNestedManyWithoutWorkTypeInputObjectSchema).optional()
}).strict();
export const WorkTypeUncheckedCreateWithoutCaseCategoryInputObjectSchema: z.ZodType<Prisma.WorkTypeUncheckedCreateWithoutCaseCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUncheckedCreateWithoutCaseCategoryInput>;
export const WorkTypeUncheckedCreateWithoutCaseCategoryInputObjectZodSchema = makeSchema();

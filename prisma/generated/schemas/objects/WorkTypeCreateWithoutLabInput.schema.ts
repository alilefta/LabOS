import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductCreateNestedManyWithoutWorkTypeInputObjectSchema as ProductCreateNestedManyWithoutWorkTypeInputObjectSchema } from './ProductCreateNestedManyWithoutWorkTypeInput.schema';
import { CaseWorkItemCreateNestedManyWithoutWorkTypeInputObjectSchema as CaseWorkItemCreateNestedManyWithoutWorkTypeInputObjectSchema } from './CaseWorkItemCreateNestedManyWithoutWorkTypeInput.schema';
import { CaseCategoryCreateNestedOneWithoutWorkTypesInputObjectSchema as CaseCategoryCreateNestedOneWithoutWorkTypesInputObjectSchema } from './CaseCategoryCreateNestedOneWithoutWorkTypesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  requireTeethSelection: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutWorkTypeInputObjectSchema).optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemCreateNestedManyWithoutWorkTypeInputObjectSchema).optional(),
  caseCategory: z.lazy(() => CaseCategoryCreateNestedOneWithoutWorkTypesInputObjectSchema)
}).strict();
export const WorkTypeCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.WorkTypeCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCreateWithoutLabInput>;
export const WorkTypeCreateWithoutLabInputObjectZodSchema = makeSchema();

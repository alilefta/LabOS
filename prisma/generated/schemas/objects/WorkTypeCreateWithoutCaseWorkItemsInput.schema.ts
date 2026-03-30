import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductCreateNestedManyWithoutWorkTypeInputObjectSchema as ProductCreateNestedManyWithoutWorkTypeInputObjectSchema } from './ProductCreateNestedManyWithoutWorkTypeInput.schema';
import { LabCreateNestedOneWithoutWorkTypesInputObjectSchema as LabCreateNestedOneWithoutWorkTypesInputObjectSchema } from './LabCreateNestedOneWithoutWorkTypesInput.schema';
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
  lab: z.lazy(() => LabCreateNestedOneWithoutWorkTypesInputObjectSchema),
  caseCategory: z.lazy(() => CaseCategoryCreateNestedOneWithoutWorkTypesInputObjectSchema)
}).strict();
export const WorkTypeCreateWithoutCaseWorkItemsInputObjectSchema: z.ZodType<Prisma.WorkTypeCreateWithoutCaseWorkItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCreateWithoutCaseWorkItemsInput>;
export const WorkTypeCreateWithoutCaseWorkItemsInputObjectZodSchema = makeSchema();

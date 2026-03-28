import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductCreateNestedManyWithoutWorkTypeInputObjectSchema as ProductCreateNestedManyWithoutWorkTypeInputObjectSchema } from './ProductCreateNestedManyWithoutWorkTypeInput.schema';
import { LabCreateNestedOneWithoutWorkTypesInputObjectSchema as LabCreateNestedOneWithoutWorkTypesInputObjectSchema } from './LabCreateNestedOneWithoutWorkTypesInput.schema';
import { CaseWorkItemCreateNestedManyWithoutWorkTypeInputObjectSchema as CaseWorkItemCreateNestedManyWithoutWorkTypeInputObjectSchema } from './CaseWorkItemCreateNestedManyWithoutWorkTypeInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  requireTeethSelection: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedManyWithoutWorkTypeInputObjectSchema).optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutWorkTypesInputObjectSchema),
  caseWorkItems: z.lazy(() => CaseWorkItemCreateNestedManyWithoutWorkTypeInputObjectSchema).optional()
}).strict();
export const WorkTypeCreateWithoutCaseCategoryInputObjectSchema: z.ZodType<Prisma.WorkTypeCreateWithoutCaseCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCreateWithoutCaseCategoryInput>;
export const WorkTypeCreateWithoutCaseCategoryInputObjectZodSchema = makeSchema();

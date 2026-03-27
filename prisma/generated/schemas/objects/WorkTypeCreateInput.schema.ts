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
  createdAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedManyWithoutWorkTypeInputObjectSchema).optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutWorkTypesInputObjectSchema),
  caseCategory: z.lazy(() => CaseCategoryCreateNestedOneWithoutWorkTypesInputObjectSchema)
}).strict();
export const WorkTypeCreateInputObjectSchema: z.ZodType<Prisma.WorkTypeCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCreateInput>;
export const WorkTypeCreateInputObjectZodSchema = makeSchema();

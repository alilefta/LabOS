import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductCreateNestedManyWithoutWorkTypeInputObjectSchema as ProductCreateNestedManyWithoutWorkTypeInputObjectSchema } from './ProductCreateNestedManyWithoutWorkTypeInput.schema';
import { LabCreateNestedOneWithoutWorkTypesInputObjectSchema as LabCreateNestedOneWithoutWorkTypesInputObjectSchema } from './LabCreateNestedOneWithoutWorkTypesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedManyWithoutWorkTypeInputObjectSchema).optional(),
  Lab: z.lazy(() => LabCreateNestedOneWithoutWorkTypesInputObjectSchema)
}).strict();
export const WorkTypeCreateWithoutCaseCategoryInputObjectSchema: z.ZodType<Prisma.WorkTypeCreateWithoutCaseCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCreateWithoutCaseCategoryInput>;
export const WorkTypeCreateWithoutCaseCategoryInputObjectZodSchema = makeSchema();

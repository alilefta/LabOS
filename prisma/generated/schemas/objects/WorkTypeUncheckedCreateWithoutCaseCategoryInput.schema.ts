import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductUncheckedCreateNestedManyWithoutWorkTypeInputObjectSchema as ProductUncheckedCreateNestedManyWithoutWorkTypeInputObjectSchema } from './ProductUncheckedCreateNestedManyWithoutWorkTypeInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  labId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductUncheckedCreateNestedManyWithoutWorkTypeInputObjectSchema).optional()
}).strict();
export const WorkTypeUncheckedCreateWithoutCaseCategoryInputObjectSchema: z.ZodType<Prisma.WorkTypeUncheckedCreateWithoutCaseCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUncheckedCreateWithoutCaseCategoryInput>;
export const WorkTypeUncheckedCreateWithoutCaseCategoryInputObjectZodSchema = makeSchema();

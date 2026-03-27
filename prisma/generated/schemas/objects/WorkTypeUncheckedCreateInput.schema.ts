import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductUncheckedCreateNestedManyWithoutWorkTypeInputObjectSchema as ProductUncheckedCreateNestedManyWithoutWorkTypeInputObjectSchema } from './ProductUncheckedCreateNestedManyWithoutWorkTypeInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  labId: z.string(),
  caseCategoryId: z.string(),
  createdAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductUncheckedCreateNestedManyWithoutWorkTypeInputObjectSchema).optional()
}).strict();
export const WorkTypeUncheckedCreateInputObjectSchema: z.ZodType<Prisma.WorkTypeUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUncheckedCreateInput>;
export const WorkTypeUncheckedCreateInputObjectZodSchema = makeSchema();

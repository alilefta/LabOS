import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { ProductCreateNestedOneWithoutAddonsInputObjectSchema as ProductCreateNestedOneWithoutAddonsInputObjectSchema } from './ProductCreateNestedOneWithoutAddonsInput.schema';
import { LabCreateNestedOneWithoutProductAddonsInputObjectSchema as LabCreateNestedOneWithoutProductAddonsInputObjectSchema } from './LabCreateNestedOneWithoutProductAddonsInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'price' must be a Decimal",
}),
  isArchived: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutAddonsInputObjectSchema),
  lab: z.lazy(() => LabCreateNestedOneWithoutProductAddonsInputObjectSchema)
}).strict();
export const ProductAddonCreateWithoutCaseWorkItemAddonsInputObjectSchema: z.ZodType<Prisma.ProductAddonCreateWithoutCaseWorkItemAddonsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonCreateWithoutCaseWorkItemAddonsInput>;
export const ProductAddonCreateWithoutCaseWorkItemAddonsInputObjectZodSchema = makeSchema();

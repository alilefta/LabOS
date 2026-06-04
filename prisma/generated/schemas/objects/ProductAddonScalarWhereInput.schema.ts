import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const productaddonscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ProductAddonScalarWhereInputObjectSchema), z.lazy(() => ProductAddonScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProductAddonScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProductAddonScalarWhereInputObjectSchema), z.lazy(() => ProductAddonScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  productId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  price: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'price' must be a Decimal",
})]).optional(),
  isArchived: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ProductAddonScalarWhereInputObjectSchema: z.ZodType<Prisma.ProductAddonScalarWhereInput> = productaddonscalarwhereinputSchema as unknown as z.ZodType<Prisma.ProductAddonScalarWhereInput>;
export const ProductAddonScalarWhereInputObjectZodSchema = productaddonscalarwhereinputSchema;

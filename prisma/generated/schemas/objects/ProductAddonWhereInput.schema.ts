import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { ProductScalarRelationFilterObjectSchema as ProductScalarRelationFilterObjectSchema } from './ProductScalarRelationFilter.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { CaseWorkItemAddonListRelationFilterObjectSchema as CaseWorkItemAddonListRelationFilterObjectSchema } from './CaseWorkItemAddonListRelationFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const productaddonwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ProductAddonWhereInputObjectSchema), z.lazy(() => ProductAddonWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProductAddonWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProductAddonWhereInputObjectSchema), z.lazy(() => ProductAddonWhereInputObjectSchema).array()]).optional(),
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
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  product: z.union([z.lazy(() => ProductScalarRelationFilterObjectSchema), z.lazy(() => ProductWhereInputObjectSchema)]).optional(),
  lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional(),
  caseWorkItemAddons: z.lazy(() => CaseWorkItemAddonListRelationFilterObjectSchema).optional()
}).strict();
export const ProductAddonWhereInputObjectSchema: z.ZodType<Prisma.ProductAddonWhereInput> = productaddonwhereinputSchema as unknown as z.ZodType<Prisma.ProductAddonWhereInput>;
export const ProductAddonWhereInputObjectZodSchema = productaddonwhereinputSchema;

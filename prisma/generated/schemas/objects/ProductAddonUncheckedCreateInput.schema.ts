import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonUncheckedCreateNestedManyWithoutAddonInputObjectSchema as CaseWorkItemAddonUncheckedCreateNestedManyWithoutAddonInputObjectSchema } from './CaseWorkItemAddonUncheckedCreateNestedManyWithoutAddonInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  productId: z.string(),
  labId: z.string(),
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
  caseWorkItemAddons: z.lazy(() => CaseWorkItemAddonUncheckedCreateNestedManyWithoutAddonInputObjectSchema).optional()
}).strict();
export const ProductAddonUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ProductAddonUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonUncheckedCreateInput>;
export const ProductAddonUncheckedCreateInputObjectZodSchema = makeSchema();

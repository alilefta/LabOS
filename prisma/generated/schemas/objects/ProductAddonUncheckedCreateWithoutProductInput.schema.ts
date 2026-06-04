import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemAddonUncheckedCreateNestedManyWithoutAddonInputObjectSchema as CaseWorkItemAddonUncheckedCreateNestedManyWithoutAddonInputObjectSchema } from './CaseWorkItemAddonUncheckedCreateNestedManyWithoutAddonInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
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
  updatedAt: z.coerce.date().optional(),
  caseWorkItemAddons: z.lazy(() => CaseWorkItemAddonUncheckedCreateNestedManyWithoutAddonInputObjectSchema).optional()
}).strict();
export const ProductAddonUncheckedCreateWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductAddonUncheckedCreateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonUncheckedCreateWithoutProductInput>;
export const ProductAddonUncheckedCreateWithoutProductInputObjectZodSchema = makeSchema();

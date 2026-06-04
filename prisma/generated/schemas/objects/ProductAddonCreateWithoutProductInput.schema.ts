import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { LabCreateNestedOneWithoutProductAddonsInputObjectSchema as LabCreateNestedOneWithoutProductAddonsInputObjectSchema } from './LabCreateNestedOneWithoutProductAddonsInput.schema';
import { CaseWorkItemAddonCreateNestedManyWithoutAddonInputObjectSchema as CaseWorkItemAddonCreateNestedManyWithoutAddonInputObjectSchema } from './CaseWorkItemAddonCreateNestedManyWithoutAddonInput.schema'

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
  lab: z.lazy(() => LabCreateNestedOneWithoutProductAddonsInputObjectSchema),
  caseWorkItemAddons: z.lazy(() => CaseWorkItemAddonCreateNestedManyWithoutAddonInputObjectSchema).optional()
}).strict();
export const ProductAddonCreateWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductAddonCreateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonCreateWithoutProductInput>;
export const ProductAddonCreateWithoutProductInputObjectZodSchema = makeSchema();

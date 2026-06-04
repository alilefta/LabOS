import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonCreateNestedOneWithoutCaseWorkItemAddonsInputObjectSchema as ProductAddonCreateNestedOneWithoutCaseWorkItemAddonsInputObjectSchema } from './ProductAddonCreateNestedOneWithoutCaseWorkItemAddonsInput.schema';
import { LabCreateNestedOneWithoutCaseWorkItemAddonsInputObjectSchema as LabCreateNestedOneWithoutCaseWorkItemAddonsInputObjectSchema } from './LabCreateNestedOneWithoutCaseWorkItemAddonsInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  priceSnapshot: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'priceSnapshot' must be a Decimal",
}),
  createdAt: z.coerce.date().optional(),
  addon: z.lazy(() => ProductAddonCreateNestedOneWithoutCaseWorkItemAddonsInputObjectSchema),
  lab: z.lazy(() => LabCreateNestedOneWithoutCaseWorkItemAddonsInputObjectSchema)
}).strict();
export const CaseWorkItemAddonCreateWithoutCaseWorkItemInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonCreateWithoutCaseWorkItemInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonCreateWithoutCaseWorkItemInput>;
export const CaseWorkItemAddonCreateWithoutCaseWorkItemInputObjectZodSchema = makeSchema();

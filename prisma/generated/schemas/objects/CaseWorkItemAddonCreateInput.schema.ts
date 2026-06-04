import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateNestedOneWithoutAddonsInputObjectSchema as CaseWorkItemCreateNestedOneWithoutAddonsInputObjectSchema } from './CaseWorkItemCreateNestedOneWithoutAddonsInput.schema';
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
  caseWorkItem: z.lazy(() => CaseWorkItemCreateNestedOneWithoutAddonsInputObjectSchema),
  addon: z.lazy(() => ProductAddonCreateNestedOneWithoutCaseWorkItemAddonsInputObjectSchema),
  lab: z.lazy(() => LabCreateNestedOneWithoutCaseWorkItemAddonsInputObjectSchema)
}).strict();
export const CaseWorkItemAddonCreateInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonCreateInput>;
export const CaseWorkItemAddonCreateInputObjectZodSchema = makeSchema();

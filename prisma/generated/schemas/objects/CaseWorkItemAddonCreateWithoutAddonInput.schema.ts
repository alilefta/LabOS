import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateNestedOneWithoutAddonsInputObjectSchema as CaseWorkItemCreateNestedOneWithoutAddonsInputObjectSchema } from './CaseWorkItemCreateNestedOneWithoutAddonsInput.schema';
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
  lab: z.lazy(() => LabCreateNestedOneWithoutCaseWorkItemAddonsInputObjectSchema)
}).strict();
export const CaseWorkItemAddonCreateWithoutAddonInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonCreateWithoutAddonInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonCreateWithoutAddonInput>;
export const CaseWorkItemAddonCreateWithoutAddonInputObjectZodSchema = makeSchema();

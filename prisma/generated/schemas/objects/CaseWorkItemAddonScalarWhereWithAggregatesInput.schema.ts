import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema as DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const caseworkitemaddonscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseWorkItemAddonScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CaseWorkItemAddonScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseWorkItemAddonScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseWorkItemAddonScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CaseWorkItemAddonScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  caseWorkItemId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  addonId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  priceSnapshot: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'priceSnapshot' must be a Decimal",
})]).optional(),
  labId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CaseWorkItemAddonScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonScalarWhereWithAggregatesInput> = caseworkitemaddonscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.CaseWorkItemAddonScalarWhereWithAggregatesInput>;
export const CaseWorkItemAddonScalarWhereWithAggregatesInputObjectZodSchema = caseworkitemaddonscalarwherewithaggregatesinputSchema;

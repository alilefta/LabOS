import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const caseworkitemaddonscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseWorkItemAddonScalarWhereInputObjectSchema), z.lazy(() => CaseWorkItemAddonScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseWorkItemAddonScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseWorkItemAddonScalarWhereInputObjectSchema), z.lazy(() => CaseWorkItemAddonScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  caseWorkItemId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  addonId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  priceSnapshot: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'priceSnapshot' must be a Decimal",
})]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CaseWorkItemAddonScalarWhereInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonScalarWhereInput> = caseworkitemaddonscalarwhereinputSchema as unknown as z.ZodType<Prisma.CaseWorkItemAddonScalarWhereInput>;
export const CaseWorkItemAddonScalarWhereInputObjectZodSchema = caseworkitemaddonscalarwhereinputSchema;

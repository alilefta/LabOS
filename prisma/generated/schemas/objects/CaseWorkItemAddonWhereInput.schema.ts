import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { CaseWorkItemScalarRelationFilterObjectSchema as CaseWorkItemScalarRelationFilterObjectSchema } from './CaseWorkItemScalarRelationFilter.schema';
import { CaseWorkItemWhereInputObjectSchema as CaseWorkItemWhereInputObjectSchema } from './CaseWorkItemWhereInput.schema';
import { ProductAddonScalarRelationFilterObjectSchema as ProductAddonScalarRelationFilterObjectSchema } from './ProductAddonScalarRelationFilter.schema';
import { ProductAddonWhereInputObjectSchema as ProductAddonWhereInputObjectSchema } from './ProductAddonWhereInput.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const caseworkitemaddonwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseWorkItemAddonWhereInputObjectSchema), z.lazy(() => CaseWorkItemAddonWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseWorkItemAddonWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseWorkItemAddonWhereInputObjectSchema), z.lazy(() => CaseWorkItemAddonWhereInputObjectSchema).array()]).optional(),
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
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  caseWorkItem: z.union([z.lazy(() => CaseWorkItemScalarRelationFilterObjectSchema), z.lazy(() => CaseWorkItemWhereInputObjectSchema)]).optional(),
  addon: z.union([z.lazy(() => ProductAddonScalarRelationFilterObjectSchema), z.lazy(() => ProductAddonWhereInputObjectSchema)]).optional(),
  lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional()
}).strict();
export const CaseWorkItemAddonWhereInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonWhereInput> = caseworkitemaddonwhereinputSchema as unknown as z.ZodType<Prisma.CaseWorkItemAddonWhereInput>;
export const CaseWorkItemAddonWhereInputObjectZodSchema = caseworkitemaddonwhereinputSchema;

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { ProductListRelationFilterObjectSchema as ProductListRelationFilterObjectSchema } from './ProductListRelationFilter.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { CaseWorkItemListRelationFilterObjectSchema as CaseWorkItemListRelationFilterObjectSchema } from './CaseWorkItemListRelationFilter.schema';
import { CaseCategoryScalarRelationFilterObjectSchema as CaseCategoryScalarRelationFilterObjectSchema } from './CaseCategoryScalarRelationFilter.schema';
import { CaseCategoryWhereInputObjectSchema as CaseCategoryWhereInputObjectSchema } from './CaseCategoryWhereInput.schema'

const worktypewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => WorkTypeWhereInputObjectSchema), z.lazy(() => WorkTypeWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => WorkTypeWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => WorkTypeWhereInputObjectSchema), z.lazy(() => WorkTypeWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  imageUrl: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  requireTeethSelection: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  caseCategoryId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  products: z.lazy(() => ProductListRelationFilterObjectSchema).optional(),
  lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemListRelationFilterObjectSchema).optional(),
  caseCategory: z.union([z.lazy(() => CaseCategoryScalarRelationFilterObjectSchema), z.lazy(() => CaseCategoryWhereInputObjectSchema)]).optional()
}).strict();
export const WorkTypeWhereInputObjectSchema: z.ZodType<Prisma.WorkTypeWhereInput> = worktypewhereinputSchema as unknown as z.ZodType<Prisma.WorkTypeWhereInput>;
export const WorkTypeWhereInputObjectZodSchema = worktypewhereinputSchema;

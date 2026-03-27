import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { WorkTypeListRelationFilterObjectSchema as WorkTypeListRelationFilterObjectSchema } from './WorkTypeListRelationFilter.schema';
import { CaseListRelationFilterObjectSchema as CaseListRelationFilterObjectSchema } from './CaseListRelationFilter.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const casecategorywhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseCategoryWhereInputObjectSchema), z.lazy(() => CaseCategoryWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseCategoryWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseCategoryWhereInputObjectSchema), z.lazy(() => CaseCategoryWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  imageUrl: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  isActive: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  workTypes: z.lazy(() => WorkTypeListRelationFilterObjectSchema).optional(),
  cases: z.lazy(() => CaseListRelationFilterObjectSchema).optional(),
  lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional()
}).strict();
export const CaseCategoryWhereInputObjectSchema: z.ZodType<Prisma.CaseCategoryWhereInput> = casecategorywhereinputSchema as unknown as z.ZodType<Prisma.CaseCategoryWhereInput>;
export const CaseCategoryWhereInputObjectZodSchema = casecategorywhereinputSchema;

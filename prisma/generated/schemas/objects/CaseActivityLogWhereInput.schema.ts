import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumCaseActivityTypeFilterObjectSchema as EnumCaseActivityTypeFilterObjectSchema } from './EnumCaseActivityTypeFilter.schema';
import { CaseActivityTypeSchema } from '../enums/CaseActivityType.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { CaseScalarRelationFilterObjectSchema as CaseScalarRelationFilterObjectSchema } from './CaseScalarRelationFilter.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const caseactivitylogwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseActivityLogWhereInputObjectSchema), z.lazy(() => CaseActivityLogWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseActivityLogWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseActivityLogWhereInputObjectSchema), z.lazy(() => CaseActivityLogWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  caseId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  actorId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  actorName: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => EnumCaseActivityTypeFilterObjectSchema), CaseActivityTypeSchema]).optional(),
  summary: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  payload: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  case: z.union([z.lazy(() => CaseScalarRelationFilterObjectSchema), z.lazy(() => CaseWhereInputObjectSchema)]).optional(),
  lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional()
}).strict();
export const CaseActivityLogWhereInputObjectSchema: z.ZodType<Prisma.CaseActivityLogWhereInput> = caseactivitylogwhereinputSchema as unknown as z.ZodType<Prisma.CaseActivityLogWhereInput>;
export const CaseActivityLogWhereInputObjectZodSchema = caseactivitylogwhereinputSchema;

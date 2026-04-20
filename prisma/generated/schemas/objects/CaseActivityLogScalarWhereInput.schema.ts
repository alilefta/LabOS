import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumCaseActivityTypeFilterObjectSchema as EnumCaseActivityTypeFilterObjectSchema } from './EnumCaseActivityTypeFilter.schema';
import { CaseActivityTypeSchema } from '../enums/CaseActivityType.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const caseactivitylogscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseActivityLogScalarWhereInputObjectSchema), z.lazy(() => CaseActivityLogScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseActivityLogScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseActivityLogScalarWhereInputObjectSchema), z.lazy(() => CaseActivityLogScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  caseId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  actorId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  actorName: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => EnumCaseActivityTypeFilterObjectSchema), CaseActivityTypeSchema]).optional(),
  summary: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  payload: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CaseActivityLogScalarWhereInputObjectSchema: z.ZodType<Prisma.CaseActivityLogScalarWhereInput> = caseactivitylogscalarwhereinputSchema as unknown as z.ZodType<Prisma.CaseActivityLogScalarWhereInput>;
export const CaseActivityLogScalarWhereInputObjectZodSchema = caseactivitylogscalarwhereinputSchema;

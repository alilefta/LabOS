import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { EnumCaseActivityTypeWithAggregatesFilterObjectSchema as EnumCaseActivityTypeWithAggregatesFilterObjectSchema } from './EnumCaseActivityTypeWithAggregatesFilter.schema';
import { CaseActivityTypeSchema } from '../enums/CaseActivityType.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const caseactivitylogscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseActivityLogScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CaseActivityLogScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseActivityLogScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseActivityLogScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CaseActivityLogScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  caseId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  actorId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  actorName: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => EnumCaseActivityTypeWithAggregatesFilterObjectSchema), CaseActivityTypeSchema]).optional(),
  summary: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  payload: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CaseActivityLogScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.CaseActivityLogScalarWhereWithAggregatesInput> = caseactivitylogscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.CaseActivityLogScalarWhereWithAggregatesInput>;
export const CaseActivityLogScalarWhereWithAggregatesInputObjectZodSchema = caseactivitylogscalarwherewithaggregatesinputSchema;

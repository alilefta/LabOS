import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStatusSchema } from '../enums/CaseStatus.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumCaseStatusFilterObjectSchema as NestedEnumCaseStatusFilterObjectSchema } from './NestedEnumCaseStatusFilter.schema'

const nestedenumcasestatuswithaggregatesfilterSchema = z.object({
  equals: CaseStatusSchema.optional(),
  in: CaseStatusSchema.array().optional(),
  notIn: CaseStatusSchema.array().optional(),
  not: z.union([CaseStatusSchema, z.lazy(() => NestedEnumCaseStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCaseStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCaseStatusFilterObjectSchema).optional()
}).strict();
export const NestedEnumCaseStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumCaseStatusWithAggregatesFilter> = nestedenumcasestatuswithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumCaseStatusWithAggregatesFilter>;
export const NestedEnumCaseStatusWithAggregatesFilterObjectZodSchema = nestedenumcasestatuswithaggregatesfilterSchema;

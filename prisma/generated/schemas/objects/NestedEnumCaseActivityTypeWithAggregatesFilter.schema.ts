import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityTypeSchema } from '../enums/CaseActivityType.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumCaseActivityTypeFilterObjectSchema as NestedEnumCaseActivityTypeFilterObjectSchema } from './NestedEnumCaseActivityTypeFilter.schema'

const nestedenumcaseactivitytypewithaggregatesfilterSchema = z.object({
  equals: CaseActivityTypeSchema.optional(),
  in: CaseActivityTypeSchema.array().optional(),
  notIn: CaseActivityTypeSchema.array().optional(),
  not: z.union([CaseActivityTypeSchema, z.lazy(() => NestedEnumCaseActivityTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCaseActivityTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCaseActivityTypeFilterObjectSchema).optional()
}).strict();
export const NestedEnumCaseActivityTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumCaseActivityTypeWithAggregatesFilter> = nestedenumcaseactivitytypewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumCaseActivityTypeWithAggregatesFilter>;
export const NestedEnumCaseActivityTypeWithAggregatesFilterObjectZodSchema = nestedenumcaseactivitytypewithaggregatesfilterSchema;

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityTypeSchema } from '../enums/CaseActivityType.schema';
import { NestedEnumCaseActivityTypeWithAggregatesFilterObjectSchema as NestedEnumCaseActivityTypeWithAggregatesFilterObjectSchema } from './NestedEnumCaseActivityTypeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumCaseActivityTypeFilterObjectSchema as NestedEnumCaseActivityTypeFilterObjectSchema } from './NestedEnumCaseActivityTypeFilter.schema'

const makeSchema = () => z.object({
  equals: CaseActivityTypeSchema.optional(),
  in: CaseActivityTypeSchema.array().optional(),
  notIn: CaseActivityTypeSchema.array().optional(),
  not: z.union([CaseActivityTypeSchema, z.lazy(() => NestedEnumCaseActivityTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCaseActivityTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCaseActivityTypeFilterObjectSchema).optional()
}).strict();
export const EnumCaseActivityTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumCaseActivityTypeWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseActivityTypeWithAggregatesFilter>;
export const EnumCaseActivityTypeWithAggregatesFilterObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalValidatedSuffixSchema } from '../enums/CaseClinicalValidatedSuffix.schema';
import { NestedEnumCaseClinicalValidatedSuffixWithAggregatesFilterObjectSchema as NestedEnumCaseClinicalValidatedSuffixWithAggregatesFilterObjectSchema } from './NestedEnumCaseClinicalValidatedSuffixWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumCaseClinicalValidatedSuffixFilterObjectSchema as NestedEnumCaseClinicalValidatedSuffixFilterObjectSchema } from './NestedEnumCaseClinicalValidatedSuffixFilter.schema'

const makeSchema = () => z.object({
  equals: CaseClinicalValidatedSuffixSchema.optional(),
  in: CaseClinicalValidatedSuffixSchema.array().optional(),
  notIn: CaseClinicalValidatedSuffixSchema.array().optional(),
  not: z.union([CaseClinicalValidatedSuffixSchema, z.lazy(() => NestedEnumCaseClinicalValidatedSuffixWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCaseClinicalValidatedSuffixFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCaseClinicalValidatedSuffixFilterObjectSchema).optional()
}).strict();
export const EnumCaseClinicalValidatedSuffixWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumCaseClinicalValidatedSuffixWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseClinicalValidatedSuffixWithAggregatesFilter>;
export const EnumCaseClinicalValidatedSuffixWithAggregatesFilterObjectZodSchema = makeSchema();

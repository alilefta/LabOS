import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalValidatedSuffixSchema } from '../enums/CaseClinicalValidatedSuffix.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumCaseClinicalValidatedSuffixFilterObjectSchema as NestedEnumCaseClinicalValidatedSuffixFilterObjectSchema } from './NestedEnumCaseClinicalValidatedSuffixFilter.schema'

const nestedenumcaseclinicalvalidatedsuffixwithaggregatesfilterSchema = z.object({
  equals: CaseClinicalValidatedSuffixSchema.optional(),
  in: CaseClinicalValidatedSuffixSchema.array().optional(),
  notIn: CaseClinicalValidatedSuffixSchema.array().optional(),
  not: z.union([CaseClinicalValidatedSuffixSchema, z.lazy(() => NestedEnumCaseClinicalValidatedSuffixWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCaseClinicalValidatedSuffixFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCaseClinicalValidatedSuffixFilterObjectSchema).optional()
}).strict();
export const NestedEnumCaseClinicalValidatedSuffixWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumCaseClinicalValidatedSuffixWithAggregatesFilter> = nestedenumcaseclinicalvalidatedsuffixwithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumCaseClinicalValidatedSuffixWithAggregatesFilter>;
export const NestedEnumCaseClinicalValidatedSuffixWithAggregatesFilterObjectZodSchema = nestedenumcaseclinicalvalidatedsuffixwithaggregatesfilterSchema;

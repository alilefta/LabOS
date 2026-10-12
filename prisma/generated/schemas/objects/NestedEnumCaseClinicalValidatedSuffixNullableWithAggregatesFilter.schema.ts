import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalValidatedSuffixSchema } from '../enums/CaseClinicalValidatedSuffix.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumCaseClinicalValidatedSuffixNullableFilterObjectSchema as NestedEnumCaseClinicalValidatedSuffixNullableFilterObjectSchema } from './NestedEnumCaseClinicalValidatedSuffixNullableFilter.schema'

const nestedenumcaseclinicalvalidatedsuffixnullablewithaggregatesfilterSchema = z.object({
  equals: CaseClinicalValidatedSuffixSchema.optional().nullable(),
  in: CaseClinicalValidatedSuffixSchema.array().optional().nullable(),
  notIn: CaseClinicalValidatedSuffixSchema.array().optional().nullable(),
  not: z.union([CaseClinicalValidatedSuffixSchema, z.lazy(() => NestedEnumCaseClinicalValidatedSuffixNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCaseClinicalValidatedSuffixNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCaseClinicalValidatedSuffixNullableFilterObjectSchema).optional()
}).strict();
export const NestedEnumCaseClinicalValidatedSuffixNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumCaseClinicalValidatedSuffixNullableWithAggregatesFilter> = nestedenumcaseclinicalvalidatedsuffixnullablewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumCaseClinicalValidatedSuffixNullableWithAggregatesFilter>;
export const NestedEnumCaseClinicalValidatedSuffixNullableWithAggregatesFilterObjectZodSchema = nestedenumcaseclinicalvalidatedsuffixnullablewithaggregatesfilterSchema;

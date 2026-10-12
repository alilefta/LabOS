import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalValidatedSuffixSchema } from '../enums/CaseClinicalValidatedSuffix.schema'

const nestedenumcaseclinicalvalidatedsuffixnullablefilterSchema = z.object({
  equals: CaseClinicalValidatedSuffixSchema.optional().nullable(),
  in: CaseClinicalValidatedSuffixSchema.array().optional().nullable(),
  notIn: CaseClinicalValidatedSuffixSchema.array().optional().nullable(),
  not: z.union([CaseClinicalValidatedSuffixSchema, z.lazy(() => NestedEnumCaseClinicalValidatedSuffixNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const NestedEnumCaseClinicalValidatedSuffixNullableFilterObjectSchema: z.ZodType<Prisma.NestedEnumCaseClinicalValidatedSuffixNullableFilter> = nestedenumcaseclinicalvalidatedsuffixnullablefilterSchema as unknown as z.ZodType<Prisma.NestedEnumCaseClinicalValidatedSuffixNullableFilter>;
export const NestedEnumCaseClinicalValidatedSuffixNullableFilterObjectZodSchema = nestedenumcaseclinicalvalidatedsuffixnullablefilterSchema;

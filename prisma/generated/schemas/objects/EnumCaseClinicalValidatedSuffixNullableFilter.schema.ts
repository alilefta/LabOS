import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalValidatedSuffixSchema } from '../enums/CaseClinicalValidatedSuffix.schema';
import { NestedEnumCaseClinicalValidatedSuffixNullableFilterObjectSchema as NestedEnumCaseClinicalValidatedSuffixNullableFilterObjectSchema } from './NestedEnumCaseClinicalValidatedSuffixNullableFilter.schema'

const makeSchema = () => z.object({
  equals: CaseClinicalValidatedSuffixSchema.optional().nullable(),
  in: CaseClinicalValidatedSuffixSchema.array().optional().nullable(),
  notIn: CaseClinicalValidatedSuffixSchema.array().optional().nullable(),
  not: z.union([CaseClinicalValidatedSuffixSchema, z.lazy(() => NestedEnumCaseClinicalValidatedSuffixNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const EnumCaseClinicalValidatedSuffixNullableFilterObjectSchema: z.ZodType<Prisma.EnumCaseClinicalValidatedSuffixNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseClinicalValidatedSuffixNullableFilter>;
export const EnumCaseClinicalValidatedSuffixNullableFilterObjectZodSchema = makeSchema();

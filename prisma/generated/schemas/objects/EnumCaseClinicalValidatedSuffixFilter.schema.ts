import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalValidatedSuffixSchema } from '../enums/CaseClinicalValidatedSuffix.schema';
import { NestedEnumCaseClinicalValidatedSuffixFilterObjectSchema as NestedEnumCaseClinicalValidatedSuffixFilterObjectSchema } from './NestedEnumCaseClinicalValidatedSuffixFilter.schema'

const makeSchema = () => z.object({
  equals: CaseClinicalValidatedSuffixSchema.optional(),
  in: CaseClinicalValidatedSuffixSchema.array().optional(),
  notIn: CaseClinicalValidatedSuffixSchema.array().optional(),
  not: z.union([CaseClinicalValidatedSuffixSchema, z.lazy(() => NestedEnumCaseClinicalValidatedSuffixFilterObjectSchema)]).optional()
}).strict();
export const EnumCaseClinicalValidatedSuffixFilterObjectSchema: z.ZodType<Prisma.EnumCaseClinicalValidatedSuffixFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseClinicalValidatedSuffixFilter>;
export const EnumCaseClinicalValidatedSuffixFilterObjectZodSchema = makeSchema();

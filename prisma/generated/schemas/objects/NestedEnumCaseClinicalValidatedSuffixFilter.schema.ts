import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalValidatedSuffixSchema } from '../enums/CaseClinicalValidatedSuffix.schema'

const nestedenumcaseclinicalvalidatedsuffixfilterSchema = z.object({
  equals: CaseClinicalValidatedSuffixSchema.optional(),
  in: CaseClinicalValidatedSuffixSchema.array().optional(),
  notIn: CaseClinicalValidatedSuffixSchema.array().optional(),
  not: z.union([CaseClinicalValidatedSuffixSchema, z.lazy(() => NestedEnumCaseClinicalValidatedSuffixFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumCaseClinicalValidatedSuffixFilterObjectSchema: z.ZodType<Prisma.NestedEnumCaseClinicalValidatedSuffixFilter> = nestedenumcaseclinicalvalidatedsuffixfilterSchema as unknown as z.ZodType<Prisma.NestedEnumCaseClinicalValidatedSuffixFilter>;
export const NestedEnumCaseClinicalValidatedSuffixFilterObjectZodSchema = nestedenumcaseclinicalvalidatedsuffixfilterSchema;

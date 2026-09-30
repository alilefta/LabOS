import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalVerifiedFormatSchema } from '../enums/CaseClinicalVerifiedFormat.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumCaseClinicalVerifiedFormatFilterObjectSchema as NestedEnumCaseClinicalVerifiedFormatFilterObjectSchema } from './NestedEnumCaseClinicalVerifiedFormatFilter.schema'

const nestedenumcaseclinicalverifiedformatwithaggregatesfilterSchema = z.object({
  equals: CaseClinicalVerifiedFormatSchema.optional(),
  in: CaseClinicalVerifiedFormatSchema.array().optional(),
  notIn: CaseClinicalVerifiedFormatSchema.array().optional(),
  not: z.union([CaseClinicalVerifiedFormatSchema, z.lazy(() => NestedEnumCaseClinicalVerifiedFormatWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCaseClinicalVerifiedFormatFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCaseClinicalVerifiedFormatFilterObjectSchema).optional()
}).strict();
export const NestedEnumCaseClinicalVerifiedFormatWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumCaseClinicalVerifiedFormatWithAggregatesFilter> = nestedenumcaseclinicalverifiedformatwithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumCaseClinicalVerifiedFormatWithAggregatesFilter>;
export const NestedEnumCaseClinicalVerifiedFormatWithAggregatesFilterObjectZodSchema = nestedenumcaseclinicalverifiedformatwithaggregatesfilterSchema;

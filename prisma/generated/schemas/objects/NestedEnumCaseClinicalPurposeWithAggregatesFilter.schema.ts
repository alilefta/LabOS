import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumCaseClinicalPurposeFilterObjectSchema as NestedEnumCaseClinicalPurposeFilterObjectSchema } from './NestedEnumCaseClinicalPurposeFilter.schema'

const nestedenumcaseclinicalpurposewithaggregatesfilterSchema = z.object({
  equals: CaseClinicalPurposeSchema.optional(),
  in: CaseClinicalPurposeSchema.array().optional(),
  notIn: CaseClinicalPurposeSchema.array().optional(),
  not: z.union([CaseClinicalPurposeSchema, z.lazy(() => NestedEnumCaseClinicalPurposeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCaseClinicalPurposeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCaseClinicalPurposeFilterObjectSchema).optional()
}).strict();
export const NestedEnumCaseClinicalPurposeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumCaseClinicalPurposeWithAggregatesFilter> = nestedenumcaseclinicalpurposewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumCaseClinicalPurposeWithAggregatesFilter>;
export const NestedEnumCaseClinicalPurposeWithAggregatesFilterObjectZodSchema = nestedenumcaseclinicalpurposewithaggregatesfilterSchema;

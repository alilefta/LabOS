import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumCaseClinicalPurposeNullableFilterObjectSchema as NestedEnumCaseClinicalPurposeNullableFilterObjectSchema } from './NestedEnumCaseClinicalPurposeNullableFilter.schema'

const nestedenumcaseclinicalpurposenullablewithaggregatesfilterSchema = z.object({
  equals: CaseClinicalPurposeSchema.optional().nullable(),
  in: CaseClinicalPurposeSchema.array().optional().nullable(),
  notIn: CaseClinicalPurposeSchema.array().optional().nullable(),
  not: z.union([CaseClinicalPurposeSchema, z.lazy(() => NestedEnumCaseClinicalPurposeNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCaseClinicalPurposeNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCaseClinicalPurposeNullableFilterObjectSchema).optional()
}).strict();
export const NestedEnumCaseClinicalPurposeNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumCaseClinicalPurposeNullableWithAggregatesFilter> = nestedenumcaseclinicalpurposenullablewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumCaseClinicalPurposeNullableWithAggregatesFilter>;
export const NestedEnumCaseClinicalPurposeNullableWithAggregatesFilterObjectZodSchema = nestedenumcaseclinicalpurposenullablewithaggregatesfilterSchema;

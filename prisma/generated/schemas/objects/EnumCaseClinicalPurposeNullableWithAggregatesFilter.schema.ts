import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema';
import { NestedEnumCaseClinicalPurposeNullableWithAggregatesFilterObjectSchema as NestedEnumCaseClinicalPurposeNullableWithAggregatesFilterObjectSchema } from './NestedEnumCaseClinicalPurposeNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumCaseClinicalPurposeNullableFilterObjectSchema as NestedEnumCaseClinicalPurposeNullableFilterObjectSchema } from './NestedEnumCaseClinicalPurposeNullableFilter.schema'

const makeSchema = () => z.object({
  equals: CaseClinicalPurposeSchema.optional().nullable(),
  in: CaseClinicalPurposeSchema.array().optional().nullable(),
  notIn: CaseClinicalPurposeSchema.array().optional().nullable(),
  not: z.union([CaseClinicalPurposeSchema, z.lazy(() => NestedEnumCaseClinicalPurposeNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCaseClinicalPurposeNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCaseClinicalPurposeNullableFilterObjectSchema).optional()
}).strict();
export const EnumCaseClinicalPurposeNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumCaseClinicalPurposeNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseClinicalPurposeNullableWithAggregatesFilter>;
export const EnumCaseClinicalPurposeNullableWithAggregatesFilterObjectZodSchema = makeSchema();

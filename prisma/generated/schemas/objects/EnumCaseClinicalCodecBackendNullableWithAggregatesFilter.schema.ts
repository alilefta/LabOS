import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalCodecBackendSchema } from '../enums/CaseClinicalCodecBackend.schema';
import { NestedEnumCaseClinicalCodecBackendNullableWithAggregatesFilterObjectSchema as NestedEnumCaseClinicalCodecBackendNullableWithAggregatesFilterObjectSchema } from './NestedEnumCaseClinicalCodecBackendNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumCaseClinicalCodecBackendNullableFilterObjectSchema as NestedEnumCaseClinicalCodecBackendNullableFilterObjectSchema } from './NestedEnumCaseClinicalCodecBackendNullableFilter.schema'

const makeSchema = () => z.object({
  equals: CaseClinicalCodecBackendSchema.optional().nullable(),
  in: CaseClinicalCodecBackendSchema.array().optional().nullable(),
  notIn: CaseClinicalCodecBackendSchema.array().optional().nullable(),
  not: z.union([CaseClinicalCodecBackendSchema, z.lazy(() => NestedEnumCaseClinicalCodecBackendNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCaseClinicalCodecBackendNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCaseClinicalCodecBackendNullableFilterObjectSchema).optional()
}).strict();
export const EnumCaseClinicalCodecBackendNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumCaseClinicalCodecBackendNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseClinicalCodecBackendNullableWithAggregatesFilter>;
export const EnumCaseClinicalCodecBackendNullableWithAggregatesFilterObjectZodSchema = makeSchema();

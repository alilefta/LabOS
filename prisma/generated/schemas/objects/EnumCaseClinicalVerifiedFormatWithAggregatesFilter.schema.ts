import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalVerifiedFormatSchema } from '../enums/CaseClinicalVerifiedFormat.schema';
import { NestedEnumCaseClinicalVerifiedFormatWithAggregatesFilterObjectSchema as NestedEnumCaseClinicalVerifiedFormatWithAggregatesFilterObjectSchema } from './NestedEnumCaseClinicalVerifiedFormatWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumCaseClinicalVerifiedFormatFilterObjectSchema as NestedEnumCaseClinicalVerifiedFormatFilterObjectSchema } from './NestedEnumCaseClinicalVerifiedFormatFilter.schema'

const makeSchema = () => z.object({
  equals: CaseClinicalVerifiedFormatSchema.optional(),
  in: CaseClinicalVerifiedFormatSchema.array().optional(),
  notIn: CaseClinicalVerifiedFormatSchema.array().optional(),
  not: z.union([CaseClinicalVerifiedFormatSchema, z.lazy(() => NestedEnumCaseClinicalVerifiedFormatWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCaseClinicalVerifiedFormatFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCaseClinicalVerifiedFormatFilterObjectSchema).optional()
}).strict();
export const EnumCaseClinicalVerifiedFormatWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumCaseClinicalVerifiedFormatWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseClinicalVerifiedFormatWithAggregatesFilter>;
export const EnumCaseClinicalVerifiedFormatWithAggregatesFilterObjectZodSchema = makeSchema();

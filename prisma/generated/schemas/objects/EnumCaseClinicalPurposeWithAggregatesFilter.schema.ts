import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema';
import { NestedEnumCaseClinicalPurposeWithAggregatesFilterObjectSchema as NestedEnumCaseClinicalPurposeWithAggregatesFilterObjectSchema } from './NestedEnumCaseClinicalPurposeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumCaseClinicalPurposeFilterObjectSchema as NestedEnumCaseClinicalPurposeFilterObjectSchema } from './NestedEnumCaseClinicalPurposeFilter.schema'

const makeSchema = () => z.object({
  equals: CaseClinicalPurposeSchema.optional(),
  in: CaseClinicalPurposeSchema.array().optional(),
  notIn: CaseClinicalPurposeSchema.array().optional(),
  not: z.union([CaseClinicalPurposeSchema, z.lazy(() => NestedEnumCaseClinicalPurposeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCaseClinicalPurposeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCaseClinicalPurposeFilterObjectSchema).optional()
}).strict();
export const EnumCaseClinicalPurposeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumCaseClinicalPurposeWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseClinicalPurposeWithAggregatesFilter>;
export const EnumCaseClinicalPurposeWithAggregatesFilterObjectZodSchema = makeSchema();

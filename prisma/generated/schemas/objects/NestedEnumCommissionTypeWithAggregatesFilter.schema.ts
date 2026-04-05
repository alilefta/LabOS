import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CommissionTypeSchema } from '../enums/CommissionType.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumCommissionTypeFilterObjectSchema as NestedEnumCommissionTypeFilterObjectSchema } from './NestedEnumCommissionTypeFilter.schema'

const nestedenumcommissiontypewithaggregatesfilterSchema = z.object({
  equals: CommissionTypeSchema.optional(),
  in: CommissionTypeSchema.array().optional(),
  notIn: CommissionTypeSchema.array().optional(),
  not: z.union([CommissionTypeSchema, z.lazy(() => NestedEnumCommissionTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCommissionTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCommissionTypeFilterObjectSchema).optional()
}).strict();
export const NestedEnumCommissionTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumCommissionTypeWithAggregatesFilter> = nestedenumcommissiontypewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumCommissionTypeWithAggregatesFilter>;
export const NestedEnumCommissionTypeWithAggregatesFilterObjectZodSchema = nestedenumcommissiontypewithaggregatesfilterSchema;

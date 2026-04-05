import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CommissionTypeSchema } from '../enums/CommissionType.schema';
import { NestedEnumCommissionTypeWithAggregatesFilterObjectSchema as NestedEnumCommissionTypeWithAggregatesFilterObjectSchema } from './NestedEnumCommissionTypeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumCommissionTypeFilterObjectSchema as NestedEnumCommissionTypeFilterObjectSchema } from './NestedEnumCommissionTypeFilter.schema'

const makeSchema = () => z.object({
  equals: CommissionTypeSchema.optional(),
  in: CommissionTypeSchema.array().optional(),
  notIn: CommissionTypeSchema.array().optional(),
  not: z.union([CommissionTypeSchema, z.lazy(() => NestedEnumCommissionTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCommissionTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCommissionTypeFilterObjectSchema).optional()
}).strict();
export const EnumCommissionTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumCommissionTypeWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCommissionTypeWithAggregatesFilter>;
export const EnumCommissionTypeWithAggregatesFilterObjectZodSchema = makeSchema();

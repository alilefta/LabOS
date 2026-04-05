import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CommissionTypeSchema } from '../enums/CommissionType.schema';
import { NestedEnumCommissionTypeFilterObjectSchema as NestedEnumCommissionTypeFilterObjectSchema } from './NestedEnumCommissionTypeFilter.schema'

const makeSchema = () => z.object({
  equals: CommissionTypeSchema.optional(),
  in: CommissionTypeSchema.array().optional(),
  notIn: CommissionTypeSchema.array().optional(),
  not: z.union([CommissionTypeSchema, z.lazy(() => NestedEnumCommissionTypeFilterObjectSchema)]).optional()
}).strict();
export const EnumCommissionTypeFilterObjectSchema: z.ZodType<Prisma.EnumCommissionTypeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCommissionTypeFilter>;
export const EnumCommissionTypeFilterObjectZodSchema = makeSchema();

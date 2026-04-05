import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CommissionTypeSchema } from '../enums/CommissionType.schema'

const nestedenumcommissiontypefilterSchema = z.object({
  equals: CommissionTypeSchema.optional(),
  in: CommissionTypeSchema.array().optional(),
  notIn: CommissionTypeSchema.array().optional(),
  not: z.union([CommissionTypeSchema, z.lazy(() => NestedEnumCommissionTypeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumCommissionTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumCommissionTypeFilter> = nestedenumcommissiontypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumCommissionTypeFilter>;
export const NestedEnumCommissionTypeFilterObjectZodSchema = nestedenumcommissiontypefilterSchema;

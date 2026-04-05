import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  commissionValue: SortOrderSchema.optional()
}).strict();
export const LabStaffSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.LabStaffSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffSumOrderByAggregateInput>;
export const LabStaffSumOrderByAggregateInputObjectZodSchema = makeSchema();

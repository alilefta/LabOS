import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  commissionValue: SortOrderSchema.optional()
}).strict();
export const LabStaffAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.LabStaffAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffAvgOrderByAggregateInput>;
export const LabStaffAvgOrderByAggregateInputObjectZodSchema = makeSchema();

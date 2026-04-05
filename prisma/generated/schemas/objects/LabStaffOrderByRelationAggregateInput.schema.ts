import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const LabStaffOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.LabStaffOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffOrderByRelationAggregateInput>;
export const LabStaffOrderByRelationAggregateInputObjectZodSchema = makeSchema();

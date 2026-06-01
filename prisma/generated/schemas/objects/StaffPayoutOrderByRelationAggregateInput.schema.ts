import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const StaffPayoutOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.StaffPayoutOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutOrderByRelationAggregateInput>;
export const StaffPayoutOrderByRelationAggregateInputObjectZodSchema = makeSchema();

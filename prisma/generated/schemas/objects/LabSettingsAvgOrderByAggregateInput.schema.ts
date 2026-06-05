import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  taxRatePercentage: SortOrderSchema.optional()
}).strict();
export const LabSettingsAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.LabSettingsAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSettingsAvgOrderByAggregateInput>;
export const LabSettingsAvgOrderByAggregateInputObjectZodSchema = makeSchema();

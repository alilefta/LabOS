import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  taxRatePercentage: SortOrderSchema.optional()
}).strict();
export const LabSettingsSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.LabSettingsSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSettingsSumOrderByAggregateInput>;
export const LabSettingsSumOrderByAggregateInputObjectZodSchema = makeSchema();

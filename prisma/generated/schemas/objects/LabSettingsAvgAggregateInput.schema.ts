import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  taxRatePercentage: z.literal(true).optional()
}).strict();
export const LabSettingsAvgAggregateInputObjectSchema: z.ZodType<Prisma.LabSettingsAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.LabSettingsAvgAggregateInputType>;
export const LabSettingsAvgAggregateInputObjectZodSchema = makeSchema();

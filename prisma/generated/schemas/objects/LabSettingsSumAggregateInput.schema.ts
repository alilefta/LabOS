import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  taxRatePercentage: z.literal(true).optional()
}).strict();
export const LabSettingsSumAggregateInputObjectSchema: z.ZodType<Prisma.LabSettingsSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.LabSettingsSumAggregateInputType>;
export const LabSettingsSumAggregateInputObjectZodSchema = makeSchema();

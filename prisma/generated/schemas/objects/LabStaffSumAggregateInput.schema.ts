import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  commissionValue: z.literal(true).optional()
}).strict();
export const LabStaffSumAggregateInputObjectSchema: z.ZodType<Prisma.LabStaffSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffSumAggregateInputType>;
export const LabStaffSumAggregateInputObjectZodSchema = makeSchema();

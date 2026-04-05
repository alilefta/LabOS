import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  commissionValue: z.literal(true).optional()
}).strict();
export const LabStaffAvgAggregateInputObjectSchema: z.ZodType<Prisma.LabStaffAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffAvgAggregateInputType>;
export const LabStaffAvgAggregateInputObjectZodSchema = makeSchema();

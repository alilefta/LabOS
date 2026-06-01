import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  payoutNumber: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  staffId: z.literal(true).optional(),
  amount: z.literal(true).optional(),
  method: z.literal(true).optional(),
  status: z.literal(true).optional(),
  reference: z.literal(true).optional(),
  notes: z.literal(true).optional(),
  paidAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const StaffPayoutMaxAggregateInputObjectSchema: z.ZodType<Prisma.StaffPayoutMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutMaxAggregateInputType>;
export const StaffPayoutMaxAggregateInputObjectZodSchema = makeSchema();

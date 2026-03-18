import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  patientId: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  salesRepsId: z.literal(true).optional(),
  status: z.literal(true).optional(),
  grandTotal: z.literal(true).optional(),
  clinicId: z.literal(true).optional(),
  technicianId: z.literal(true).optional(),
  deadline: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const CaseMinAggregateInputObjectSchema: z.ZodType<Prisma.CaseMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseMinAggregateInputType>;
export const CaseMinAggregateInputObjectZodSchema = makeSchema();

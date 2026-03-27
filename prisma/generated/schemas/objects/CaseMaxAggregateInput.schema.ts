import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  patientId: z.literal(true).optional(),
  caseNumber: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  salesRepsId: z.literal(true).optional(),
  caseCategoryId: z.literal(true).optional(),
  status: z.literal(true).optional(),
  grandTotal: z.literal(true).optional(),
  clinicId: z.literal(true).optional(),
  dentistId: z.literal(true).optional(),
  technicianId: z.literal(true).optional(),
  deadline: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const CaseMaxAggregateInputObjectSchema: z.ZodType<Prisma.CaseMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseMaxAggregateInputType>;
export const CaseMaxAggregateInputObjectZodSchema = makeSchema();

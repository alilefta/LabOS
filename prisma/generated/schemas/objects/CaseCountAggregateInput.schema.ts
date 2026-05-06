import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  patientId: z.literal(true).optional(),
  caseNumber: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  caseCategoryId: z.literal(true).optional(),
  status: z.literal(true).optional(),
  grandTotal: z.literal(true).optional(),
  clinicId: z.literal(true).optional(),
  dentistId: z.literal(true).optional(),
  notes: z.literal(true).optional(),
  deadline: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  isRemake: z.literal(true).optional(),
  originalCaseId: z.literal(true).optional(),
  failureReason: z.literal(true).optional(),
  failureFault: z.literal(true).optional(),
  completedAt: z.literal(true).optional(),
  deliveredAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const CaseCountAggregateInputObjectSchema: z.ZodType<Prisma.CaseCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseCountAggregateInputType>;
export const CaseCountAggregateInputObjectZodSchema = makeSchema();

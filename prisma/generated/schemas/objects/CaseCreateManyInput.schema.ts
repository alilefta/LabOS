import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { CaseStatusSchema } from '../enums/CaseStatus.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  patientId: z.string(),
  caseNumber: z.string(),
  labId: z.string(),
  caseCategoryId: z.string().optional().nullable(),
  status: CaseStatusSchema.optional(),
  grandTotal: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'grandTotal' must be a Decimal",
}).optional().nullable(),
  clinicId: z.string().optional().nullable(),
  dentistId: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  deadline: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const CaseCreateManyInputObjectSchema: z.ZodType<Prisma.CaseCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateManyInput>;
export const CaseCreateManyInputObjectZodSchema = makeSchema();

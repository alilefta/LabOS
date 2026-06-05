import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { CaseStatusSchema } from '../enums/CaseStatus.schema';
import { FaultPartySchema } from '../enums/FaultParty.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
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
  manualDiscountAmount: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'manualDiscountAmount' must be a Decimal",
}).optional(),
  manualDiscountReason: z.string().optional().nullable(),
  isWarranty: z.boolean().optional(),
  clinicId: z.string().optional().nullable(),
  dentistId: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  deadline: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isRemake: z.boolean().optional(),
  originalCaseId: z.string().optional().nullable(),
  failureReason: z.string().optional().nullable(),
  failureFault: FaultPartySchema.optional().nullable(),
  completedAt: z.coerce.date().optional().nullable(),
  deliveredAt: z.coerce.date().optional().nullable()
}).strict();
export const CaseCreateManyPatientInputObjectSchema: z.ZodType<Prisma.CaseCreateManyPatientInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateManyPatientInput>;
export const CaseCreateManyPatientInputObjectZodSchema = makeSchema();

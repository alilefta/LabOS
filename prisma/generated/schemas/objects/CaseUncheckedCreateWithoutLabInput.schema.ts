import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { CaseStatusSchema } from '../enums/CaseStatus.schema';
import { FaultPartySchema } from '../enums/FaultParty.schema';
import { CaseWorkItemUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema as CaseWorkItemUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema } from './CaseWorkItemUncheckedCreateNestedManyWithoutDentalCaseInput.schema';
import { CaseStaffAssignmentUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema as CaseStaffAssignmentUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema } from './CaseStaffAssignmentUncheckedCreateNestedManyWithoutDentalCaseInput.schema';
import { CaseActivityLogUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema as CaseActivityLogUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema } from './CaseActivityLogUncheckedCreateNestedManyWithoutDentalCaseInput.schema';
import { CaseAssetFileUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema as CaseAssetFileUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema } from './CaseAssetFileUncheckedCreateNestedManyWithoutDentalCaseInput.schema';
import { InvoiceCaseUncheckedCreateNestedOneWithoutCaseInputObjectSchema as InvoiceCaseUncheckedCreateNestedOneWithoutCaseInputObjectSchema } from './InvoiceCaseUncheckedCreateNestedOneWithoutCaseInput.schema';
import { CaseUncheckedCreateNestedManyWithoutOriginalCaseInputObjectSchema as CaseUncheckedCreateNestedManyWithoutOriginalCaseInputObjectSchema } from './CaseUncheckedCreateNestedManyWithoutOriginalCaseInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  patientId: z.string(),
  caseNumber: z.string(),
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
  updatedAt: z.coerce.date().optional(),
  isRemake: z.boolean().optional(),
  originalCaseId: z.string().optional().nullable(),
  failureReason: z.string().optional().nullable(),
  failureFault: FaultPartySchema.optional().nullable(),
  completedAt: z.coerce.date().optional().nullable(),
  deliveredAt: z.coerce.date().optional().nullable(),
  caseItems: z.lazy(() => CaseWorkItemUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema).optional(),
  staffAssignments: z.lazy(() => CaseStaffAssignmentUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema).optional(),
  caseActivityLogs: z.lazy(() => CaseActivityLogUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema).optional(),
  invoiceCase: z.lazy(() => InvoiceCaseUncheckedCreateNestedOneWithoutCaseInputObjectSchema).optional(),
  remakes: z.lazy(() => CaseUncheckedCreateNestedManyWithoutOriginalCaseInputObjectSchema).optional()
}).strict();
export const CaseUncheckedCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseUncheckedCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUncheckedCreateWithoutLabInput>;
export const CaseUncheckedCreateWithoutLabInputObjectZodSchema = makeSchema();

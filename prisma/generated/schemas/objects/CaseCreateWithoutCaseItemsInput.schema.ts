import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { CaseStatusSchema } from '../enums/CaseStatus.schema';
import { FaultPartySchema } from '../enums/FaultParty.schema';
import { PatientCreateNestedOneWithoutCasesInputObjectSchema as PatientCreateNestedOneWithoutCasesInputObjectSchema } from './PatientCreateNestedOneWithoutCasesInput.schema';
import { LabCreateNestedOneWithoutCasesInputObjectSchema as LabCreateNestedOneWithoutCasesInputObjectSchema } from './LabCreateNestedOneWithoutCasesInput.schema';
import { CaseCategoryCreateNestedOneWithoutCasesInputObjectSchema as CaseCategoryCreateNestedOneWithoutCasesInputObjectSchema } from './CaseCategoryCreateNestedOneWithoutCasesInput.schema';
import { ClinicCreateNestedOneWithoutCasesInputObjectSchema as ClinicCreateNestedOneWithoutCasesInputObjectSchema } from './ClinicCreateNestedOneWithoutCasesInput.schema';
import { DentistCreateNestedOneWithoutCasesInputObjectSchema as DentistCreateNestedOneWithoutCasesInputObjectSchema } from './DentistCreateNestedOneWithoutCasesInput.schema';
import { CaseStaffAssignmentCreateNestedManyWithoutDentalCaseInputObjectSchema as CaseStaffAssignmentCreateNestedManyWithoutDentalCaseInputObjectSchema } from './CaseStaffAssignmentCreateNestedManyWithoutDentalCaseInput.schema';
import { CaseActivityLogCreateNestedManyWithoutDentalCaseInputObjectSchema as CaseActivityLogCreateNestedManyWithoutDentalCaseInputObjectSchema } from './CaseActivityLogCreateNestedManyWithoutDentalCaseInput.schema';
import { CaseAssetFileCreateNestedManyWithoutDentalCaseInputObjectSchema as CaseAssetFileCreateNestedManyWithoutDentalCaseInputObjectSchema } from './CaseAssetFileCreateNestedManyWithoutDentalCaseInput.schema';
import { InvoiceCaseCreateNestedOneWithoutCaseInputObjectSchema as InvoiceCaseCreateNestedOneWithoutCaseInputObjectSchema } from './InvoiceCaseCreateNestedOneWithoutCaseInput.schema';
import { CaseCreateNestedOneWithoutRemakesInputObjectSchema as CaseCreateNestedOneWithoutRemakesInputObjectSchema } from './CaseCreateNestedOneWithoutRemakesInput.schema';
import { CaseCreateNestedManyWithoutOriginalCaseInputObjectSchema as CaseCreateNestedManyWithoutOriginalCaseInputObjectSchema } from './CaseCreateNestedManyWithoutOriginalCaseInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  caseNumber: z.string(),
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
  notes: z.string().optional().nullable(),
  deadline: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isRemake: z.boolean().optional(),
  failureReason: z.string().optional().nullable(),
  failureFault: FaultPartySchema.optional().nullable(),
  completedAt: z.coerce.date().optional().nullable(),
  deliveredAt: z.coerce.date().optional().nullable(),
  patient: z.lazy(() => PatientCreateNestedOneWithoutCasesInputObjectSchema),
  lab: z.lazy(() => LabCreateNestedOneWithoutCasesInputObjectSchema),
  caseCategory: z.lazy(() => CaseCategoryCreateNestedOneWithoutCasesInputObjectSchema).optional(),
  clinic: z.lazy(() => ClinicCreateNestedOneWithoutCasesInputObjectSchema).optional(),
  dentist: z.lazy(() => DentistCreateNestedOneWithoutCasesInputObjectSchema).optional(),
  staffAssignments: z.lazy(() => CaseStaffAssignmentCreateNestedManyWithoutDentalCaseInputObjectSchema).optional(),
  caseActivityLogs: z.lazy(() => CaseActivityLogCreateNestedManyWithoutDentalCaseInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileCreateNestedManyWithoutDentalCaseInputObjectSchema).optional(),
  invoiceCase: z.lazy(() => InvoiceCaseCreateNestedOneWithoutCaseInputObjectSchema).optional(),
  originalCase: z.lazy(() => CaseCreateNestedOneWithoutRemakesInputObjectSchema).optional(),
  remakes: z.lazy(() => CaseCreateNestedManyWithoutOriginalCaseInputObjectSchema).optional()
}).strict();
export const CaseCreateWithoutCaseItemsInputObjectSchema: z.ZodType<Prisma.CaseCreateWithoutCaseItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateWithoutCaseItemsInput>;
export const CaseCreateWithoutCaseItemsInputObjectZodSchema = makeSchema();

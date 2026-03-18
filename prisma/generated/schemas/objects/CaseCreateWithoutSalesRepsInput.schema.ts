import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { CaseStatusSchema } from '../enums/CaseStatus.schema';
import { PatientCreateNestedOneWithoutCaseInputObjectSchema as PatientCreateNestedOneWithoutCaseInputObjectSchema } from './PatientCreateNestedOneWithoutCaseInput.schema';
import { LabCreateNestedOneWithoutCasesInputObjectSchema as LabCreateNestedOneWithoutCasesInputObjectSchema } from './LabCreateNestedOneWithoutCasesInput.schema';
import { CaseWorkItemCreateNestedManyWithoutCaseInputObjectSchema as CaseWorkItemCreateNestedManyWithoutCaseInputObjectSchema } from './CaseWorkItemCreateNestedManyWithoutCaseInput.schema';
import { CaseCategoryCreateNestedManyWithoutCasesInputObjectSchema as CaseCategoryCreateNestedManyWithoutCasesInputObjectSchema } from './CaseCategoryCreateNestedManyWithoutCasesInput.schema';
import { ClinicCreateNestedOneWithoutCasesInputObjectSchema as ClinicCreateNestedOneWithoutCasesInputObjectSchema } from './ClinicCreateNestedOneWithoutCasesInput.schema';
import { TechnicianCreateNestedOneWithoutCasesInputObjectSchema as TechnicianCreateNestedOneWithoutCasesInputObjectSchema } from './TechnicianCreateNestedOneWithoutCasesInput.schema';
import { CaseAssetFileCreateNestedManyWithoutCaseInputObjectSchema as CaseAssetFileCreateNestedManyWithoutCaseInputObjectSchema } from './CaseAssetFileCreateNestedManyWithoutCaseInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  status: CaseStatusSchema.optional(),
  grandTotal: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'grandTotal' must be a Decimal",
}),
  deadline: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  patient: z.lazy(() => PatientCreateNestedOneWithoutCaseInputObjectSchema),
  Lab: z.lazy(() => LabCreateNestedOneWithoutCasesInputObjectSchema),
  caseItems: z.lazy(() => CaseWorkItemCreateNestedManyWithoutCaseInputObjectSchema).optional(),
  caseCategory: z.lazy(() => CaseCategoryCreateNestedManyWithoutCasesInputObjectSchema).optional(),
  clinic: z.lazy(() => ClinicCreateNestedOneWithoutCasesInputObjectSchema).optional(),
  Technician: z.lazy(() => TechnicianCreateNestedOneWithoutCasesInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileCreateNestedManyWithoutCaseInputObjectSchema).optional()
}).strict();
export const CaseCreateWithoutSalesRepsInputObjectSchema: z.ZodType<Prisma.CaseCreateWithoutSalesRepsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateWithoutSalesRepsInput>;
export const CaseCreateWithoutSalesRepsInputObjectZodSchema = makeSchema();

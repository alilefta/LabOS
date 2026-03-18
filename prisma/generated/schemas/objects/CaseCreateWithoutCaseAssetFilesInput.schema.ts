import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { CaseStatusSchema } from '../enums/CaseStatus.schema';
import { PatientCreateNestedOneWithoutCaseInputObjectSchema as PatientCreateNestedOneWithoutCaseInputObjectSchema } from './PatientCreateNestedOneWithoutCaseInput.schema';
import { LabCreateNestedOneWithoutCasesInputObjectSchema as LabCreateNestedOneWithoutCasesInputObjectSchema } from './LabCreateNestedOneWithoutCasesInput.schema';
import { SalesRepresentativeCreateNestedOneWithoutCasesInputObjectSchema as SalesRepresentativeCreateNestedOneWithoutCasesInputObjectSchema } from './SalesRepresentativeCreateNestedOneWithoutCasesInput.schema';
import { CaseWorkItemCreateNestedManyWithoutCaseInputObjectSchema as CaseWorkItemCreateNestedManyWithoutCaseInputObjectSchema } from './CaseWorkItemCreateNestedManyWithoutCaseInput.schema';
import { CaseCategoryCreateNestedManyWithoutCasesInputObjectSchema as CaseCategoryCreateNestedManyWithoutCasesInputObjectSchema } from './CaseCategoryCreateNestedManyWithoutCasesInput.schema';
import { ClinicCreateNestedOneWithoutCasesInputObjectSchema as ClinicCreateNestedOneWithoutCasesInputObjectSchema } from './ClinicCreateNestedOneWithoutCasesInput.schema';
import { TechnicianCreateNestedOneWithoutCasesInputObjectSchema as TechnicianCreateNestedOneWithoutCasesInputObjectSchema } from './TechnicianCreateNestedOneWithoutCasesInput.schema'

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
  salesReps: z.lazy(() => SalesRepresentativeCreateNestedOneWithoutCasesInputObjectSchema).optional(),
  caseItems: z.lazy(() => CaseWorkItemCreateNestedManyWithoutCaseInputObjectSchema).optional(),
  caseCategory: z.lazy(() => CaseCategoryCreateNestedManyWithoutCasesInputObjectSchema).optional(),
  clinic: z.lazy(() => ClinicCreateNestedOneWithoutCasesInputObjectSchema).optional(),
  Technician: z.lazy(() => TechnicianCreateNestedOneWithoutCasesInputObjectSchema).optional()
}).strict();
export const CaseCreateWithoutCaseAssetFilesInputObjectSchema: z.ZodType<Prisma.CaseCreateWithoutCaseAssetFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateWithoutCaseAssetFilesInput>;
export const CaseCreateWithoutCaseAssetFilesInputObjectZodSchema = makeSchema();

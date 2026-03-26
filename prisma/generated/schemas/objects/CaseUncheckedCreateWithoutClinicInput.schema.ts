import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { CaseStatusSchema } from '../enums/CaseStatus.schema';
import { CaseWorkItemUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema as CaseWorkItemUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema } from './CaseWorkItemUncheckedCreateNestedManyWithoutDentalCaseInput.schema';
import { CaseAssetFileUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema as CaseAssetFileUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema } from './CaseAssetFileUncheckedCreateNestedManyWithoutDentalCaseInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  patientId: z.string(),
  labId: z.string(),
  salesRepsId: z.string().optional().nullable(),
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
  technicianId: z.string().optional().nullable(),
  deadline: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  caseItems: z.lazy(() => CaseWorkItemUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema).optional(),
  caseAssetFiles: z.lazy(() => CaseAssetFileUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema).optional()
}).strict();
export const CaseUncheckedCreateWithoutClinicInputObjectSchema: z.ZodType<Prisma.CaseUncheckedCreateWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUncheckedCreateWithoutClinicInput>;
export const CaseUncheckedCreateWithoutClinicInputObjectZodSchema = makeSchema();

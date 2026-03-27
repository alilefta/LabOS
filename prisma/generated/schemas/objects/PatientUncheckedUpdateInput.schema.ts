import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema as NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { PatientGenderSchema } from '../enums/PatientGender.schema';
import { NullableEnumPatientGenderFieldUpdateOperationsInputObjectSchema as NullableEnumPatientGenderFieldUpdateOperationsInputObjectSchema } from './NullableEnumPatientGenderFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CaseUncheckedUpdateManyWithoutPatientNestedInputObjectSchema as CaseUncheckedUpdateManyWithoutPatientNestedInputObjectSchema } from './CaseUncheckedUpdateManyWithoutPatientNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  notes: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  age: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  gender: z.union([PatientGenderSchema, z.lazy(() => NullableEnumPatientGenderFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  labId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  cases: z.lazy(() => CaseUncheckedUpdateManyWithoutPatientNestedInputObjectSchema).optional()
}).strict();
export const PatientUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.PatientUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientUncheckedUpdateInput>;
export const PatientUncheckedUpdateInputObjectZodSchema = makeSchema();

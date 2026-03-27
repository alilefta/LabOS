import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema as NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { PatientGenderSchema } from '../enums/PatientGender.schema';
import { NullableEnumPatientGenderFieldUpdateOperationsInputObjectSchema as NullableEnumPatientGenderFieldUpdateOperationsInputObjectSchema } from './NullableEnumPatientGenderFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { LabUpdateOneRequiredWithoutPatientsNestedInputObjectSchema as LabUpdateOneRequiredWithoutPatientsNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutPatientsNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  notes: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  age: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  gender: z.union([PatientGenderSchema, z.lazy(() => NullableEnumPatientGenderFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  lab: z.lazy(() => LabUpdateOneRequiredWithoutPatientsNestedInputObjectSchema).optional()
}).strict();
export const PatientUpdateWithoutCasesInputObjectSchema: z.ZodType<Prisma.PatientUpdateWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientUpdateWithoutCasesInput>;
export const PatientUpdateWithoutCasesInputObjectZodSchema = makeSchema();

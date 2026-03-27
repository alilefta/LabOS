import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { ClinicStatusSchema } from '../enums/ClinicStatus.schema';
import { EnumClinicStatusFieldUpdateOperationsInputObjectSchema as EnumClinicStatusFieldUpdateOperationsInputObjectSchema } from './EnumClinicStatusFieldUpdateOperationsInput.schema';
import { ClinicTypeSchema } from '../enums/ClinicType.schema';
import { EnumClinicTypeFieldUpdateOperationsInputObjectSchema as EnumClinicTypeFieldUpdateOperationsInputObjectSchema } from './EnumClinicTypeFieldUpdateOperationsInput.schema';
import { NullableDecimalFieldUpdateOperationsInputObjectSchema as NullableDecimalFieldUpdateOperationsInputObjectSchema } from './NullableDecimalFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CaseUncheckedUpdateManyWithoutClinicNestedInputObjectSchema as CaseUncheckedUpdateManyWithoutClinicNestedInputObjectSchema } from './CaseUncheckedUpdateManyWithoutClinicNestedInput.schema';
import { DentistUncheckedUpdateManyWithoutClinicNestedInputObjectSchema as DentistUncheckedUpdateManyWithoutClinicNestedInputObjectSchema } from './DentistUncheckedUpdateManyWithoutClinicNestedInput.schema';
import { CasePricingPlanUncheckedUpdateManyWithoutClinicNestedInputObjectSchema as CasePricingPlanUncheckedUpdateManyWithoutClinicNestedInputObjectSchema } from './CasePricingPlanUncheckedUpdateManyWithoutClinicNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  website: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  notes: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  status: z.union([ClinicStatusSchema, z.lazy(() => EnumClinicStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  type: z.union([ClinicTypeSchema, z.lazy(() => EnumClinicTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  city: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  zipcode: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  address1: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  address2: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  phoneNumber: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  billingEmail: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  billingPhoneNumber: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  taxNumber: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  discount: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'discount' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  creditLimit: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'creditLimit' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  currentBalance: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'currentBalance' must be a Decimal",
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  cases: z.lazy(() => CaseUncheckedUpdateManyWithoutClinicNestedInputObjectSchema).optional(),
  dentists: z.lazy(() => DentistUncheckedUpdateManyWithoutClinicNestedInputObjectSchema).optional(),
  casePricingPlans: z.lazy(() => CasePricingPlanUncheckedUpdateManyWithoutClinicNestedInputObjectSchema).optional()
}).strict();
export const ClinicUncheckedUpdateWithoutLabInputObjectSchema: z.ZodType<Prisma.ClinicUncheckedUpdateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicUncheckedUpdateWithoutLabInput>;
export const ClinicUncheckedUpdateWithoutLabInputObjectZodSchema = makeSchema();

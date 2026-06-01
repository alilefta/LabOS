import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { PaymentMethodSchema } from '../enums/PaymentMethod.schema';
import { EnumPaymentMethodFieldUpdateOperationsInputObjectSchema as EnumPaymentMethodFieldUpdateOperationsInputObjectSchema } from './EnumPaymentMethodFieldUpdateOperationsInput.schema';
import { PayoutStatusSchema } from '../enums/PayoutStatus.schema';
import { EnumPayoutStatusFieldUpdateOperationsInputObjectSchema as EnumPayoutStatusFieldUpdateOperationsInputObjectSchema } from './EnumPayoutStatusFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { LabUpdateOneRequiredWithoutStaffPayoutsNestedInputObjectSchema as LabUpdateOneRequiredWithoutStaffPayoutsNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutStaffPayoutsNestedInput.schema';
import { CaseStaffAssignmentUpdateManyWithoutPayoutNestedInputObjectSchema as CaseStaffAssignmentUpdateManyWithoutPayoutNestedInputObjectSchema } from './CaseStaffAssignmentUpdateManyWithoutPayoutNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  payoutNumber: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  amount: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amount' must be a Decimal",
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  method: z.union([PaymentMethodSchema, z.lazy(() => EnumPaymentMethodFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([PayoutStatusSchema, z.lazy(() => EnumPayoutStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  reference: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  notes: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  paidAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  lab: z.lazy(() => LabUpdateOneRequiredWithoutStaffPayoutsNestedInputObjectSchema).optional(),
  caseAssignments: z.lazy(() => CaseStaffAssignmentUpdateManyWithoutPayoutNestedInputObjectSchema).optional()
}).strict();
export const StaffPayoutUpdateWithoutStaffInputObjectSchema: z.ZodType<Prisma.StaffPayoutUpdateWithoutStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutUpdateWithoutStaffInput>;
export const StaffPayoutUpdateWithoutStaffInputObjectZodSchema = makeSchema();

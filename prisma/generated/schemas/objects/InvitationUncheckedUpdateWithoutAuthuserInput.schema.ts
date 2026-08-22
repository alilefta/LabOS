import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { LabStaffInvitationIntentUncheckedUpdateOneWithoutInvitationNestedInputObjectSchema as LabStaffInvitationIntentUncheckedUpdateOneWithoutInvitationNestedInputObjectSchema } from './LabStaffInvitationIntentUncheckedUpdateOneWithoutInvitationNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  organizationId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  status: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  labStaffIntent: z.lazy(() => LabStaffInvitationIntentUncheckedUpdateOneWithoutInvitationNestedInputObjectSchema).optional()
}).strict();
export const InvitationUncheckedUpdateWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.InvitationUncheckedUpdateWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUncheckedUpdateWithoutAuthuserInput>;
export const InvitationUncheckedUpdateWithoutAuthuserInputObjectZodSchema = makeSchema();

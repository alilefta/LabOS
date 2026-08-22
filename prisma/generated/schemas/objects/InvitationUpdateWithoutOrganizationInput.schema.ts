import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { AuthUserUpdateOneRequiredWithoutInvitationsNestedInputObjectSchema as AuthUserUpdateOneRequiredWithoutInvitationsNestedInputObjectSchema } from './AuthUserUpdateOneRequiredWithoutInvitationsNestedInput.schema';
import { LabStaffInvitationIntentUpdateOneWithoutInvitationNestedInputObjectSchema as LabStaffInvitationIntentUpdateOneWithoutInvitationNestedInputObjectSchema } from './LabStaffInvitationIntentUpdateOneWithoutInvitationNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  status: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  authuser: z.lazy(() => AuthUserUpdateOneRequiredWithoutInvitationsNestedInputObjectSchema).optional(),
  labStaffIntent: z.lazy(() => LabStaffInvitationIntentUpdateOneWithoutInvitationNestedInputObjectSchema).optional()
}).strict();
export const InvitationUpdateWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.InvitationUpdateWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUpdateWithoutOrganizationInput>;
export const InvitationUpdateWithoutOrganizationInputObjectZodSchema = makeSchema();

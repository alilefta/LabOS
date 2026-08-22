import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { OrganizationUpdateOneRequiredWithoutInvitationsNestedInputObjectSchema as OrganizationUpdateOneRequiredWithoutInvitationsNestedInputObjectSchema } from './OrganizationUpdateOneRequiredWithoutInvitationsNestedInput.schema';
import { AuthUserUpdateOneRequiredWithoutInvitationsNestedInputObjectSchema as AuthUserUpdateOneRequiredWithoutInvitationsNestedInputObjectSchema } from './AuthUserUpdateOneRequiredWithoutInvitationsNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  status: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutInvitationsNestedInputObjectSchema).optional(),
  authuser: z.lazy(() => AuthUserUpdateOneRequiredWithoutInvitationsNestedInputObjectSchema).optional()
}).strict();
export const InvitationUpdateWithoutLabStaffIntentInputObjectSchema: z.ZodType<Prisma.InvitationUpdateWithoutLabStaffIntentInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUpdateWithoutLabStaffIntentInput>;
export const InvitationUpdateWithoutLabStaffIntentInputObjectZodSchema = makeSchema();

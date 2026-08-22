import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { InvitationUpdateOneRequiredWithoutLabStaffIntentNestedInputObjectSchema as InvitationUpdateOneRequiredWithoutLabStaffIntentNestedInputObjectSchema } from './InvitationUpdateOneRequiredWithoutLabStaffIntentNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  invitation: z.lazy(() => InvitationUpdateOneRequiredWithoutLabStaffIntentNestedInputObjectSchema).optional()
}).strict();
export const LabStaffInvitationIntentUpdateWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentUpdateWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentUpdateWithoutLabStaffInput>;
export const LabStaffInvitationIntentUpdateWithoutLabStaffInputObjectZodSchema = makeSchema();

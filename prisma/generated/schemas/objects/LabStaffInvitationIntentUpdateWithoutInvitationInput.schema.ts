import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { LabStaffUpdateOneRequiredWithoutOrganizationInvitationIntentNestedInputObjectSchema as LabStaffUpdateOneRequiredWithoutOrganizationInvitationIntentNestedInputObjectSchema } from './LabStaffUpdateOneRequiredWithoutOrganizationInvitationIntentNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  labStaff: z.lazy(() => LabStaffUpdateOneRequiredWithoutOrganizationInvitationIntentNestedInputObjectSchema).optional()
}).strict();
export const LabStaffInvitationIntentUpdateWithoutInvitationInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentUpdateWithoutInvitationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentUpdateWithoutInvitationInput>;
export const LabStaffInvitationIntentUpdateWithoutInvitationInputObjectZodSchema = makeSchema();

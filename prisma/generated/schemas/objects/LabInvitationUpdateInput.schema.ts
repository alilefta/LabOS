import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { LabRoleSchema } from '../enums/LabRole.schema';
import { EnumLabRoleFieldUpdateOperationsInputObjectSchema as EnumLabRoleFieldUpdateOperationsInputObjectSchema } from './EnumLabRoleFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { LabUpdateOneRequiredWithoutInvitationsNestedInputObjectSchema as LabUpdateOneRequiredWithoutInvitationsNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutInvitationsNestedInput.schema';
import { LabStaffUpdateOneWithoutLabInvitationNestedInputObjectSchema as LabStaffUpdateOneWithoutLabInvitationNestedInputObjectSchema } from './LabStaffUpdateOneWithoutLabInvitationNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  roleToGrant: z.union([LabRoleSchema, z.lazy(() => EnumLabRoleFieldUpdateOperationsInputObjectSchema)]).optional(),
  expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  lab: z.lazy(() => LabUpdateOneRequiredWithoutInvitationsNestedInputObjectSchema).optional(),
  labStaff: z.lazy(() => LabStaffUpdateOneWithoutLabInvitationNestedInputObjectSchema).optional()
}).strict();
export const LabInvitationUpdateInputObjectSchema: z.ZodType<Prisma.LabInvitationUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationUpdateInput>;
export const LabInvitationUpdateInputObjectZodSchema = makeSchema();

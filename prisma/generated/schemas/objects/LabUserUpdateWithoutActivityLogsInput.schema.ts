import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { LabRoleSchema } from '../enums/LabRole.schema';
import { EnumLabRoleFieldUpdateOperationsInputObjectSchema as EnumLabRoleFieldUpdateOperationsInputObjectSchema } from './EnumLabRoleFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { LabUpdateOneRequiredWithoutUsersNestedInputObjectSchema as LabUpdateOneRequiredWithoutUsersNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutUsersNestedInput.schema';
import { AuthUserUpdateOneRequiredWithoutLabUserNestedInputObjectSchema as AuthUserUpdateOneRequiredWithoutLabUserNestedInputObjectSchema } from './AuthUserUpdateOneRequiredWithoutLabUserNestedInput.schema';
import { LabStaffUpdateOneWithoutLabUserNestedInputObjectSchema as LabStaffUpdateOneWithoutLabUserNestedInputObjectSchema } from './LabStaffUpdateOneWithoutLabUserNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  role: z.union([LabRoleSchema, z.lazy(() => EnumLabRoleFieldUpdateOperationsInputObjectSchema)]).optional(),
  isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  lastTimeActive: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  lab: z.lazy(() => LabUpdateOneRequiredWithoutUsersNestedInputObjectSchema).optional(),
  authUser: z.lazy(() => AuthUserUpdateOneRequiredWithoutLabUserNestedInputObjectSchema).optional(),
  labStaff: z.lazy(() => LabStaffUpdateOneWithoutLabUserNestedInputObjectSchema).optional()
}).strict();
export const LabUserUpdateWithoutActivityLogsInputObjectSchema: z.ZodType<Prisma.LabUserUpdateWithoutActivityLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserUpdateWithoutActivityLogsInput>;
export const LabUserUpdateWithoutActivityLogsInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { LabRoleSchema } from '../enums/LabRole.schema';
import { EnumLabRoleFieldUpdateOperationsInputObjectSchema as EnumLabRoleFieldUpdateOperationsInputObjectSchema } from './EnumLabRoleFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CaseActivityLogUncheckedUpdateManyWithoutActorNestedInputObjectSchema as CaseActivityLogUncheckedUpdateManyWithoutActorNestedInputObjectSchema } from './CaseActivityLogUncheckedUpdateManyWithoutActorNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  labId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  labStaffId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  role: z.union([LabRoleSchema, z.lazy(() => EnumLabRoleFieldUpdateOperationsInputObjectSchema)]).optional(),
  isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  lastTimeActive: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  activityLogs: z.lazy(() => CaseActivityLogUncheckedUpdateManyWithoutActorNestedInputObjectSchema).optional()
}).strict();
export const LabUserUncheckedUpdateWithoutAuthUserInputObjectSchema: z.ZodType<Prisma.LabUserUncheckedUpdateWithoutAuthUserInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserUncheckedUpdateWithoutAuthUserInput>;
export const LabUserUncheckedUpdateWithoutAuthUserInputObjectZodSchema = makeSchema();

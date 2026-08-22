import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { AuthUserRoleSchema } from '../enums/AuthUserRole.schema';
import { EnumAuthUserRoleFieldUpdateOperationsInputObjectSchema as EnumAuthUserRoleFieldUpdateOperationsInputObjectSchema } from './EnumAuthUserRoleFieldUpdateOperationsInput.schema';
import { NullableBoolFieldUpdateOperationsInputObjectSchema as NullableBoolFieldUpdateOperationsInputObjectSchema } from './NullableBoolFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { SessionUpdateManyWithoutAuthuserNestedInputObjectSchema as SessionUpdateManyWithoutAuthuserNestedInputObjectSchema } from './SessionUpdateManyWithoutAuthuserNestedInput.schema';
import { AccountUpdateManyWithoutAuthuserNestedInputObjectSchema as AccountUpdateManyWithoutAuthuserNestedInputObjectSchema } from './AccountUpdateManyWithoutAuthuserNestedInput.schema';
import { MemberUpdateManyWithoutAuthuserNestedInputObjectSchema as MemberUpdateManyWithoutAuthuserNestedInputObjectSchema } from './MemberUpdateManyWithoutAuthuserNestedInput.schema';
import { InvitationUpdateManyWithoutAuthuserNestedInputObjectSchema as InvitationUpdateManyWithoutAuthuserNestedInputObjectSchema } from './InvitationUpdateManyWithoutAuthuserNestedInput.schema';
import { SuperUserUpdateOneWithoutAuthUserNestedInputObjectSchema as SuperUserUpdateOneWithoutAuthUserNestedInputObjectSchema } from './SuperUserUpdateOneWithoutAuthUserNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  emailVerified: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  role: z.union([AuthUserRoleSchema, z.lazy(() => EnumAuthUserRoleFieldUpdateOperationsInputObjectSchema)]).optional(),
  labId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  banned: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  banReason: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  banExpires: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutAuthuserNestedInputObjectSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutAuthuserNestedInputObjectSchema).optional(),
  members: z.lazy(() => MemberUpdateManyWithoutAuthuserNestedInputObjectSchema).optional(),
  invitations: z.lazy(() => InvitationUpdateManyWithoutAuthuserNestedInputObjectSchema).optional(),
  superUser: z.lazy(() => SuperUserUpdateOneWithoutAuthUserNestedInputObjectSchema).optional()
}).strict();
export const AuthUserUpdateWithoutLabUserInputObjectSchema: z.ZodType<Prisma.AuthUserUpdateWithoutLabUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUpdateWithoutLabUserInput>;
export const AuthUserUpdateWithoutLabUserInputObjectZodSchema = makeSchema();

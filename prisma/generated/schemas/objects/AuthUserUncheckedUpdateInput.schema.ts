import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { SessionUncheckedUpdateManyWithoutAuthuserNestedInputObjectSchema as SessionUncheckedUpdateManyWithoutAuthuserNestedInputObjectSchema } from './SessionUncheckedUpdateManyWithoutAuthuserNestedInput.schema';
import { AccountUncheckedUpdateManyWithoutAuthuserNestedInputObjectSchema as AccountUncheckedUpdateManyWithoutAuthuserNestedInputObjectSchema } from './AccountUncheckedUpdateManyWithoutAuthuserNestedInput.schema';
import { LabUserUncheckedUpdateOneWithoutAuthUserNestedInputObjectSchema as LabUserUncheckedUpdateOneWithoutAuthUserNestedInputObjectSchema } from './LabUserUncheckedUpdateOneWithoutAuthUserNestedInput.schema';
import { SuperUserUncheckedUpdateOneWithoutAuthUserNestedInputObjectSchema as SuperUserUncheckedUpdateOneWithoutAuthUserNestedInputObjectSchema } from './SuperUserUncheckedUpdateOneWithoutAuthUserNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  emailVerified: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutAuthuserNestedInputObjectSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutAuthuserNestedInputObjectSchema).optional(),
  labUser: z.lazy(() => LabUserUncheckedUpdateOneWithoutAuthUserNestedInputObjectSchema).optional(),
  superUser: z.lazy(() => SuperUserUncheckedUpdateOneWithoutAuthUserNestedInputObjectSchema).optional()
}).strict();
export const AuthUserUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.AuthUserUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUncheckedUpdateInput>;
export const AuthUserUncheckedUpdateInputObjectZodSchema = makeSchema();

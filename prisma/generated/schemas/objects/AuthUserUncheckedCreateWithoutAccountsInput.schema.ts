import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SessionUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema as SessionUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema } from './SessionUncheckedCreateNestedManyWithoutAuthuserInput.schema';
import { LabUserUncheckedCreateNestedOneWithoutAuthUserInputObjectSchema as LabUserUncheckedCreateNestedOneWithoutAuthUserInputObjectSchema } from './LabUserUncheckedCreateNestedOneWithoutAuthUserInput.schema';
import { SuperUserUncheckedCreateNestedOneWithoutAuthUserInputObjectSchema as SuperUserUncheckedCreateNestedOneWithoutAuthUserInputObjectSchema } from './SuperUserUncheckedCreateNestedOneWithoutAuthUserInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.string().optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema).optional(),
  labUser: z.lazy(() => LabUserUncheckedCreateNestedOneWithoutAuthUserInputObjectSchema).optional(),
  superUser: z.lazy(() => SuperUserUncheckedCreateNestedOneWithoutAuthUserInputObjectSchema).optional()
}).strict();
export const AuthUserUncheckedCreateWithoutAccountsInputObjectSchema: z.ZodType<Prisma.AuthUserUncheckedCreateWithoutAccountsInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUncheckedCreateWithoutAccountsInput>;
export const AuthUserUncheckedCreateWithoutAccountsInputObjectZodSchema = makeSchema();

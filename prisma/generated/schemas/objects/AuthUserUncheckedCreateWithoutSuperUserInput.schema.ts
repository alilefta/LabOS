import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserRoleSchema } from '../enums/AuthUserRole.schema';
import { SessionUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema as SessionUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema } from './SessionUncheckedCreateNestedManyWithoutAuthuserInput.schema';
import { AccountUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema as AccountUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema } from './AccountUncheckedCreateNestedManyWithoutAuthuserInput.schema';
import { LabUserUncheckedCreateNestedOneWithoutAuthUserInputObjectSchema as LabUserUncheckedCreateNestedOneWithoutAuthUserInputObjectSchema } from './LabUserUncheckedCreateNestedOneWithoutAuthUserInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: AuthUserRoleSchema.optional(),
  labId: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema).optional(),
  labUser: z.lazy(() => LabUserUncheckedCreateNestedOneWithoutAuthUserInputObjectSchema).optional()
}).strict();
export const AuthUserUncheckedCreateWithoutSuperUserInputObjectSchema: z.ZodType<Prisma.AuthUserUncheckedCreateWithoutSuperUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUncheckedCreateWithoutSuperUserInput>;
export const AuthUserUncheckedCreateWithoutSuperUserInputObjectZodSchema = makeSchema();

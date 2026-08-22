import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserRoleSchema } from '../enums/AuthUserRole.schema';
import { SessionUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema as SessionUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema } from './SessionUncheckedCreateNestedManyWithoutAuthuserInput.schema';
import { AccountUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema as AccountUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema } from './AccountUncheckedCreateNestedManyWithoutAuthuserInput.schema';
import { InvitationUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema as InvitationUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema } from './InvitationUncheckedCreateNestedManyWithoutAuthuserInput.schema';
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
  role: AuthUserRoleSchema.optional(),
  labId: z.string().optional().nullable(),
  banned: z.boolean().optional().nullable(),
  banReason: z.string().optional().nullable(),
  banExpires: z.coerce.date().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema).optional(),
  labUser: z.lazy(() => LabUserUncheckedCreateNestedOneWithoutAuthUserInputObjectSchema).optional(),
  superUser: z.lazy(() => SuperUserUncheckedCreateNestedOneWithoutAuthUserInputObjectSchema).optional()
}).strict();
export const AuthUserUncheckedCreateWithoutMembersInputObjectSchema: z.ZodType<Prisma.AuthUserUncheckedCreateWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUncheckedCreateWithoutMembersInput>;
export const AuthUserUncheckedCreateWithoutMembersInputObjectZodSchema = makeSchema();

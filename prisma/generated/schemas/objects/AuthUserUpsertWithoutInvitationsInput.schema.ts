import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserUpdateWithoutInvitationsInputObjectSchema as AuthUserUpdateWithoutInvitationsInputObjectSchema } from './AuthUserUpdateWithoutInvitationsInput.schema';
import { AuthUserUncheckedUpdateWithoutInvitationsInputObjectSchema as AuthUserUncheckedUpdateWithoutInvitationsInputObjectSchema } from './AuthUserUncheckedUpdateWithoutInvitationsInput.schema';
import { AuthUserCreateWithoutInvitationsInputObjectSchema as AuthUserCreateWithoutInvitationsInputObjectSchema } from './AuthUserCreateWithoutInvitationsInput.schema';
import { AuthUserUncheckedCreateWithoutInvitationsInputObjectSchema as AuthUserUncheckedCreateWithoutInvitationsInputObjectSchema } from './AuthUserUncheckedCreateWithoutInvitationsInput.schema';
import { AuthUserWhereInputObjectSchema as AuthUserWhereInputObjectSchema } from './AuthUserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => AuthUserUpdateWithoutInvitationsInputObjectSchema), z.lazy(() => AuthUserUncheckedUpdateWithoutInvitationsInputObjectSchema)]),
  create: z.union([z.lazy(() => AuthUserCreateWithoutInvitationsInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutInvitationsInputObjectSchema)]),
  where: z.lazy(() => AuthUserWhereInputObjectSchema).optional()
}).strict();
export const AuthUserUpsertWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.AuthUserUpsertWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUpsertWithoutInvitationsInput>;
export const AuthUserUpsertWithoutInvitationsInputObjectZodSchema = makeSchema();

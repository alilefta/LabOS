import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserWhereInputObjectSchema as AuthUserWhereInputObjectSchema } from './AuthUserWhereInput.schema';
import { AuthUserUpdateWithoutInvitationsInputObjectSchema as AuthUserUpdateWithoutInvitationsInputObjectSchema } from './AuthUserUpdateWithoutInvitationsInput.schema';
import { AuthUserUncheckedUpdateWithoutInvitationsInputObjectSchema as AuthUserUncheckedUpdateWithoutInvitationsInputObjectSchema } from './AuthUserUncheckedUpdateWithoutInvitationsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AuthUserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => AuthUserUpdateWithoutInvitationsInputObjectSchema), z.lazy(() => AuthUserUncheckedUpdateWithoutInvitationsInputObjectSchema)])
}).strict();
export const AuthUserUpdateToOneWithWhereWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.AuthUserUpdateToOneWithWhereWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUpdateToOneWithWhereWithoutInvitationsInput>;
export const AuthUserUpdateToOneWithWhereWithoutInvitationsInputObjectZodSchema = makeSchema();

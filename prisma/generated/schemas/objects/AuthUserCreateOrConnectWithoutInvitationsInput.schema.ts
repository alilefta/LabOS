import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './AuthUserWhereUniqueInput.schema';
import { AuthUserCreateWithoutInvitationsInputObjectSchema as AuthUserCreateWithoutInvitationsInputObjectSchema } from './AuthUserCreateWithoutInvitationsInput.schema';
import { AuthUserUncheckedCreateWithoutInvitationsInputObjectSchema as AuthUserUncheckedCreateWithoutInvitationsInputObjectSchema } from './AuthUserUncheckedCreateWithoutInvitationsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AuthUserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AuthUserCreateWithoutInvitationsInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutInvitationsInputObjectSchema)])
}).strict();
export const AuthUserCreateOrConnectWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.AuthUserCreateOrConnectWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserCreateOrConnectWithoutInvitationsInput>;
export const AuthUserCreateOrConnectWithoutInvitationsInputObjectZodSchema = makeSchema();

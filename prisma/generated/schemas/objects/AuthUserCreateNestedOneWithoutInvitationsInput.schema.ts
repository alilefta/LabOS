import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserCreateWithoutInvitationsInputObjectSchema as AuthUserCreateWithoutInvitationsInputObjectSchema } from './AuthUserCreateWithoutInvitationsInput.schema';
import { AuthUserUncheckedCreateWithoutInvitationsInputObjectSchema as AuthUserUncheckedCreateWithoutInvitationsInputObjectSchema } from './AuthUserUncheckedCreateWithoutInvitationsInput.schema';
import { AuthUserCreateOrConnectWithoutInvitationsInputObjectSchema as AuthUserCreateOrConnectWithoutInvitationsInputObjectSchema } from './AuthUserCreateOrConnectWithoutInvitationsInput.schema';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './AuthUserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AuthUserCreateWithoutInvitationsInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutInvitationsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AuthUserCreateOrConnectWithoutInvitationsInputObjectSchema).optional(),
  connect: z.lazy(() => AuthUserWhereUniqueInputObjectSchema).optional()
}).strict();
export const AuthUserCreateNestedOneWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.AuthUserCreateNestedOneWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserCreateNestedOneWithoutInvitationsInput>;
export const AuthUserCreateNestedOneWithoutInvitationsInputObjectZodSchema = makeSchema();

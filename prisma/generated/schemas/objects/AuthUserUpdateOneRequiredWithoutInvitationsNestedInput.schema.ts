import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserCreateWithoutInvitationsInputObjectSchema as AuthUserCreateWithoutInvitationsInputObjectSchema } from './AuthUserCreateWithoutInvitationsInput.schema';
import { AuthUserUncheckedCreateWithoutInvitationsInputObjectSchema as AuthUserUncheckedCreateWithoutInvitationsInputObjectSchema } from './AuthUserUncheckedCreateWithoutInvitationsInput.schema';
import { AuthUserCreateOrConnectWithoutInvitationsInputObjectSchema as AuthUserCreateOrConnectWithoutInvitationsInputObjectSchema } from './AuthUserCreateOrConnectWithoutInvitationsInput.schema';
import { AuthUserUpsertWithoutInvitationsInputObjectSchema as AuthUserUpsertWithoutInvitationsInputObjectSchema } from './AuthUserUpsertWithoutInvitationsInput.schema';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './AuthUserWhereUniqueInput.schema';
import { AuthUserUpdateToOneWithWhereWithoutInvitationsInputObjectSchema as AuthUserUpdateToOneWithWhereWithoutInvitationsInputObjectSchema } from './AuthUserUpdateToOneWithWhereWithoutInvitationsInput.schema';
import { AuthUserUpdateWithoutInvitationsInputObjectSchema as AuthUserUpdateWithoutInvitationsInputObjectSchema } from './AuthUserUpdateWithoutInvitationsInput.schema';
import { AuthUserUncheckedUpdateWithoutInvitationsInputObjectSchema as AuthUserUncheckedUpdateWithoutInvitationsInputObjectSchema } from './AuthUserUncheckedUpdateWithoutInvitationsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AuthUserCreateWithoutInvitationsInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutInvitationsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AuthUserCreateOrConnectWithoutInvitationsInputObjectSchema).optional(),
  upsert: z.lazy(() => AuthUserUpsertWithoutInvitationsInputObjectSchema).optional(),
  connect: z.lazy(() => AuthUserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => AuthUserUpdateToOneWithWhereWithoutInvitationsInputObjectSchema), z.lazy(() => AuthUserUpdateWithoutInvitationsInputObjectSchema), z.lazy(() => AuthUserUncheckedUpdateWithoutInvitationsInputObjectSchema)]).optional()
}).strict();
export const AuthUserUpdateOneRequiredWithoutInvitationsNestedInputObjectSchema: z.ZodType<Prisma.AuthUserUpdateOneRequiredWithoutInvitationsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUpdateOneRequiredWithoutInvitationsNestedInput>;
export const AuthUserUpdateOneRequiredWithoutInvitationsNestedInputObjectZodSchema = makeSchema();

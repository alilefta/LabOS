import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserCreateWithoutMembersInputObjectSchema as AuthUserCreateWithoutMembersInputObjectSchema } from './AuthUserCreateWithoutMembersInput.schema';
import { AuthUserUncheckedCreateWithoutMembersInputObjectSchema as AuthUserUncheckedCreateWithoutMembersInputObjectSchema } from './AuthUserUncheckedCreateWithoutMembersInput.schema';
import { AuthUserCreateOrConnectWithoutMembersInputObjectSchema as AuthUserCreateOrConnectWithoutMembersInputObjectSchema } from './AuthUserCreateOrConnectWithoutMembersInput.schema';
import { AuthUserUpsertWithoutMembersInputObjectSchema as AuthUserUpsertWithoutMembersInputObjectSchema } from './AuthUserUpsertWithoutMembersInput.schema';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './AuthUserWhereUniqueInput.schema';
import { AuthUserUpdateToOneWithWhereWithoutMembersInputObjectSchema as AuthUserUpdateToOneWithWhereWithoutMembersInputObjectSchema } from './AuthUserUpdateToOneWithWhereWithoutMembersInput.schema';
import { AuthUserUpdateWithoutMembersInputObjectSchema as AuthUserUpdateWithoutMembersInputObjectSchema } from './AuthUserUpdateWithoutMembersInput.schema';
import { AuthUserUncheckedUpdateWithoutMembersInputObjectSchema as AuthUserUncheckedUpdateWithoutMembersInputObjectSchema } from './AuthUserUncheckedUpdateWithoutMembersInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AuthUserCreateWithoutMembersInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutMembersInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AuthUserCreateOrConnectWithoutMembersInputObjectSchema).optional(),
  upsert: z.lazy(() => AuthUserUpsertWithoutMembersInputObjectSchema).optional(),
  connect: z.lazy(() => AuthUserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => AuthUserUpdateToOneWithWhereWithoutMembersInputObjectSchema), z.lazy(() => AuthUserUpdateWithoutMembersInputObjectSchema), z.lazy(() => AuthUserUncheckedUpdateWithoutMembersInputObjectSchema)]).optional()
}).strict();
export const AuthUserUpdateOneRequiredWithoutMembersNestedInputObjectSchema: z.ZodType<Prisma.AuthUserUpdateOneRequiredWithoutMembersNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUpdateOneRequiredWithoutMembersNestedInput>;
export const AuthUserUpdateOneRequiredWithoutMembersNestedInputObjectZodSchema = makeSchema();

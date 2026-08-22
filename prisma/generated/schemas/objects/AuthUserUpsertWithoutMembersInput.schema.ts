import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserUpdateWithoutMembersInputObjectSchema as AuthUserUpdateWithoutMembersInputObjectSchema } from './AuthUserUpdateWithoutMembersInput.schema';
import { AuthUserUncheckedUpdateWithoutMembersInputObjectSchema as AuthUserUncheckedUpdateWithoutMembersInputObjectSchema } from './AuthUserUncheckedUpdateWithoutMembersInput.schema';
import { AuthUserCreateWithoutMembersInputObjectSchema as AuthUserCreateWithoutMembersInputObjectSchema } from './AuthUserCreateWithoutMembersInput.schema';
import { AuthUserUncheckedCreateWithoutMembersInputObjectSchema as AuthUserUncheckedCreateWithoutMembersInputObjectSchema } from './AuthUserUncheckedCreateWithoutMembersInput.schema';
import { AuthUserWhereInputObjectSchema as AuthUserWhereInputObjectSchema } from './AuthUserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => AuthUserUpdateWithoutMembersInputObjectSchema), z.lazy(() => AuthUserUncheckedUpdateWithoutMembersInputObjectSchema)]),
  create: z.union([z.lazy(() => AuthUserCreateWithoutMembersInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutMembersInputObjectSchema)]),
  where: z.lazy(() => AuthUserWhereInputObjectSchema).optional()
}).strict();
export const AuthUserUpsertWithoutMembersInputObjectSchema: z.ZodType<Prisma.AuthUserUpsertWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUpsertWithoutMembersInput>;
export const AuthUserUpsertWithoutMembersInputObjectZodSchema = makeSchema();

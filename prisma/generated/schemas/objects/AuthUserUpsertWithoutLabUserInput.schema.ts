import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserUpdateWithoutLabUserInputObjectSchema as AuthUserUpdateWithoutLabUserInputObjectSchema } from './AuthUserUpdateWithoutLabUserInput.schema';
import { AuthUserUncheckedUpdateWithoutLabUserInputObjectSchema as AuthUserUncheckedUpdateWithoutLabUserInputObjectSchema } from './AuthUserUncheckedUpdateWithoutLabUserInput.schema';
import { AuthUserCreateWithoutLabUserInputObjectSchema as AuthUserCreateWithoutLabUserInputObjectSchema } from './AuthUserCreateWithoutLabUserInput.schema';
import { AuthUserUncheckedCreateWithoutLabUserInputObjectSchema as AuthUserUncheckedCreateWithoutLabUserInputObjectSchema } from './AuthUserUncheckedCreateWithoutLabUserInput.schema';
import { AuthUserWhereInputObjectSchema as AuthUserWhereInputObjectSchema } from './AuthUserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => AuthUserUpdateWithoutLabUserInputObjectSchema), z.lazy(() => AuthUserUncheckedUpdateWithoutLabUserInputObjectSchema)]),
  create: z.union([z.lazy(() => AuthUserCreateWithoutLabUserInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutLabUserInputObjectSchema)]),
  where: z.lazy(() => AuthUserWhereInputObjectSchema).optional()
}).strict();
export const AuthUserUpsertWithoutLabUserInputObjectSchema: z.ZodType<Prisma.AuthUserUpsertWithoutLabUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUpsertWithoutLabUserInput>;
export const AuthUserUpsertWithoutLabUserInputObjectZodSchema = makeSchema();

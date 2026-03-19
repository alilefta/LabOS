import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserUpdateWithoutSuperUserInputObjectSchema as AuthUserUpdateWithoutSuperUserInputObjectSchema } from './AuthUserUpdateWithoutSuperUserInput.schema';
import { AuthUserUncheckedUpdateWithoutSuperUserInputObjectSchema as AuthUserUncheckedUpdateWithoutSuperUserInputObjectSchema } from './AuthUserUncheckedUpdateWithoutSuperUserInput.schema';
import { AuthUserCreateWithoutSuperUserInputObjectSchema as AuthUserCreateWithoutSuperUserInputObjectSchema } from './AuthUserCreateWithoutSuperUserInput.schema';
import { AuthUserUncheckedCreateWithoutSuperUserInputObjectSchema as AuthUserUncheckedCreateWithoutSuperUserInputObjectSchema } from './AuthUserUncheckedCreateWithoutSuperUserInput.schema';
import { AuthUserWhereInputObjectSchema as AuthUserWhereInputObjectSchema } from './AuthUserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => AuthUserUpdateWithoutSuperUserInputObjectSchema), z.lazy(() => AuthUserUncheckedUpdateWithoutSuperUserInputObjectSchema)]),
  create: z.union([z.lazy(() => AuthUserCreateWithoutSuperUserInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutSuperUserInputObjectSchema)]),
  where: z.lazy(() => AuthUserWhereInputObjectSchema).optional()
}).strict();
export const AuthUserUpsertWithoutSuperUserInputObjectSchema: z.ZodType<Prisma.AuthUserUpsertWithoutSuperUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUpsertWithoutSuperUserInput>;
export const AuthUserUpsertWithoutSuperUserInputObjectZodSchema = makeSchema();

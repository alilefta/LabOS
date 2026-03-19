import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserUpdateWithoutAccountsInputObjectSchema as AuthUserUpdateWithoutAccountsInputObjectSchema } from './AuthUserUpdateWithoutAccountsInput.schema';
import { AuthUserUncheckedUpdateWithoutAccountsInputObjectSchema as AuthUserUncheckedUpdateWithoutAccountsInputObjectSchema } from './AuthUserUncheckedUpdateWithoutAccountsInput.schema';
import { AuthUserCreateWithoutAccountsInputObjectSchema as AuthUserCreateWithoutAccountsInputObjectSchema } from './AuthUserCreateWithoutAccountsInput.schema';
import { AuthUserUncheckedCreateWithoutAccountsInputObjectSchema as AuthUserUncheckedCreateWithoutAccountsInputObjectSchema } from './AuthUserUncheckedCreateWithoutAccountsInput.schema';
import { AuthUserWhereInputObjectSchema as AuthUserWhereInputObjectSchema } from './AuthUserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => AuthUserUpdateWithoutAccountsInputObjectSchema), z.lazy(() => AuthUserUncheckedUpdateWithoutAccountsInputObjectSchema)]),
  create: z.union([z.lazy(() => AuthUserCreateWithoutAccountsInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutAccountsInputObjectSchema)]),
  where: z.lazy(() => AuthUserWhereInputObjectSchema).optional()
}).strict();
export const AuthUserUpsertWithoutAccountsInputObjectSchema: z.ZodType<Prisma.AuthUserUpsertWithoutAccountsInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUpsertWithoutAccountsInput>;
export const AuthUserUpsertWithoutAccountsInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserWhereInputObjectSchema as AuthUserWhereInputObjectSchema } from './AuthUserWhereInput.schema';
import { AuthUserUpdateWithoutAccountsInputObjectSchema as AuthUserUpdateWithoutAccountsInputObjectSchema } from './AuthUserUpdateWithoutAccountsInput.schema';
import { AuthUserUncheckedUpdateWithoutAccountsInputObjectSchema as AuthUserUncheckedUpdateWithoutAccountsInputObjectSchema } from './AuthUserUncheckedUpdateWithoutAccountsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AuthUserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => AuthUserUpdateWithoutAccountsInputObjectSchema), z.lazy(() => AuthUserUncheckedUpdateWithoutAccountsInputObjectSchema)])
}).strict();
export const AuthUserUpdateToOneWithWhereWithoutAccountsInputObjectSchema: z.ZodType<Prisma.AuthUserUpdateToOneWithWhereWithoutAccountsInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUpdateToOneWithWhereWithoutAccountsInput>;
export const AuthUserUpdateToOneWithWhereWithoutAccountsInputObjectZodSchema = makeSchema();

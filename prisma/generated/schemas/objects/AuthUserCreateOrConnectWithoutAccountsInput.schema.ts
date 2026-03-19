import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './AuthUserWhereUniqueInput.schema';
import { AuthUserCreateWithoutAccountsInputObjectSchema as AuthUserCreateWithoutAccountsInputObjectSchema } from './AuthUserCreateWithoutAccountsInput.schema';
import { AuthUserUncheckedCreateWithoutAccountsInputObjectSchema as AuthUserUncheckedCreateWithoutAccountsInputObjectSchema } from './AuthUserUncheckedCreateWithoutAccountsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AuthUserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AuthUserCreateWithoutAccountsInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutAccountsInputObjectSchema)])
}).strict();
export const AuthUserCreateOrConnectWithoutAccountsInputObjectSchema: z.ZodType<Prisma.AuthUserCreateOrConnectWithoutAccountsInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserCreateOrConnectWithoutAccountsInput>;
export const AuthUserCreateOrConnectWithoutAccountsInputObjectZodSchema = makeSchema();

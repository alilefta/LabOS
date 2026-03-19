import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserCreateWithoutAccountsInputObjectSchema as AuthUserCreateWithoutAccountsInputObjectSchema } from './AuthUserCreateWithoutAccountsInput.schema';
import { AuthUserUncheckedCreateWithoutAccountsInputObjectSchema as AuthUserUncheckedCreateWithoutAccountsInputObjectSchema } from './AuthUserUncheckedCreateWithoutAccountsInput.schema';
import { AuthUserCreateOrConnectWithoutAccountsInputObjectSchema as AuthUserCreateOrConnectWithoutAccountsInputObjectSchema } from './AuthUserCreateOrConnectWithoutAccountsInput.schema';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './AuthUserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AuthUserCreateWithoutAccountsInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutAccountsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AuthUserCreateOrConnectWithoutAccountsInputObjectSchema).optional(),
  connect: z.lazy(() => AuthUserWhereUniqueInputObjectSchema).optional()
}).strict();
export const AuthUserCreateNestedOneWithoutAccountsInputObjectSchema: z.ZodType<Prisma.AuthUserCreateNestedOneWithoutAccountsInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserCreateNestedOneWithoutAccountsInput>;
export const AuthUserCreateNestedOneWithoutAccountsInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserCreateWithoutAccountsInputObjectSchema as AuthUserCreateWithoutAccountsInputObjectSchema } from './AuthUserCreateWithoutAccountsInput.schema';
import { AuthUserUncheckedCreateWithoutAccountsInputObjectSchema as AuthUserUncheckedCreateWithoutAccountsInputObjectSchema } from './AuthUserUncheckedCreateWithoutAccountsInput.schema';
import { AuthUserCreateOrConnectWithoutAccountsInputObjectSchema as AuthUserCreateOrConnectWithoutAccountsInputObjectSchema } from './AuthUserCreateOrConnectWithoutAccountsInput.schema';
import { AuthUserUpsertWithoutAccountsInputObjectSchema as AuthUserUpsertWithoutAccountsInputObjectSchema } from './AuthUserUpsertWithoutAccountsInput.schema';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './AuthUserWhereUniqueInput.schema';
import { AuthUserUpdateToOneWithWhereWithoutAccountsInputObjectSchema as AuthUserUpdateToOneWithWhereWithoutAccountsInputObjectSchema } from './AuthUserUpdateToOneWithWhereWithoutAccountsInput.schema';
import { AuthUserUpdateWithoutAccountsInputObjectSchema as AuthUserUpdateWithoutAccountsInputObjectSchema } from './AuthUserUpdateWithoutAccountsInput.schema';
import { AuthUserUncheckedUpdateWithoutAccountsInputObjectSchema as AuthUserUncheckedUpdateWithoutAccountsInputObjectSchema } from './AuthUserUncheckedUpdateWithoutAccountsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AuthUserCreateWithoutAccountsInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutAccountsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AuthUserCreateOrConnectWithoutAccountsInputObjectSchema).optional(),
  upsert: z.lazy(() => AuthUserUpsertWithoutAccountsInputObjectSchema).optional(),
  connect: z.lazy(() => AuthUserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => AuthUserUpdateToOneWithWhereWithoutAccountsInputObjectSchema), z.lazy(() => AuthUserUpdateWithoutAccountsInputObjectSchema), z.lazy(() => AuthUserUncheckedUpdateWithoutAccountsInputObjectSchema)]).optional()
}).strict();
export const AuthUserUpdateOneRequiredWithoutAccountsNestedInputObjectSchema: z.ZodType<Prisma.AuthUserUpdateOneRequiredWithoutAccountsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUpdateOneRequiredWithoutAccountsNestedInput>;
export const AuthUserUpdateOneRequiredWithoutAccountsNestedInputObjectZodSchema = makeSchema();

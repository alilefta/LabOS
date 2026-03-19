import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserCreateWithoutLabUserInputObjectSchema as AuthUserCreateWithoutLabUserInputObjectSchema } from './AuthUserCreateWithoutLabUserInput.schema';
import { AuthUserUncheckedCreateWithoutLabUserInputObjectSchema as AuthUserUncheckedCreateWithoutLabUserInputObjectSchema } from './AuthUserUncheckedCreateWithoutLabUserInput.schema';
import { AuthUserCreateOrConnectWithoutLabUserInputObjectSchema as AuthUserCreateOrConnectWithoutLabUserInputObjectSchema } from './AuthUserCreateOrConnectWithoutLabUserInput.schema';
import { AuthUserUpsertWithoutLabUserInputObjectSchema as AuthUserUpsertWithoutLabUserInputObjectSchema } from './AuthUserUpsertWithoutLabUserInput.schema';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './AuthUserWhereUniqueInput.schema';
import { AuthUserUpdateToOneWithWhereWithoutLabUserInputObjectSchema as AuthUserUpdateToOneWithWhereWithoutLabUserInputObjectSchema } from './AuthUserUpdateToOneWithWhereWithoutLabUserInput.schema';
import { AuthUserUpdateWithoutLabUserInputObjectSchema as AuthUserUpdateWithoutLabUserInputObjectSchema } from './AuthUserUpdateWithoutLabUserInput.schema';
import { AuthUserUncheckedUpdateWithoutLabUserInputObjectSchema as AuthUserUncheckedUpdateWithoutLabUserInputObjectSchema } from './AuthUserUncheckedUpdateWithoutLabUserInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AuthUserCreateWithoutLabUserInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutLabUserInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AuthUserCreateOrConnectWithoutLabUserInputObjectSchema).optional(),
  upsert: z.lazy(() => AuthUserUpsertWithoutLabUserInputObjectSchema).optional(),
  connect: z.lazy(() => AuthUserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => AuthUserUpdateToOneWithWhereWithoutLabUserInputObjectSchema), z.lazy(() => AuthUserUpdateWithoutLabUserInputObjectSchema), z.lazy(() => AuthUserUncheckedUpdateWithoutLabUserInputObjectSchema)]).optional()
}).strict();
export const AuthUserUpdateOneRequiredWithoutLabUserNestedInputObjectSchema: z.ZodType<Prisma.AuthUserUpdateOneRequiredWithoutLabUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUpdateOneRequiredWithoutLabUserNestedInput>;
export const AuthUserUpdateOneRequiredWithoutLabUserNestedInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserCreateWithoutSuperUserInputObjectSchema as AuthUserCreateWithoutSuperUserInputObjectSchema } from './AuthUserCreateWithoutSuperUserInput.schema';
import { AuthUserUncheckedCreateWithoutSuperUserInputObjectSchema as AuthUserUncheckedCreateWithoutSuperUserInputObjectSchema } from './AuthUserUncheckedCreateWithoutSuperUserInput.schema';
import { AuthUserCreateOrConnectWithoutSuperUserInputObjectSchema as AuthUserCreateOrConnectWithoutSuperUserInputObjectSchema } from './AuthUserCreateOrConnectWithoutSuperUserInput.schema';
import { AuthUserUpsertWithoutSuperUserInputObjectSchema as AuthUserUpsertWithoutSuperUserInputObjectSchema } from './AuthUserUpsertWithoutSuperUserInput.schema';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './AuthUserWhereUniqueInput.schema';
import { AuthUserUpdateToOneWithWhereWithoutSuperUserInputObjectSchema as AuthUserUpdateToOneWithWhereWithoutSuperUserInputObjectSchema } from './AuthUserUpdateToOneWithWhereWithoutSuperUserInput.schema';
import { AuthUserUpdateWithoutSuperUserInputObjectSchema as AuthUserUpdateWithoutSuperUserInputObjectSchema } from './AuthUserUpdateWithoutSuperUserInput.schema';
import { AuthUserUncheckedUpdateWithoutSuperUserInputObjectSchema as AuthUserUncheckedUpdateWithoutSuperUserInputObjectSchema } from './AuthUserUncheckedUpdateWithoutSuperUserInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AuthUserCreateWithoutSuperUserInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutSuperUserInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AuthUserCreateOrConnectWithoutSuperUserInputObjectSchema).optional(),
  upsert: z.lazy(() => AuthUserUpsertWithoutSuperUserInputObjectSchema).optional(),
  connect: z.lazy(() => AuthUserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => AuthUserUpdateToOneWithWhereWithoutSuperUserInputObjectSchema), z.lazy(() => AuthUserUpdateWithoutSuperUserInputObjectSchema), z.lazy(() => AuthUserUncheckedUpdateWithoutSuperUserInputObjectSchema)]).optional()
}).strict();
export const AuthUserUpdateOneRequiredWithoutSuperUserNestedInputObjectSchema: z.ZodType<Prisma.AuthUserUpdateOneRequiredWithoutSuperUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUpdateOneRequiredWithoutSuperUserNestedInput>;
export const AuthUserUpdateOneRequiredWithoutSuperUserNestedInputObjectZodSchema = makeSchema();

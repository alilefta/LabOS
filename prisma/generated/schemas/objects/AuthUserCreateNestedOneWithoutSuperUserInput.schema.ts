import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserCreateWithoutSuperUserInputObjectSchema as AuthUserCreateWithoutSuperUserInputObjectSchema } from './AuthUserCreateWithoutSuperUserInput.schema';
import { AuthUserUncheckedCreateWithoutSuperUserInputObjectSchema as AuthUserUncheckedCreateWithoutSuperUserInputObjectSchema } from './AuthUserUncheckedCreateWithoutSuperUserInput.schema';
import { AuthUserCreateOrConnectWithoutSuperUserInputObjectSchema as AuthUserCreateOrConnectWithoutSuperUserInputObjectSchema } from './AuthUserCreateOrConnectWithoutSuperUserInput.schema';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './AuthUserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AuthUserCreateWithoutSuperUserInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutSuperUserInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AuthUserCreateOrConnectWithoutSuperUserInputObjectSchema).optional(),
  connect: z.lazy(() => AuthUserWhereUniqueInputObjectSchema).optional()
}).strict();
export const AuthUserCreateNestedOneWithoutSuperUserInputObjectSchema: z.ZodType<Prisma.AuthUserCreateNestedOneWithoutSuperUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserCreateNestedOneWithoutSuperUserInput>;
export const AuthUserCreateNestedOneWithoutSuperUserInputObjectZodSchema = makeSchema();

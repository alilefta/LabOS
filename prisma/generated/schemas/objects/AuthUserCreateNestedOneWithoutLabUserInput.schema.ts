import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserCreateWithoutLabUserInputObjectSchema as AuthUserCreateWithoutLabUserInputObjectSchema } from './AuthUserCreateWithoutLabUserInput.schema';
import { AuthUserUncheckedCreateWithoutLabUserInputObjectSchema as AuthUserUncheckedCreateWithoutLabUserInputObjectSchema } from './AuthUserUncheckedCreateWithoutLabUserInput.schema';
import { AuthUserCreateOrConnectWithoutLabUserInputObjectSchema as AuthUserCreateOrConnectWithoutLabUserInputObjectSchema } from './AuthUserCreateOrConnectWithoutLabUserInput.schema';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './AuthUserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AuthUserCreateWithoutLabUserInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutLabUserInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AuthUserCreateOrConnectWithoutLabUserInputObjectSchema).optional(),
  connect: z.lazy(() => AuthUserWhereUniqueInputObjectSchema).optional()
}).strict();
export const AuthUserCreateNestedOneWithoutLabUserInputObjectSchema: z.ZodType<Prisma.AuthUserCreateNestedOneWithoutLabUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserCreateNestedOneWithoutLabUserInput>;
export const AuthUserCreateNestedOneWithoutLabUserInputObjectZodSchema = makeSchema();

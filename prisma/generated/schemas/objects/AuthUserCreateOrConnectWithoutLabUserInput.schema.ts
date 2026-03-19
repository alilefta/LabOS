import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './AuthUserWhereUniqueInput.schema';
import { AuthUserCreateWithoutLabUserInputObjectSchema as AuthUserCreateWithoutLabUserInputObjectSchema } from './AuthUserCreateWithoutLabUserInput.schema';
import { AuthUserUncheckedCreateWithoutLabUserInputObjectSchema as AuthUserUncheckedCreateWithoutLabUserInputObjectSchema } from './AuthUserUncheckedCreateWithoutLabUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AuthUserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AuthUserCreateWithoutLabUserInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutLabUserInputObjectSchema)])
}).strict();
export const AuthUserCreateOrConnectWithoutLabUserInputObjectSchema: z.ZodType<Prisma.AuthUserCreateOrConnectWithoutLabUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserCreateOrConnectWithoutLabUserInput>;
export const AuthUserCreateOrConnectWithoutLabUserInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './AuthUserWhereUniqueInput.schema';
import { AuthUserCreateWithoutSuperUserInputObjectSchema as AuthUserCreateWithoutSuperUserInputObjectSchema } from './AuthUserCreateWithoutSuperUserInput.schema';
import { AuthUserUncheckedCreateWithoutSuperUserInputObjectSchema as AuthUserUncheckedCreateWithoutSuperUserInputObjectSchema } from './AuthUserUncheckedCreateWithoutSuperUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AuthUserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AuthUserCreateWithoutSuperUserInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutSuperUserInputObjectSchema)])
}).strict();
export const AuthUserCreateOrConnectWithoutSuperUserInputObjectSchema: z.ZodType<Prisma.AuthUserCreateOrConnectWithoutSuperUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserCreateOrConnectWithoutSuperUserInput>;
export const AuthUserCreateOrConnectWithoutSuperUserInputObjectZodSchema = makeSchema();

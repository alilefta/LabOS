import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './AuthUserWhereUniqueInput.schema';
import { AuthUserCreateWithoutSessionsInputObjectSchema as AuthUserCreateWithoutSessionsInputObjectSchema } from './AuthUserCreateWithoutSessionsInput.schema';
import { AuthUserUncheckedCreateWithoutSessionsInputObjectSchema as AuthUserUncheckedCreateWithoutSessionsInputObjectSchema } from './AuthUserUncheckedCreateWithoutSessionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AuthUserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AuthUserCreateWithoutSessionsInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutSessionsInputObjectSchema)])
}).strict();
export const AuthUserCreateOrConnectWithoutSessionsInputObjectSchema: z.ZodType<Prisma.AuthUserCreateOrConnectWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserCreateOrConnectWithoutSessionsInput>;
export const AuthUserCreateOrConnectWithoutSessionsInputObjectZodSchema = makeSchema();

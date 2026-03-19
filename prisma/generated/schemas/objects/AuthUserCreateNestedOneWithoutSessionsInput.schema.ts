import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserCreateWithoutSessionsInputObjectSchema as AuthUserCreateWithoutSessionsInputObjectSchema } from './AuthUserCreateWithoutSessionsInput.schema';
import { AuthUserUncheckedCreateWithoutSessionsInputObjectSchema as AuthUserUncheckedCreateWithoutSessionsInputObjectSchema } from './AuthUserUncheckedCreateWithoutSessionsInput.schema';
import { AuthUserCreateOrConnectWithoutSessionsInputObjectSchema as AuthUserCreateOrConnectWithoutSessionsInputObjectSchema } from './AuthUserCreateOrConnectWithoutSessionsInput.schema';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './AuthUserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AuthUserCreateWithoutSessionsInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutSessionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AuthUserCreateOrConnectWithoutSessionsInputObjectSchema).optional(),
  connect: z.lazy(() => AuthUserWhereUniqueInputObjectSchema).optional()
}).strict();
export const AuthUserCreateNestedOneWithoutSessionsInputObjectSchema: z.ZodType<Prisma.AuthUserCreateNestedOneWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserCreateNestedOneWithoutSessionsInput>;
export const AuthUserCreateNestedOneWithoutSessionsInputObjectZodSchema = makeSchema();

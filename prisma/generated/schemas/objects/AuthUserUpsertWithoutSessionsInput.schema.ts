import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserUpdateWithoutSessionsInputObjectSchema as AuthUserUpdateWithoutSessionsInputObjectSchema } from './AuthUserUpdateWithoutSessionsInput.schema';
import { AuthUserUncheckedUpdateWithoutSessionsInputObjectSchema as AuthUserUncheckedUpdateWithoutSessionsInputObjectSchema } from './AuthUserUncheckedUpdateWithoutSessionsInput.schema';
import { AuthUserCreateWithoutSessionsInputObjectSchema as AuthUserCreateWithoutSessionsInputObjectSchema } from './AuthUserCreateWithoutSessionsInput.schema';
import { AuthUserUncheckedCreateWithoutSessionsInputObjectSchema as AuthUserUncheckedCreateWithoutSessionsInputObjectSchema } from './AuthUserUncheckedCreateWithoutSessionsInput.schema';
import { AuthUserWhereInputObjectSchema as AuthUserWhereInputObjectSchema } from './AuthUserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => AuthUserUpdateWithoutSessionsInputObjectSchema), z.lazy(() => AuthUserUncheckedUpdateWithoutSessionsInputObjectSchema)]),
  create: z.union([z.lazy(() => AuthUserCreateWithoutSessionsInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutSessionsInputObjectSchema)]),
  where: z.lazy(() => AuthUserWhereInputObjectSchema).optional()
}).strict();
export const AuthUserUpsertWithoutSessionsInputObjectSchema: z.ZodType<Prisma.AuthUserUpsertWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUpsertWithoutSessionsInput>;
export const AuthUserUpsertWithoutSessionsInputObjectZodSchema = makeSchema();

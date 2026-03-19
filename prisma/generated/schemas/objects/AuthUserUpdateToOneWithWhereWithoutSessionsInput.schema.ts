import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserWhereInputObjectSchema as AuthUserWhereInputObjectSchema } from './AuthUserWhereInput.schema';
import { AuthUserUpdateWithoutSessionsInputObjectSchema as AuthUserUpdateWithoutSessionsInputObjectSchema } from './AuthUserUpdateWithoutSessionsInput.schema';
import { AuthUserUncheckedUpdateWithoutSessionsInputObjectSchema as AuthUserUncheckedUpdateWithoutSessionsInputObjectSchema } from './AuthUserUncheckedUpdateWithoutSessionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AuthUserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => AuthUserUpdateWithoutSessionsInputObjectSchema), z.lazy(() => AuthUserUncheckedUpdateWithoutSessionsInputObjectSchema)])
}).strict();
export const AuthUserUpdateToOneWithWhereWithoutSessionsInputObjectSchema: z.ZodType<Prisma.AuthUserUpdateToOneWithWhereWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUpdateToOneWithWhereWithoutSessionsInput>;
export const AuthUserUpdateToOneWithWhereWithoutSessionsInputObjectZodSchema = makeSchema();

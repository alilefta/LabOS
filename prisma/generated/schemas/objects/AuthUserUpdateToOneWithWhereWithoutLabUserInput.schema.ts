import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserWhereInputObjectSchema as AuthUserWhereInputObjectSchema } from './AuthUserWhereInput.schema';
import { AuthUserUpdateWithoutLabUserInputObjectSchema as AuthUserUpdateWithoutLabUserInputObjectSchema } from './AuthUserUpdateWithoutLabUserInput.schema';
import { AuthUserUncheckedUpdateWithoutLabUserInputObjectSchema as AuthUserUncheckedUpdateWithoutLabUserInputObjectSchema } from './AuthUserUncheckedUpdateWithoutLabUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AuthUserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => AuthUserUpdateWithoutLabUserInputObjectSchema), z.lazy(() => AuthUserUncheckedUpdateWithoutLabUserInputObjectSchema)])
}).strict();
export const AuthUserUpdateToOneWithWhereWithoutLabUserInputObjectSchema: z.ZodType<Prisma.AuthUserUpdateToOneWithWhereWithoutLabUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUpdateToOneWithWhereWithoutLabUserInput>;
export const AuthUserUpdateToOneWithWhereWithoutLabUserInputObjectZodSchema = makeSchema();

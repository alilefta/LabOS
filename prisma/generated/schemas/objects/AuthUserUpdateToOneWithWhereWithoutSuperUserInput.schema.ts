import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserWhereInputObjectSchema as AuthUserWhereInputObjectSchema } from './AuthUserWhereInput.schema';
import { AuthUserUpdateWithoutSuperUserInputObjectSchema as AuthUserUpdateWithoutSuperUserInputObjectSchema } from './AuthUserUpdateWithoutSuperUserInput.schema';
import { AuthUserUncheckedUpdateWithoutSuperUserInputObjectSchema as AuthUserUncheckedUpdateWithoutSuperUserInputObjectSchema } from './AuthUserUncheckedUpdateWithoutSuperUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AuthUserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => AuthUserUpdateWithoutSuperUserInputObjectSchema), z.lazy(() => AuthUserUncheckedUpdateWithoutSuperUserInputObjectSchema)])
}).strict();
export const AuthUserUpdateToOneWithWhereWithoutSuperUserInputObjectSchema: z.ZodType<Prisma.AuthUserUpdateToOneWithWhereWithoutSuperUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUpdateToOneWithWhereWithoutSuperUserInput>;
export const AuthUserUpdateToOneWithWhereWithoutSuperUserInputObjectZodSchema = makeSchema();

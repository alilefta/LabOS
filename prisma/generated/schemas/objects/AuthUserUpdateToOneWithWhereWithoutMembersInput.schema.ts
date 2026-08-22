import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserWhereInputObjectSchema as AuthUserWhereInputObjectSchema } from './AuthUserWhereInput.schema';
import { AuthUserUpdateWithoutMembersInputObjectSchema as AuthUserUpdateWithoutMembersInputObjectSchema } from './AuthUserUpdateWithoutMembersInput.schema';
import { AuthUserUncheckedUpdateWithoutMembersInputObjectSchema as AuthUserUncheckedUpdateWithoutMembersInputObjectSchema } from './AuthUserUncheckedUpdateWithoutMembersInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AuthUserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => AuthUserUpdateWithoutMembersInputObjectSchema), z.lazy(() => AuthUserUncheckedUpdateWithoutMembersInputObjectSchema)])
}).strict();
export const AuthUserUpdateToOneWithWhereWithoutMembersInputObjectSchema: z.ZodType<Prisma.AuthUserUpdateToOneWithWhereWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUpdateToOneWithWhereWithoutMembersInput>;
export const AuthUserUpdateToOneWithWhereWithoutMembersInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './AuthUserWhereUniqueInput.schema';
import { AuthUserCreateWithoutMembersInputObjectSchema as AuthUserCreateWithoutMembersInputObjectSchema } from './AuthUserCreateWithoutMembersInput.schema';
import { AuthUserUncheckedCreateWithoutMembersInputObjectSchema as AuthUserUncheckedCreateWithoutMembersInputObjectSchema } from './AuthUserUncheckedCreateWithoutMembersInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AuthUserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AuthUserCreateWithoutMembersInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutMembersInputObjectSchema)])
}).strict();
export const AuthUserCreateOrConnectWithoutMembersInputObjectSchema: z.ZodType<Prisma.AuthUserCreateOrConnectWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserCreateOrConnectWithoutMembersInput>;
export const AuthUserCreateOrConnectWithoutMembersInputObjectZodSchema = makeSchema();

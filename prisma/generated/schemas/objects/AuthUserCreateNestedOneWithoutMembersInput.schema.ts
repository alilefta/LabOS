import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserCreateWithoutMembersInputObjectSchema as AuthUserCreateWithoutMembersInputObjectSchema } from './AuthUserCreateWithoutMembersInput.schema';
import { AuthUserUncheckedCreateWithoutMembersInputObjectSchema as AuthUserUncheckedCreateWithoutMembersInputObjectSchema } from './AuthUserUncheckedCreateWithoutMembersInput.schema';
import { AuthUserCreateOrConnectWithoutMembersInputObjectSchema as AuthUserCreateOrConnectWithoutMembersInputObjectSchema } from './AuthUserCreateOrConnectWithoutMembersInput.schema';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './AuthUserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AuthUserCreateWithoutMembersInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutMembersInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AuthUserCreateOrConnectWithoutMembersInputObjectSchema).optional(),
  connect: z.lazy(() => AuthUserWhereUniqueInputObjectSchema).optional()
}).strict();
export const AuthUserCreateNestedOneWithoutMembersInputObjectSchema: z.ZodType<Prisma.AuthUserCreateNestedOneWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserCreateNestedOneWithoutMembersInput>;
export const AuthUserCreateNestedOneWithoutMembersInputObjectZodSchema = makeSchema();

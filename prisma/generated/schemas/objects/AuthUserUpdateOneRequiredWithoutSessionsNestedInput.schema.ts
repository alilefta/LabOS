import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserCreateWithoutSessionsInputObjectSchema as AuthUserCreateWithoutSessionsInputObjectSchema } from './AuthUserCreateWithoutSessionsInput.schema';
import { AuthUserUncheckedCreateWithoutSessionsInputObjectSchema as AuthUserUncheckedCreateWithoutSessionsInputObjectSchema } from './AuthUserUncheckedCreateWithoutSessionsInput.schema';
import { AuthUserCreateOrConnectWithoutSessionsInputObjectSchema as AuthUserCreateOrConnectWithoutSessionsInputObjectSchema } from './AuthUserCreateOrConnectWithoutSessionsInput.schema';
import { AuthUserUpsertWithoutSessionsInputObjectSchema as AuthUserUpsertWithoutSessionsInputObjectSchema } from './AuthUserUpsertWithoutSessionsInput.schema';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './AuthUserWhereUniqueInput.schema';
import { AuthUserUpdateToOneWithWhereWithoutSessionsInputObjectSchema as AuthUserUpdateToOneWithWhereWithoutSessionsInputObjectSchema } from './AuthUserUpdateToOneWithWhereWithoutSessionsInput.schema';
import { AuthUserUpdateWithoutSessionsInputObjectSchema as AuthUserUpdateWithoutSessionsInputObjectSchema } from './AuthUserUpdateWithoutSessionsInput.schema';
import { AuthUserUncheckedUpdateWithoutSessionsInputObjectSchema as AuthUserUncheckedUpdateWithoutSessionsInputObjectSchema } from './AuthUserUncheckedUpdateWithoutSessionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AuthUserCreateWithoutSessionsInputObjectSchema), z.lazy(() => AuthUserUncheckedCreateWithoutSessionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AuthUserCreateOrConnectWithoutSessionsInputObjectSchema).optional(),
  upsert: z.lazy(() => AuthUserUpsertWithoutSessionsInputObjectSchema).optional(),
  connect: z.lazy(() => AuthUserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => AuthUserUpdateToOneWithWhereWithoutSessionsInputObjectSchema), z.lazy(() => AuthUserUpdateWithoutSessionsInputObjectSchema), z.lazy(() => AuthUserUncheckedUpdateWithoutSessionsInputObjectSchema)]).optional()
}).strict();
export const AuthUserUpdateOneRequiredWithoutSessionsNestedInputObjectSchema: z.ZodType<Prisma.AuthUserUpdateOneRequiredWithoutSessionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUpdateOneRequiredWithoutSessionsNestedInput>;
export const AuthUserUpdateOneRequiredWithoutSessionsNestedInputObjectZodSchema = makeSchema();

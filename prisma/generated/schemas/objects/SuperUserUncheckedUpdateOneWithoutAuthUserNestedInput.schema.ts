import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SuperUserCreateWithoutAuthUserInputObjectSchema as SuperUserCreateWithoutAuthUserInputObjectSchema } from './SuperUserCreateWithoutAuthUserInput.schema';
import { SuperUserUncheckedCreateWithoutAuthUserInputObjectSchema as SuperUserUncheckedCreateWithoutAuthUserInputObjectSchema } from './SuperUserUncheckedCreateWithoutAuthUserInput.schema';
import { SuperUserCreateOrConnectWithoutAuthUserInputObjectSchema as SuperUserCreateOrConnectWithoutAuthUserInputObjectSchema } from './SuperUserCreateOrConnectWithoutAuthUserInput.schema';
import { SuperUserUpsertWithoutAuthUserInputObjectSchema as SuperUserUpsertWithoutAuthUserInputObjectSchema } from './SuperUserUpsertWithoutAuthUserInput.schema';
import { SuperUserWhereInputObjectSchema as SuperUserWhereInputObjectSchema } from './SuperUserWhereInput.schema';
import { SuperUserWhereUniqueInputObjectSchema as SuperUserWhereUniqueInputObjectSchema } from './SuperUserWhereUniqueInput.schema';
import { SuperUserUpdateToOneWithWhereWithoutAuthUserInputObjectSchema as SuperUserUpdateToOneWithWhereWithoutAuthUserInputObjectSchema } from './SuperUserUpdateToOneWithWhereWithoutAuthUserInput.schema';
import { SuperUserUpdateWithoutAuthUserInputObjectSchema as SuperUserUpdateWithoutAuthUserInputObjectSchema } from './SuperUserUpdateWithoutAuthUserInput.schema';
import { SuperUserUncheckedUpdateWithoutAuthUserInputObjectSchema as SuperUserUncheckedUpdateWithoutAuthUserInputObjectSchema } from './SuperUserUncheckedUpdateWithoutAuthUserInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => SuperUserCreateWithoutAuthUserInputObjectSchema), z.lazy(() => SuperUserUncheckedCreateWithoutAuthUserInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => SuperUserCreateOrConnectWithoutAuthUserInputObjectSchema).optional(),
  upsert: z.lazy(() => SuperUserUpsertWithoutAuthUserInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => SuperUserWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => SuperUserWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => SuperUserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => SuperUserUpdateToOneWithWhereWithoutAuthUserInputObjectSchema), z.lazy(() => SuperUserUpdateWithoutAuthUserInputObjectSchema), z.lazy(() => SuperUserUncheckedUpdateWithoutAuthUserInputObjectSchema)]).optional()
}).strict();
export const SuperUserUncheckedUpdateOneWithoutAuthUserNestedInputObjectSchema: z.ZodType<Prisma.SuperUserUncheckedUpdateOneWithoutAuthUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.SuperUserUncheckedUpdateOneWithoutAuthUserNestedInput>;
export const SuperUserUncheckedUpdateOneWithoutAuthUserNestedInputObjectZodSchema = makeSchema();

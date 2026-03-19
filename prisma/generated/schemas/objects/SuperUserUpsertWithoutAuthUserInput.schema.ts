import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SuperUserUpdateWithoutAuthUserInputObjectSchema as SuperUserUpdateWithoutAuthUserInputObjectSchema } from './SuperUserUpdateWithoutAuthUserInput.schema';
import { SuperUserUncheckedUpdateWithoutAuthUserInputObjectSchema as SuperUserUncheckedUpdateWithoutAuthUserInputObjectSchema } from './SuperUserUncheckedUpdateWithoutAuthUserInput.schema';
import { SuperUserCreateWithoutAuthUserInputObjectSchema as SuperUserCreateWithoutAuthUserInputObjectSchema } from './SuperUserCreateWithoutAuthUserInput.schema';
import { SuperUserUncheckedCreateWithoutAuthUserInputObjectSchema as SuperUserUncheckedCreateWithoutAuthUserInputObjectSchema } from './SuperUserUncheckedCreateWithoutAuthUserInput.schema';
import { SuperUserWhereInputObjectSchema as SuperUserWhereInputObjectSchema } from './SuperUserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => SuperUserUpdateWithoutAuthUserInputObjectSchema), z.lazy(() => SuperUserUncheckedUpdateWithoutAuthUserInputObjectSchema)]),
  create: z.union([z.lazy(() => SuperUserCreateWithoutAuthUserInputObjectSchema), z.lazy(() => SuperUserUncheckedCreateWithoutAuthUserInputObjectSchema)]),
  where: z.lazy(() => SuperUserWhereInputObjectSchema).optional()
}).strict();
export const SuperUserUpsertWithoutAuthUserInputObjectSchema: z.ZodType<Prisma.SuperUserUpsertWithoutAuthUserInput> = makeSchema() as unknown as z.ZodType<Prisma.SuperUserUpsertWithoutAuthUserInput>;
export const SuperUserUpsertWithoutAuthUserInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SuperUserWhereInputObjectSchema as SuperUserWhereInputObjectSchema } from './SuperUserWhereInput.schema';
import { SuperUserUpdateWithoutAuthUserInputObjectSchema as SuperUserUpdateWithoutAuthUserInputObjectSchema } from './SuperUserUpdateWithoutAuthUserInput.schema';
import { SuperUserUncheckedUpdateWithoutAuthUserInputObjectSchema as SuperUserUncheckedUpdateWithoutAuthUserInputObjectSchema } from './SuperUserUncheckedUpdateWithoutAuthUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SuperUserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => SuperUserUpdateWithoutAuthUserInputObjectSchema), z.lazy(() => SuperUserUncheckedUpdateWithoutAuthUserInputObjectSchema)])
}).strict();
export const SuperUserUpdateToOneWithWhereWithoutAuthUserInputObjectSchema: z.ZodType<Prisma.SuperUserUpdateToOneWithWhereWithoutAuthUserInput> = makeSchema() as unknown as z.ZodType<Prisma.SuperUserUpdateToOneWithWhereWithoutAuthUserInput>;
export const SuperUserUpdateToOneWithWhereWithoutAuthUserInputObjectZodSchema = makeSchema();

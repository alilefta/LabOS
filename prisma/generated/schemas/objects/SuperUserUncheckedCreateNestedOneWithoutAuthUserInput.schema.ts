import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SuperUserCreateWithoutAuthUserInputObjectSchema as SuperUserCreateWithoutAuthUserInputObjectSchema } from './SuperUserCreateWithoutAuthUserInput.schema';
import { SuperUserUncheckedCreateWithoutAuthUserInputObjectSchema as SuperUserUncheckedCreateWithoutAuthUserInputObjectSchema } from './SuperUserUncheckedCreateWithoutAuthUserInput.schema';
import { SuperUserCreateOrConnectWithoutAuthUserInputObjectSchema as SuperUserCreateOrConnectWithoutAuthUserInputObjectSchema } from './SuperUserCreateOrConnectWithoutAuthUserInput.schema';
import { SuperUserWhereUniqueInputObjectSchema as SuperUserWhereUniqueInputObjectSchema } from './SuperUserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => SuperUserCreateWithoutAuthUserInputObjectSchema), z.lazy(() => SuperUserUncheckedCreateWithoutAuthUserInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => SuperUserCreateOrConnectWithoutAuthUserInputObjectSchema).optional(),
  connect: z.lazy(() => SuperUserWhereUniqueInputObjectSchema).optional()
}).strict();
export const SuperUserUncheckedCreateNestedOneWithoutAuthUserInputObjectSchema: z.ZodType<Prisma.SuperUserUncheckedCreateNestedOneWithoutAuthUserInput> = makeSchema() as unknown as z.ZodType<Prisma.SuperUserUncheckedCreateNestedOneWithoutAuthUserInput>;
export const SuperUserUncheckedCreateNestedOneWithoutAuthUserInputObjectZodSchema = makeSchema();

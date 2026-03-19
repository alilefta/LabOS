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
export const SuperUserCreateNestedOneWithoutAuthUserInputObjectSchema: z.ZodType<Prisma.SuperUserCreateNestedOneWithoutAuthUserInput> = makeSchema() as unknown as z.ZodType<Prisma.SuperUserCreateNestedOneWithoutAuthUserInput>;
export const SuperUserCreateNestedOneWithoutAuthUserInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SuperUserWhereUniqueInputObjectSchema as SuperUserWhereUniqueInputObjectSchema } from './SuperUserWhereUniqueInput.schema';
import { SuperUserCreateWithoutAuthUserInputObjectSchema as SuperUserCreateWithoutAuthUserInputObjectSchema } from './SuperUserCreateWithoutAuthUserInput.schema';
import { SuperUserUncheckedCreateWithoutAuthUserInputObjectSchema as SuperUserUncheckedCreateWithoutAuthUserInputObjectSchema } from './SuperUserUncheckedCreateWithoutAuthUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SuperUserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => SuperUserCreateWithoutAuthUserInputObjectSchema), z.lazy(() => SuperUserUncheckedCreateWithoutAuthUserInputObjectSchema)])
}).strict();
export const SuperUserCreateOrConnectWithoutAuthUserInputObjectSchema: z.ZodType<Prisma.SuperUserCreateOrConnectWithoutAuthUserInput> = makeSchema() as unknown as z.ZodType<Prisma.SuperUserCreateOrConnectWithoutAuthUserInput>;
export const SuperUserCreateOrConnectWithoutAuthUserInputObjectZodSchema = makeSchema();

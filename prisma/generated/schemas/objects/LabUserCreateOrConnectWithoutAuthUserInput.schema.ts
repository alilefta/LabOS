import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserWhereUniqueInputObjectSchema as LabUserWhereUniqueInputObjectSchema } from './LabUserWhereUniqueInput.schema';
import { LabUserCreateWithoutAuthUserInputObjectSchema as LabUserCreateWithoutAuthUserInputObjectSchema } from './LabUserCreateWithoutAuthUserInput.schema';
import { LabUserUncheckedCreateWithoutAuthUserInputObjectSchema as LabUserUncheckedCreateWithoutAuthUserInputObjectSchema } from './LabUserUncheckedCreateWithoutAuthUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabUserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabUserCreateWithoutAuthUserInputObjectSchema), z.lazy(() => LabUserUncheckedCreateWithoutAuthUserInputObjectSchema)])
}).strict();
export const LabUserCreateOrConnectWithoutAuthUserInputObjectSchema: z.ZodType<Prisma.LabUserCreateOrConnectWithoutAuthUserInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserCreateOrConnectWithoutAuthUserInput>;
export const LabUserCreateOrConnectWithoutAuthUserInputObjectZodSchema = makeSchema();

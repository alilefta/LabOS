import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserCreateWithoutAuthUserInputObjectSchema as LabUserCreateWithoutAuthUserInputObjectSchema } from './LabUserCreateWithoutAuthUserInput.schema';
import { LabUserUncheckedCreateWithoutAuthUserInputObjectSchema as LabUserUncheckedCreateWithoutAuthUserInputObjectSchema } from './LabUserUncheckedCreateWithoutAuthUserInput.schema';
import { LabUserCreateOrConnectWithoutAuthUserInputObjectSchema as LabUserCreateOrConnectWithoutAuthUserInputObjectSchema } from './LabUserCreateOrConnectWithoutAuthUserInput.schema';
import { LabUserWhereUniqueInputObjectSchema as LabUserWhereUniqueInputObjectSchema } from './LabUserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabUserCreateWithoutAuthUserInputObjectSchema), z.lazy(() => LabUserUncheckedCreateWithoutAuthUserInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabUserCreateOrConnectWithoutAuthUserInputObjectSchema).optional(),
  connect: z.lazy(() => LabUserWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabUserCreateNestedOneWithoutAuthUserInputObjectSchema: z.ZodType<Prisma.LabUserCreateNestedOneWithoutAuthUserInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserCreateNestedOneWithoutAuthUserInput>;
export const LabUserCreateNestedOneWithoutAuthUserInputObjectZodSchema = makeSchema();

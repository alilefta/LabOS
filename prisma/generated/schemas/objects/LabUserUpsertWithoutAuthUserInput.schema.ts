import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserUpdateWithoutAuthUserInputObjectSchema as LabUserUpdateWithoutAuthUserInputObjectSchema } from './LabUserUpdateWithoutAuthUserInput.schema';
import { LabUserUncheckedUpdateWithoutAuthUserInputObjectSchema as LabUserUncheckedUpdateWithoutAuthUserInputObjectSchema } from './LabUserUncheckedUpdateWithoutAuthUserInput.schema';
import { LabUserCreateWithoutAuthUserInputObjectSchema as LabUserCreateWithoutAuthUserInputObjectSchema } from './LabUserCreateWithoutAuthUserInput.schema';
import { LabUserUncheckedCreateWithoutAuthUserInputObjectSchema as LabUserUncheckedCreateWithoutAuthUserInputObjectSchema } from './LabUserUncheckedCreateWithoutAuthUserInput.schema';
import { LabUserWhereInputObjectSchema as LabUserWhereInputObjectSchema } from './LabUserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUserUpdateWithoutAuthUserInputObjectSchema), z.lazy(() => LabUserUncheckedUpdateWithoutAuthUserInputObjectSchema)]),
  create: z.union([z.lazy(() => LabUserCreateWithoutAuthUserInputObjectSchema), z.lazy(() => LabUserUncheckedCreateWithoutAuthUserInputObjectSchema)]),
  where: z.lazy(() => LabUserWhereInputObjectSchema).optional()
}).strict();
export const LabUserUpsertWithoutAuthUserInputObjectSchema: z.ZodType<Prisma.LabUserUpsertWithoutAuthUserInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserUpsertWithoutAuthUserInput>;
export const LabUserUpsertWithoutAuthUserInputObjectZodSchema = makeSchema();

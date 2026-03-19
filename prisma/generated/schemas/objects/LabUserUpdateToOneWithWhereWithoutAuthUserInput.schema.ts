import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserWhereInputObjectSchema as LabUserWhereInputObjectSchema } from './LabUserWhereInput.schema';
import { LabUserUpdateWithoutAuthUserInputObjectSchema as LabUserUpdateWithoutAuthUserInputObjectSchema } from './LabUserUpdateWithoutAuthUserInput.schema';
import { LabUserUncheckedUpdateWithoutAuthUserInputObjectSchema as LabUserUncheckedUpdateWithoutAuthUserInputObjectSchema } from './LabUserUncheckedUpdateWithoutAuthUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabUserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUserUpdateWithoutAuthUserInputObjectSchema), z.lazy(() => LabUserUncheckedUpdateWithoutAuthUserInputObjectSchema)])
}).strict();
export const LabUserUpdateToOneWithWhereWithoutAuthUserInputObjectSchema: z.ZodType<Prisma.LabUserUpdateToOneWithWhereWithoutAuthUserInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserUpdateToOneWithWhereWithoutAuthUserInput>;
export const LabUserUpdateToOneWithWhereWithoutAuthUserInputObjectZodSchema = makeSchema();

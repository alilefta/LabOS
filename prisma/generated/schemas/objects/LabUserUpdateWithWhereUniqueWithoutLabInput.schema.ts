import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserWhereUniqueInputObjectSchema as LabUserWhereUniqueInputObjectSchema } from './LabUserWhereUniqueInput.schema';
import { LabUserUpdateWithoutLabInputObjectSchema as LabUserUpdateWithoutLabInputObjectSchema } from './LabUserUpdateWithoutLabInput.schema';
import { LabUserUncheckedUpdateWithoutLabInputObjectSchema as LabUserUncheckedUpdateWithoutLabInputObjectSchema } from './LabUserUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabUserWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => LabUserUpdateWithoutLabInputObjectSchema), z.lazy(() => LabUserUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const LabUserUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.LabUserUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserUpdateWithWhereUniqueWithoutLabInput>;
export const LabUserUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserWhereUniqueInputObjectSchema as LabUserWhereUniqueInputObjectSchema } from './LabUserWhereUniqueInput.schema';
import { LabUserUpdateWithoutLabInputObjectSchema as LabUserUpdateWithoutLabInputObjectSchema } from './LabUserUpdateWithoutLabInput.schema';
import { LabUserUncheckedUpdateWithoutLabInputObjectSchema as LabUserUncheckedUpdateWithoutLabInputObjectSchema } from './LabUserUncheckedUpdateWithoutLabInput.schema';
import { LabUserCreateWithoutLabInputObjectSchema as LabUserCreateWithoutLabInputObjectSchema } from './LabUserCreateWithoutLabInput.schema';
import { LabUserUncheckedCreateWithoutLabInputObjectSchema as LabUserUncheckedCreateWithoutLabInputObjectSchema } from './LabUserUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabUserWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => LabUserUpdateWithoutLabInputObjectSchema), z.lazy(() => LabUserUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => LabUserCreateWithoutLabInputObjectSchema), z.lazy(() => LabUserUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const LabUserUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.LabUserUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserUpsertWithWhereUniqueWithoutLabInput>;
export const LabUserUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();

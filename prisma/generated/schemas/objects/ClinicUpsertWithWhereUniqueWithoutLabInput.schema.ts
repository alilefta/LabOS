import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './ClinicWhereUniqueInput.schema';
import { ClinicUpdateWithoutLabInputObjectSchema as ClinicUpdateWithoutLabInputObjectSchema } from './ClinicUpdateWithoutLabInput.schema';
import { ClinicUncheckedUpdateWithoutLabInputObjectSchema as ClinicUncheckedUpdateWithoutLabInputObjectSchema } from './ClinicUncheckedUpdateWithoutLabInput.schema';
import { ClinicCreateWithoutLabInputObjectSchema as ClinicCreateWithoutLabInputObjectSchema } from './ClinicCreateWithoutLabInput.schema';
import { ClinicUncheckedCreateWithoutLabInputObjectSchema as ClinicUncheckedCreateWithoutLabInputObjectSchema } from './ClinicUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ClinicWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ClinicUpdateWithoutLabInputObjectSchema), z.lazy(() => ClinicUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => ClinicCreateWithoutLabInputObjectSchema), z.lazy(() => ClinicUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const ClinicUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.ClinicUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicUpsertWithWhereUniqueWithoutLabInput>;
export const ClinicUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();

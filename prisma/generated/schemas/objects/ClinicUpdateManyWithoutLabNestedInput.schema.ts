import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicCreateWithoutLabInputObjectSchema as ClinicCreateWithoutLabInputObjectSchema } from './ClinicCreateWithoutLabInput.schema';
import { ClinicUncheckedCreateWithoutLabInputObjectSchema as ClinicUncheckedCreateWithoutLabInputObjectSchema } from './ClinicUncheckedCreateWithoutLabInput.schema';
import { ClinicCreateOrConnectWithoutLabInputObjectSchema as ClinicCreateOrConnectWithoutLabInputObjectSchema } from './ClinicCreateOrConnectWithoutLabInput.schema';
import { ClinicUpsertWithWhereUniqueWithoutLabInputObjectSchema as ClinicUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './ClinicUpsertWithWhereUniqueWithoutLabInput.schema';
import { ClinicCreateManyLabInputEnvelopeObjectSchema as ClinicCreateManyLabInputEnvelopeObjectSchema } from './ClinicCreateManyLabInputEnvelope.schema';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './ClinicWhereUniqueInput.schema';
import { ClinicUpdateWithWhereUniqueWithoutLabInputObjectSchema as ClinicUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './ClinicUpdateWithWhereUniqueWithoutLabInput.schema';
import { ClinicUpdateManyWithWhereWithoutLabInputObjectSchema as ClinicUpdateManyWithWhereWithoutLabInputObjectSchema } from './ClinicUpdateManyWithWhereWithoutLabInput.schema';
import { ClinicScalarWhereInputObjectSchema as ClinicScalarWhereInputObjectSchema } from './ClinicScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ClinicCreateWithoutLabInputObjectSchema), z.lazy(() => ClinicCreateWithoutLabInputObjectSchema).array(), z.lazy(() => ClinicUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => ClinicUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ClinicCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => ClinicCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ClinicUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => ClinicUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ClinicCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ClinicWhereUniqueInputObjectSchema), z.lazy(() => ClinicWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ClinicWhereUniqueInputObjectSchema), z.lazy(() => ClinicWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ClinicWhereUniqueInputObjectSchema), z.lazy(() => ClinicWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ClinicWhereUniqueInputObjectSchema), z.lazy(() => ClinicWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ClinicUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => ClinicUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ClinicUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => ClinicUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ClinicScalarWhereInputObjectSchema), z.lazy(() => ClinicScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ClinicUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.ClinicUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicUpdateManyWithoutLabNestedInput>;
export const ClinicUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();

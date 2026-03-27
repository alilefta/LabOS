import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistCreateWithoutLabInputObjectSchema as DentistCreateWithoutLabInputObjectSchema } from './DentistCreateWithoutLabInput.schema';
import { DentistUncheckedCreateWithoutLabInputObjectSchema as DentistUncheckedCreateWithoutLabInputObjectSchema } from './DentistUncheckedCreateWithoutLabInput.schema';
import { DentistCreateOrConnectWithoutLabInputObjectSchema as DentistCreateOrConnectWithoutLabInputObjectSchema } from './DentistCreateOrConnectWithoutLabInput.schema';
import { DentistUpsertWithWhereUniqueWithoutLabInputObjectSchema as DentistUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './DentistUpsertWithWhereUniqueWithoutLabInput.schema';
import { DentistCreateManyLabInputEnvelopeObjectSchema as DentistCreateManyLabInputEnvelopeObjectSchema } from './DentistCreateManyLabInputEnvelope.schema';
import { DentistWhereUniqueInputObjectSchema as DentistWhereUniqueInputObjectSchema } from './DentistWhereUniqueInput.schema';
import { DentistUpdateWithWhereUniqueWithoutLabInputObjectSchema as DentistUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './DentistUpdateWithWhereUniqueWithoutLabInput.schema';
import { DentistUpdateManyWithWhereWithoutLabInputObjectSchema as DentistUpdateManyWithWhereWithoutLabInputObjectSchema } from './DentistUpdateManyWithWhereWithoutLabInput.schema';
import { DentistScalarWhereInputObjectSchema as DentistScalarWhereInputObjectSchema } from './DentistScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => DentistCreateWithoutLabInputObjectSchema), z.lazy(() => DentistCreateWithoutLabInputObjectSchema).array(), z.lazy(() => DentistUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => DentistUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => DentistCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => DentistCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => DentistUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => DentistUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => DentistCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => DentistWhereUniqueInputObjectSchema), z.lazy(() => DentistWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => DentistWhereUniqueInputObjectSchema), z.lazy(() => DentistWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => DentistWhereUniqueInputObjectSchema), z.lazy(() => DentistWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => DentistWhereUniqueInputObjectSchema), z.lazy(() => DentistWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => DentistUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => DentistUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => DentistUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => DentistUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => DentistScalarWhereInputObjectSchema), z.lazy(() => DentistScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const DentistUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.DentistUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistUpdateManyWithoutLabNestedInput>;
export const DentistUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();

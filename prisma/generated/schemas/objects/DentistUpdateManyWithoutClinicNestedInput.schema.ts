import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistCreateWithoutClinicInputObjectSchema as DentistCreateWithoutClinicInputObjectSchema } from './DentistCreateWithoutClinicInput.schema';
import { DentistUncheckedCreateWithoutClinicInputObjectSchema as DentistUncheckedCreateWithoutClinicInputObjectSchema } from './DentistUncheckedCreateWithoutClinicInput.schema';
import { DentistCreateOrConnectWithoutClinicInputObjectSchema as DentistCreateOrConnectWithoutClinicInputObjectSchema } from './DentistCreateOrConnectWithoutClinicInput.schema';
import { DentistUpsertWithWhereUniqueWithoutClinicInputObjectSchema as DentistUpsertWithWhereUniqueWithoutClinicInputObjectSchema } from './DentistUpsertWithWhereUniqueWithoutClinicInput.schema';
import { DentistCreateManyClinicInputEnvelopeObjectSchema as DentistCreateManyClinicInputEnvelopeObjectSchema } from './DentistCreateManyClinicInputEnvelope.schema';
import { DentistWhereUniqueInputObjectSchema as DentistWhereUniqueInputObjectSchema } from './DentistWhereUniqueInput.schema';
import { DentistUpdateWithWhereUniqueWithoutClinicInputObjectSchema as DentistUpdateWithWhereUniqueWithoutClinicInputObjectSchema } from './DentistUpdateWithWhereUniqueWithoutClinicInput.schema';
import { DentistUpdateManyWithWhereWithoutClinicInputObjectSchema as DentistUpdateManyWithWhereWithoutClinicInputObjectSchema } from './DentistUpdateManyWithWhereWithoutClinicInput.schema';
import { DentistScalarWhereInputObjectSchema as DentistScalarWhereInputObjectSchema } from './DentistScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => DentistCreateWithoutClinicInputObjectSchema), z.lazy(() => DentistCreateWithoutClinicInputObjectSchema).array(), z.lazy(() => DentistUncheckedCreateWithoutClinicInputObjectSchema), z.lazy(() => DentistUncheckedCreateWithoutClinicInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => DentistCreateOrConnectWithoutClinicInputObjectSchema), z.lazy(() => DentistCreateOrConnectWithoutClinicInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => DentistUpsertWithWhereUniqueWithoutClinicInputObjectSchema), z.lazy(() => DentistUpsertWithWhereUniqueWithoutClinicInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => DentistCreateManyClinicInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => DentistWhereUniqueInputObjectSchema), z.lazy(() => DentistWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => DentistWhereUniqueInputObjectSchema), z.lazy(() => DentistWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => DentistWhereUniqueInputObjectSchema), z.lazy(() => DentistWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => DentistWhereUniqueInputObjectSchema), z.lazy(() => DentistWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => DentistUpdateWithWhereUniqueWithoutClinicInputObjectSchema), z.lazy(() => DentistUpdateWithWhereUniqueWithoutClinicInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => DentistUpdateManyWithWhereWithoutClinicInputObjectSchema), z.lazy(() => DentistUpdateManyWithWhereWithoutClinicInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => DentistScalarWhereInputObjectSchema), z.lazy(() => DentistScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const DentistUpdateManyWithoutClinicNestedInputObjectSchema: z.ZodType<Prisma.DentistUpdateManyWithoutClinicNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistUpdateManyWithoutClinicNestedInput>;
export const DentistUpdateManyWithoutClinicNestedInputObjectZodSchema = makeSchema();

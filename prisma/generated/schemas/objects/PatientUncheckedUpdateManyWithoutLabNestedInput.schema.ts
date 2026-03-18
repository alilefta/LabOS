import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientCreateWithoutLabInputObjectSchema as PatientCreateWithoutLabInputObjectSchema } from './PatientCreateWithoutLabInput.schema';
import { PatientUncheckedCreateWithoutLabInputObjectSchema as PatientUncheckedCreateWithoutLabInputObjectSchema } from './PatientUncheckedCreateWithoutLabInput.schema';
import { PatientCreateOrConnectWithoutLabInputObjectSchema as PatientCreateOrConnectWithoutLabInputObjectSchema } from './PatientCreateOrConnectWithoutLabInput.schema';
import { PatientUpsertWithWhereUniqueWithoutLabInputObjectSchema as PatientUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './PatientUpsertWithWhereUniqueWithoutLabInput.schema';
import { PatientCreateManyLabInputEnvelopeObjectSchema as PatientCreateManyLabInputEnvelopeObjectSchema } from './PatientCreateManyLabInputEnvelope.schema';
import { PatientWhereUniqueInputObjectSchema as PatientWhereUniqueInputObjectSchema } from './PatientWhereUniqueInput.schema';
import { PatientUpdateWithWhereUniqueWithoutLabInputObjectSchema as PatientUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './PatientUpdateWithWhereUniqueWithoutLabInput.schema';
import { PatientUpdateManyWithWhereWithoutLabInputObjectSchema as PatientUpdateManyWithWhereWithoutLabInputObjectSchema } from './PatientUpdateManyWithWhereWithoutLabInput.schema';
import { PatientScalarWhereInputObjectSchema as PatientScalarWhereInputObjectSchema } from './PatientScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PatientCreateWithoutLabInputObjectSchema), z.lazy(() => PatientCreateWithoutLabInputObjectSchema).array(), z.lazy(() => PatientUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => PatientUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PatientCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => PatientCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PatientUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => PatientUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PatientCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => PatientWhereUniqueInputObjectSchema), z.lazy(() => PatientWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PatientWhereUniqueInputObjectSchema), z.lazy(() => PatientWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PatientWhereUniqueInputObjectSchema), z.lazy(() => PatientWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PatientWhereUniqueInputObjectSchema), z.lazy(() => PatientWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PatientUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => PatientUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PatientUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => PatientUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PatientScalarWhereInputObjectSchema), z.lazy(() => PatientScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PatientUncheckedUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.PatientUncheckedUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientUncheckedUpdateManyWithoutLabNestedInput>;
export const PatientUncheckedUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();

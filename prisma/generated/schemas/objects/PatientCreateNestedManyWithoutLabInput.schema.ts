import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientCreateWithoutLabInputObjectSchema as PatientCreateWithoutLabInputObjectSchema } from './PatientCreateWithoutLabInput.schema';
import { PatientUncheckedCreateWithoutLabInputObjectSchema as PatientUncheckedCreateWithoutLabInputObjectSchema } from './PatientUncheckedCreateWithoutLabInput.schema';
import { PatientCreateOrConnectWithoutLabInputObjectSchema as PatientCreateOrConnectWithoutLabInputObjectSchema } from './PatientCreateOrConnectWithoutLabInput.schema';
import { PatientCreateManyLabInputEnvelopeObjectSchema as PatientCreateManyLabInputEnvelopeObjectSchema } from './PatientCreateManyLabInputEnvelope.schema';
import { PatientWhereUniqueInputObjectSchema as PatientWhereUniqueInputObjectSchema } from './PatientWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PatientCreateWithoutLabInputObjectSchema), z.lazy(() => PatientCreateWithoutLabInputObjectSchema).array(), z.lazy(() => PatientUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => PatientUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PatientCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => PatientCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PatientCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => PatientWhereUniqueInputObjectSchema), z.lazy(() => PatientWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PatientCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.PatientCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientCreateNestedManyWithoutLabInput>;
export const PatientCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistCreateWithoutClinicInputObjectSchema as DentistCreateWithoutClinicInputObjectSchema } from './DentistCreateWithoutClinicInput.schema';
import { DentistUncheckedCreateWithoutClinicInputObjectSchema as DentistUncheckedCreateWithoutClinicInputObjectSchema } from './DentistUncheckedCreateWithoutClinicInput.schema';
import { DentistCreateOrConnectWithoutClinicInputObjectSchema as DentistCreateOrConnectWithoutClinicInputObjectSchema } from './DentistCreateOrConnectWithoutClinicInput.schema';
import { DentistCreateManyClinicInputEnvelopeObjectSchema as DentistCreateManyClinicInputEnvelopeObjectSchema } from './DentistCreateManyClinicInputEnvelope.schema';
import { DentistWhereUniqueInputObjectSchema as DentistWhereUniqueInputObjectSchema } from './DentistWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => DentistCreateWithoutClinicInputObjectSchema), z.lazy(() => DentistCreateWithoutClinicInputObjectSchema).array(), z.lazy(() => DentistUncheckedCreateWithoutClinicInputObjectSchema), z.lazy(() => DentistUncheckedCreateWithoutClinicInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => DentistCreateOrConnectWithoutClinicInputObjectSchema), z.lazy(() => DentistCreateOrConnectWithoutClinicInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => DentistCreateManyClinicInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => DentistWhereUniqueInputObjectSchema), z.lazy(() => DentistWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const DentistUncheckedCreateNestedManyWithoutClinicInputObjectSchema: z.ZodType<Prisma.DentistUncheckedCreateNestedManyWithoutClinicInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistUncheckedCreateNestedManyWithoutClinicInput>;
export const DentistUncheckedCreateNestedManyWithoutClinicInputObjectZodSchema = makeSchema();

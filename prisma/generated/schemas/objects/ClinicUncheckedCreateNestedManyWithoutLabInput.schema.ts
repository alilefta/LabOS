import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicCreateWithoutLabInputObjectSchema as ClinicCreateWithoutLabInputObjectSchema } from './ClinicCreateWithoutLabInput.schema';
import { ClinicUncheckedCreateWithoutLabInputObjectSchema as ClinicUncheckedCreateWithoutLabInputObjectSchema } from './ClinicUncheckedCreateWithoutLabInput.schema';
import { ClinicCreateOrConnectWithoutLabInputObjectSchema as ClinicCreateOrConnectWithoutLabInputObjectSchema } from './ClinicCreateOrConnectWithoutLabInput.schema';
import { ClinicCreateManyLabInputEnvelopeObjectSchema as ClinicCreateManyLabInputEnvelopeObjectSchema } from './ClinicCreateManyLabInputEnvelope.schema';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './ClinicWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ClinicCreateWithoutLabInputObjectSchema), z.lazy(() => ClinicCreateWithoutLabInputObjectSchema).array(), z.lazy(() => ClinicUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => ClinicUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ClinicCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => ClinicCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ClinicCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ClinicWhereUniqueInputObjectSchema), z.lazy(() => ClinicWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ClinicUncheckedCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.ClinicUncheckedCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicUncheckedCreateNestedManyWithoutLabInput>;
export const ClinicUncheckedCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();

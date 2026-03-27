import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistCreateWithoutLabInputObjectSchema as DentistCreateWithoutLabInputObjectSchema } from './DentistCreateWithoutLabInput.schema';
import { DentistUncheckedCreateWithoutLabInputObjectSchema as DentistUncheckedCreateWithoutLabInputObjectSchema } from './DentistUncheckedCreateWithoutLabInput.schema';
import { DentistCreateOrConnectWithoutLabInputObjectSchema as DentistCreateOrConnectWithoutLabInputObjectSchema } from './DentistCreateOrConnectWithoutLabInput.schema';
import { DentistCreateManyLabInputEnvelopeObjectSchema as DentistCreateManyLabInputEnvelopeObjectSchema } from './DentistCreateManyLabInputEnvelope.schema';
import { DentistWhereUniqueInputObjectSchema as DentistWhereUniqueInputObjectSchema } from './DentistWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => DentistCreateWithoutLabInputObjectSchema), z.lazy(() => DentistCreateWithoutLabInputObjectSchema).array(), z.lazy(() => DentistUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => DentistUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => DentistCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => DentistCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => DentistCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => DentistWhereUniqueInputObjectSchema), z.lazy(() => DentistWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const DentistCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.DentistCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistCreateNestedManyWithoutLabInput>;
export const DentistCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { TechnicianCreateWithoutLabInputObjectSchema as TechnicianCreateWithoutLabInputObjectSchema } from './TechnicianCreateWithoutLabInput.schema';
import { TechnicianUncheckedCreateWithoutLabInputObjectSchema as TechnicianUncheckedCreateWithoutLabInputObjectSchema } from './TechnicianUncheckedCreateWithoutLabInput.schema';
import { TechnicianCreateOrConnectWithoutLabInputObjectSchema as TechnicianCreateOrConnectWithoutLabInputObjectSchema } from './TechnicianCreateOrConnectWithoutLabInput.schema';
import { TechnicianUpsertWithWhereUniqueWithoutLabInputObjectSchema as TechnicianUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './TechnicianUpsertWithWhereUniqueWithoutLabInput.schema';
import { TechnicianCreateManyLabInputEnvelopeObjectSchema as TechnicianCreateManyLabInputEnvelopeObjectSchema } from './TechnicianCreateManyLabInputEnvelope.schema';
import { TechnicianWhereUniqueInputObjectSchema as TechnicianWhereUniqueInputObjectSchema } from './TechnicianWhereUniqueInput.schema';
import { TechnicianUpdateWithWhereUniqueWithoutLabInputObjectSchema as TechnicianUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './TechnicianUpdateWithWhereUniqueWithoutLabInput.schema';
import { TechnicianUpdateManyWithWhereWithoutLabInputObjectSchema as TechnicianUpdateManyWithWhereWithoutLabInputObjectSchema } from './TechnicianUpdateManyWithWhereWithoutLabInput.schema';
import { TechnicianScalarWhereInputObjectSchema as TechnicianScalarWhereInputObjectSchema } from './TechnicianScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => TechnicianCreateWithoutLabInputObjectSchema), z.lazy(() => TechnicianCreateWithoutLabInputObjectSchema).array(), z.lazy(() => TechnicianUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => TechnicianUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => TechnicianCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => TechnicianCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => TechnicianUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => TechnicianUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => TechnicianCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => TechnicianWhereUniqueInputObjectSchema), z.lazy(() => TechnicianWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => TechnicianWhereUniqueInputObjectSchema), z.lazy(() => TechnicianWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => TechnicianWhereUniqueInputObjectSchema), z.lazy(() => TechnicianWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => TechnicianWhereUniqueInputObjectSchema), z.lazy(() => TechnicianWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => TechnicianUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => TechnicianUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => TechnicianUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => TechnicianUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => TechnicianScalarWhereInputObjectSchema), z.lazy(() => TechnicianScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const TechnicianUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.TechnicianUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianUpdateManyWithoutLabNestedInput>;
export const TechnicianUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();

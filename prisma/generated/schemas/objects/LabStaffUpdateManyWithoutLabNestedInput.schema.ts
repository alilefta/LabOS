import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffCreateWithoutLabInputObjectSchema as LabStaffCreateWithoutLabInputObjectSchema } from './LabStaffCreateWithoutLabInput.schema';
import { LabStaffUncheckedCreateWithoutLabInputObjectSchema as LabStaffUncheckedCreateWithoutLabInputObjectSchema } from './LabStaffUncheckedCreateWithoutLabInput.schema';
import { LabStaffCreateOrConnectWithoutLabInputObjectSchema as LabStaffCreateOrConnectWithoutLabInputObjectSchema } from './LabStaffCreateOrConnectWithoutLabInput.schema';
import { LabStaffUpsertWithWhereUniqueWithoutLabInputObjectSchema as LabStaffUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './LabStaffUpsertWithWhereUniqueWithoutLabInput.schema';
import { LabStaffCreateManyLabInputEnvelopeObjectSchema as LabStaffCreateManyLabInputEnvelopeObjectSchema } from './LabStaffCreateManyLabInputEnvelope.schema';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema';
import { LabStaffUpdateWithWhereUniqueWithoutLabInputObjectSchema as LabStaffUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './LabStaffUpdateWithWhereUniqueWithoutLabInput.schema';
import { LabStaffUpdateManyWithWhereWithoutLabInputObjectSchema as LabStaffUpdateManyWithWhereWithoutLabInputObjectSchema } from './LabStaffUpdateManyWithWhereWithoutLabInput.schema';
import { LabStaffScalarWhereInputObjectSchema as LabStaffScalarWhereInputObjectSchema } from './LabStaffScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabStaffCreateWithoutLabInputObjectSchema), z.lazy(() => LabStaffCreateWithoutLabInputObjectSchema).array(), z.lazy(() => LabStaffUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => LabStaffCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => LabStaffCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => LabStaffUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => LabStaffUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => LabStaffCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => LabStaffWhereUniqueInputObjectSchema), z.lazy(() => LabStaffWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => LabStaffWhereUniqueInputObjectSchema), z.lazy(() => LabStaffWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => LabStaffWhereUniqueInputObjectSchema), z.lazy(() => LabStaffWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => LabStaffWhereUniqueInputObjectSchema), z.lazy(() => LabStaffWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => LabStaffUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => LabStaffUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => LabStaffUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => LabStaffUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => LabStaffScalarWhereInputObjectSchema), z.lazy(() => LabStaffScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const LabStaffUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.LabStaffUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpdateManyWithoutLabNestedInput>;
export const LabStaffUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();

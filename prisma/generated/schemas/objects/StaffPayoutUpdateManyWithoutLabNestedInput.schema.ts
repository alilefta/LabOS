import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutCreateWithoutLabInputObjectSchema as StaffPayoutCreateWithoutLabInputObjectSchema } from './StaffPayoutCreateWithoutLabInput.schema';
import { StaffPayoutUncheckedCreateWithoutLabInputObjectSchema as StaffPayoutUncheckedCreateWithoutLabInputObjectSchema } from './StaffPayoutUncheckedCreateWithoutLabInput.schema';
import { StaffPayoutCreateOrConnectWithoutLabInputObjectSchema as StaffPayoutCreateOrConnectWithoutLabInputObjectSchema } from './StaffPayoutCreateOrConnectWithoutLabInput.schema';
import { StaffPayoutUpsertWithWhereUniqueWithoutLabInputObjectSchema as StaffPayoutUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './StaffPayoutUpsertWithWhereUniqueWithoutLabInput.schema';
import { StaffPayoutCreateManyLabInputEnvelopeObjectSchema as StaffPayoutCreateManyLabInputEnvelopeObjectSchema } from './StaffPayoutCreateManyLabInputEnvelope.schema';
import { StaffPayoutWhereUniqueInputObjectSchema as StaffPayoutWhereUniqueInputObjectSchema } from './StaffPayoutWhereUniqueInput.schema';
import { StaffPayoutUpdateWithWhereUniqueWithoutLabInputObjectSchema as StaffPayoutUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './StaffPayoutUpdateWithWhereUniqueWithoutLabInput.schema';
import { StaffPayoutUpdateManyWithWhereWithoutLabInputObjectSchema as StaffPayoutUpdateManyWithWhereWithoutLabInputObjectSchema } from './StaffPayoutUpdateManyWithWhereWithoutLabInput.schema';
import { StaffPayoutScalarWhereInputObjectSchema as StaffPayoutScalarWhereInputObjectSchema } from './StaffPayoutScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffPayoutCreateWithoutLabInputObjectSchema), z.lazy(() => StaffPayoutCreateWithoutLabInputObjectSchema).array(), z.lazy(() => StaffPayoutUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => StaffPayoutUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffPayoutCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => StaffPayoutCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => StaffPayoutUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => StaffPayoutUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffPayoutCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema), z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema), z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema), z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema), z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => StaffPayoutUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => StaffPayoutUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => StaffPayoutUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => StaffPayoutUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => StaffPayoutScalarWhereInputObjectSchema), z.lazy(() => StaffPayoutScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const StaffPayoutUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.StaffPayoutUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutUpdateManyWithoutLabNestedInput>;
export const StaffPayoutUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutCreateWithoutStaffInputObjectSchema as StaffPayoutCreateWithoutStaffInputObjectSchema } from './StaffPayoutCreateWithoutStaffInput.schema';
import { StaffPayoutUncheckedCreateWithoutStaffInputObjectSchema as StaffPayoutUncheckedCreateWithoutStaffInputObjectSchema } from './StaffPayoutUncheckedCreateWithoutStaffInput.schema';
import { StaffPayoutCreateOrConnectWithoutStaffInputObjectSchema as StaffPayoutCreateOrConnectWithoutStaffInputObjectSchema } from './StaffPayoutCreateOrConnectWithoutStaffInput.schema';
import { StaffPayoutUpsertWithWhereUniqueWithoutStaffInputObjectSchema as StaffPayoutUpsertWithWhereUniqueWithoutStaffInputObjectSchema } from './StaffPayoutUpsertWithWhereUniqueWithoutStaffInput.schema';
import { StaffPayoutCreateManyStaffInputEnvelopeObjectSchema as StaffPayoutCreateManyStaffInputEnvelopeObjectSchema } from './StaffPayoutCreateManyStaffInputEnvelope.schema';
import { StaffPayoutWhereUniqueInputObjectSchema as StaffPayoutWhereUniqueInputObjectSchema } from './StaffPayoutWhereUniqueInput.schema';
import { StaffPayoutUpdateWithWhereUniqueWithoutStaffInputObjectSchema as StaffPayoutUpdateWithWhereUniqueWithoutStaffInputObjectSchema } from './StaffPayoutUpdateWithWhereUniqueWithoutStaffInput.schema';
import { StaffPayoutUpdateManyWithWhereWithoutStaffInputObjectSchema as StaffPayoutUpdateManyWithWhereWithoutStaffInputObjectSchema } from './StaffPayoutUpdateManyWithWhereWithoutStaffInput.schema';
import { StaffPayoutScalarWhereInputObjectSchema as StaffPayoutScalarWhereInputObjectSchema } from './StaffPayoutScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffPayoutCreateWithoutStaffInputObjectSchema), z.lazy(() => StaffPayoutCreateWithoutStaffInputObjectSchema).array(), z.lazy(() => StaffPayoutUncheckedCreateWithoutStaffInputObjectSchema), z.lazy(() => StaffPayoutUncheckedCreateWithoutStaffInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffPayoutCreateOrConnectWithoutStaffInputObjectSchema), z.lazy(() => StaffPayoutCreateOrConnectWithoutStaffInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => StaffPayoutUpsertWithWhereUniqueWithoutStaffInputObjectSchema), z.lazy(() => StaffPayoutUpsertWithWhereUniqueWithoutStaffInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffPayoutCreateManyStaffInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema), z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema), z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema), z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema), z.lazy(() => StaffPayoutWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => StaffPayoutUpdateWithWhereUniqueWithoutStaffInputObjectSchema), z.lazy(() => StaffPayoutUpdateWithWhereUniqueWithoutStaffInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => StaffPayoutUpdateManyWithWhereWithoutStaffInputObjectSchema), z.lazy(() => StaffPayoutUpdateManyWithWhereWithoutStaffInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => StaffPayoutScalarWhereInputObjectSchema), z.lazy(() => StaffPayoutScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const StaffPayoutUpdateManyWithoutStaffNestedInputObjectSchema: z.ZodType<Prisma.StaffPayoutUpdateManyWithoutStaffNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutUpdateManyWithoutStaffNestedInput>;
export const StaffPayoutUpdateManyWithoutStaffNestedInputObjectZodSchema = makeSchema();

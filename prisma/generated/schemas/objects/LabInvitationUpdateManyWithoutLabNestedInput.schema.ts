import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabInvitationCreateWithoutLabInputObjectSchema as LabInvitationCreateWithoutLabInputObjectSchema } from './LabInvitationCreateWithoutLabInput.schema';
import { LabInvitationUncheckedCreateWithoutLabInputObjectSchema as LabInvitationUncheckedCreateWithoutLabInputObjectSchema } from './LabInvitationUncheckedCreateWithoutLabInput.schema';
import { LabInvitationCreateOrConnectWithoutLabInputObjectSchema as LabInvitationCreateOrConnectWithoutLabInputObjectSchema } from './LabInvitationCreateOrConnectWithoutLabInput.schema';
import { LabInvitationUpsertWithWhereUniqueWithoutLabInputObjectSchema as LabInvitationUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './LabInvitationUpsertWithWhereUniqueWithoutLabInput.schema';
import { LabInvitationCreateManyLabInputEnvelopeObjectSchema as LabInvitationCreateManyLabInputEnvelopeObjectSchema } from './LabInvitationCreateManyLabInputEnvelope.schema';
import { LabInvitationWhereUniqueInputObjectSchema as LabInvitationWhereUniqueInputObjectSchema } from './LabInvitationWhereUniqueInput.schema';
import { LabInvitationUpdateWithWhereUniqueWithoutLabInputObjectSchema as LabInvitationUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './LabInvitationUpdateWithWhereUniqueWithoutLabInput.schema';
import { LabInvitationUpdateManyWithWhereWithoutLabInputObjectSchema as LabInvitationUpdateManyWithWhereWithoutLabInputObjectSchema } from './LabInvitationUpdateManyWithWhereWithoutLabInput.schema';
import { LabInvitationScalarWhereInputObjectSchema as LabInvitationScalarWhereInputObjectSchema } from './LabInvitationScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabInvitationCreateWithoutLabInputObjectSchema), z.lazy(() => LabInvitationCreateWithoutLabInputObjectSchema).array(), z.lazy(() => LabInvitationUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => LabInvitationUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => LabInvitationCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => LabInvitationCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => LabInvitationUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => LabInvitationUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => LabInvitationCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => LabInvitationWhereUniqueInputObjectSchema), z.lazy(() => LabInvitationWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => LabInvitationWhereUniqueInputObjectSchema), z.lazy(() => LabInvitationWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => LabInvitationWhereUniqueInputObjectSchema), z.lazy(() => LabInvitationWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => LabInvitationWhereUniqueInputObjectSchema), z.lazy(() => LabInvitationWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => LabInvitationUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => LabInvitationUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => LabInvitationUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => LabInvitationUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => LabInvitationScalarWhereInputObjectSchema), z.lazy(() => LabInvitationScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const LabInvitationUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.LabInvitationUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationUpdateManyWithoutLabNestedInput>;
export const LabInvitationUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();

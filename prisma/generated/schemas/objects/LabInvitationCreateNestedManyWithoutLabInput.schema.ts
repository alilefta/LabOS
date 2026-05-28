import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabInvitationCreateWithoutLabInputObjectSchema as LabInvitationCreateWithoutLabInputObjectSchema } from './LabInvitationCreateWithoutLabInput.schema';
import { LabInvitationUncheckedCreateWithoutLabInputObjectSchema as LabInvitationUncheckedCreateWithoutLabInputObjectSchema } from './LabInvitationUncheckedCreateWithoutLabInput.schema';
import { LabInvitationCreateOrConnectWithoutLabInputObjectSchema as LabInvitationCreateOrConnectWithoutLabInputObjectSchema } from './LabInvitationCreateOrConnectWithoutLabInput.schema';
import { LabInvitationCreateManyLabInputEnvelopeObjectSchema as LabInvitationCreateManyLabInputEnvelopeObjectSchema } from './LabInvitationCreateManyLabInputEnvelope.schema';
import { LabInvitationWhereUniqueInputObjectSchema as LabInvitationWhereUniqueInputObjectSchema } from './LabInvitationWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabInvitationCreateWithoutLabInputObjectSchema), z.lazy(() => LabInvitationCreateWithoutLabInputObjectSchema).array(), z.lazy(() => LabInvitationUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => LabInvitationUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => LabInvitationCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => LabInvitationCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => LabInvitationCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => LabInvitationWhereUniqueInputObjectSchema), z.lazy(() => LabInvitationWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const LabInvitationCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.LabInvitationCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationCreateNestedManyWithoutLabInput>;
export const LabInvitationCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();

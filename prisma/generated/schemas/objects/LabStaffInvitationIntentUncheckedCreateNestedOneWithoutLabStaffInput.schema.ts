import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffInvitationIntentCreateWithoutLabStaffInputObjectSchema as LabStaffInvitationIntentCreateWithoutLabStaffInputObjectSchema } from './LabStaffInvitationIntentCreateWithoutLabStaffInput.schema';
import { LabStaffInvitationIntentUncheckedCreateWithoutLabStaffInputObjectSchema as LabStaffInvitationIntentUncheckedCreateWithoutLabStaffInputObjectSchema } from './LabStaffInvitationIntentUncheckedCreateWithoutLabStaffInput.schema';
import { LabStaffInvitationIntentCreateOrConnectWithoutLabStaffInputObjectSchema as LabStaffInvitationIntentCreateOrConnectWithoutLabStaffInputObjectSchema } from './LabStaffInvitationIntentCreateOrConnectWithoutLabStaffInput.schema';
import { LabStaffInvitationIntentWhereUniqueInputObjectSchema as LabStaffInvitationIntentWhereUniqueInputObjectSchema } from './LabStaffInvitationIntentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabStaffInvitationIntentCreateWithoutLabStaffInputObjectSchema), z.lazy(() => LabStaffInvitationIntentUncheckedCreateWithoutLabStaffInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabStaffInvitationIntentCreateOrConnectWithoutLabStaffInputObjectSchema).optional(),
  connect: z.lazy(() => LabStaffInvitationIntentWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabStaffInvitationIntentUncheckedCreateNestedOneWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentUncheckedCreateNestedOneWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentUncheckedCreateNestedOneWithoutLabStaffInput>;
export const LabStaffInvitationIntentUncheckedCreateNestedOneWithoutLabStaffInputObjectZodSchema = makeSchema();

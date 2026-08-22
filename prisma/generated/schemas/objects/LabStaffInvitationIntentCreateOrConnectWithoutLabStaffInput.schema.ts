import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffInvitationIntentWhereUniqueInputObjectSchema as LabStaffInvitationIntentWhereUniqueInputObjectSchema } from './LabStaffInvitationIntentWhereUniqueInput.schema';
import { LabStaffInvitationIntentCreateWithoutLabStaffInputObjectSchema as LabStaffInvitationIntentCreateWithoutLabStaffInputObjectSchema } from './LabStaffInvitationIntentCreateWithoutLabStaffInput.schema';
import { LabStaffInvitationIntentUncheckedCreateWithoutLabStaffInputObjectSchema as LabStaffInvitationIntentUncheckedCreateWithoutLabStaffInputObjectSchema } from './LabStaffInvitationIntentUncheckedCreateWithoutLabStaffInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabStaffInvitationIntentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabStaffInvitationIntentCreateWithoutLabStaffInputObjectSchema), z.lazy(() => LabStaffInvitationIntentUncheckedCreateWithoutLabStaffInputObjectSchema)])
}).strict();
export const LabStaffInvitationIntentCreateOrConnectWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentCreateOrConnectWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentCreateOrConnectWithoutLabStaffInput>;
export const LabStaffInvitationIntentCreateOrConnectWithoutLabStaffInputObjectZodSchema = makeSchema();

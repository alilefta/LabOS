import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema';
import { LabStaffCreateWithoutOrganizationInvitationIntentInputObjectSchema as LabStaffCreateWithoutOrganizationInvitationIntentInputObjectSchema } from './LabStaffCreateWithoutOrganizationInvitationIntentInput.schema';
import { LabStaffUncheckedCreateWithoutOrganizationInvitationIntentInputObjectSchema as LabStaffUncheckedCreateWithoutOrganizationInvitationIntentInputObjectSchema } from './LabStaffUncheckedCreateWithoutOrganizationInvitationIntentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabStaffWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabStaffCreateWithoutOrganizationInvitationIntentInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutOrganizationInvitationIntentInputObjectSchema)])
}).strict();
export const LabStaffCreateOrConnectWithoutOrganizationInvitationIntentInputObjectSchema: z.ZodType<Prisma.LabStaffCreateOrConnectWithoutOrganizationInvitationIntentInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffCreateOrConnectWithoutOrganizationInvitationIntentInput>;
export const LabStaffCreateOrConnectWithoutOrganizationInvitationIntentInputObjectZodSchema = makeSchema();

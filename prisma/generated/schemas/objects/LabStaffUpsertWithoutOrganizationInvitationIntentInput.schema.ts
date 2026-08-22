import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffUpdateWithoutOrganizationInvitationIntentInputObjectSchema as LabStaffUpdateWithoutOrganizationInvitationIntentInputObjectSchema } from './LabStaffUpdateWithoutOrganizationInvitationIntentInput.schema';
import { LabStaffUncheckedUpdateWithoutOrganizationInvitationIntentInputObjectSchema as LabStaffUncheckedUpdateWithoutOrganizationInvitationIntentInputObjectSchema } from './LabStaffUncheckedUpdateWithoutOrganizationInvitationIntentInput.schema';
import { LabStaffCreateWithoutOrganizationInvitationIntentInputObjectSchema as LabStaffCreateWithoutOrganizationInvitationIntentInputObjectSchema } from './LabStaffCreateWithoutOrganizationInvitationIntentInput.schema';
import { LabStaffUncheckedCreateWithoutOrganizationInvitationIntentInputObjectSchema as LabStaffUncheckedCreateWithoutOrganizationInvitationIntentInputObjectSchema } from './LabStaffUncheckedCreateWithoutOrganizationInvitationIntentInput.schema';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabStaffUpdateWithoutOrganizationInvitationIntentInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateWithoutOrganizationInvitationIntentInputObjectSchema)]),
  create: z.union([z.lazy(() => LabStaffCreateWithoutOrganizationInvitationIntentInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutOrganizationInvitationIntentInputObjectSchema)]),
  where: z.lazy(() => LabStaffWhereInputObjectSchema).optional()
}).strict();
export const LabStaffUpsertWithoutOrganizationInvitationIntentInputObjectSchema: z.ZodType<Prisma.LabStaffUpsertWithoutOrganizationInvitationIntentInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpsertWithoutOrganizationInvitationIntentInput>;
export const LabStaffUpsertWithoutOrganizationInvitationIntentInputObjectZodSchema = makeSchema();

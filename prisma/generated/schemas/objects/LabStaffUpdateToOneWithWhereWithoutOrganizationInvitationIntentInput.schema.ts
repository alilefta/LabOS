import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema';
import { LabStaffUpdateWithoutOrganizationInvitationIntentInputObjectSchema as LabStaffUpdateWithoutOrganizationInvitationIntentInputObjectSchema } from './LabStaffUpdateWithoutOrganizationInvitationIntentInput.schema';
import { LabStaffUncheckedUpdateWithoutOrganizationInvitationIntentInputObjectSchema as LabStaffUncheckedUpdateWithoutOrganizationInvitationIntentInputObjectSchema } from './LabStaffUncheckedUpdateWithoutOrganizationInvitationIntentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabStaffWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabStaffUpdateWithoutOrganizationInvitationIntentInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateWithoutOrganizationInvitationIntentInputObjectSchema)])
}).strict();
export const LabStaffUpdateToOneWithWhereWithoutOrganizationInvitationIntentInputObjectSchema: z.ZodType<Prisma.LabStaffUpdateToOneWithWhereWithoutOrganizationInvitationIntentInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpdateToOneWithWhereWithoutOrganizationInvitationIntentInput>;
export const LabStaffUpdateToOneWithWhereWithoutOrganizationInvitationIntentInputObjectZodSchema = makeSchema();

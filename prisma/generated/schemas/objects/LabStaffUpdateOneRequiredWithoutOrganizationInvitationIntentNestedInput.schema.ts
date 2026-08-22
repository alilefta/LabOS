import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffCreateWithoutOrganizationInvitationIntentInputObjectSchema as LabStaffCreateWithoutOrganizationInvitationIntentInputObjectSchema } from './LabStaffCreateWithoutOrganizationInvitationIntentInput.schema';
import { LabStaffUncheckedCreateWithoutOrganizationInvitationIntentInputObjectSchema as LabStaffUncheckedCreateWithoutOrganizationInvitationIntentInputObjectSchema } from './LabStaffUncheckedCreateWithoutOrganizationInvitationIntentInput.schema';
import { LabStaffCreateOrConnectWithoutOrganizationInvitationIntentInputObjectSchema as LabStaffCreateOrConnectWithoutOrganizationInvitationIntentInputObjectSchema } from './LabStaffCreateOrConnectWithoutOrganizationInvitationIntentInput.schema';
import { LabStaffUpsertWithoutOrganizationInvitationIntentInputObjectSchema as LabStaffUpsertWithoutOrganizationInvitationIntentInputObjectSchema } from './LabStaffUpsertWithoutOrganizationInvitationIntentInput.schema';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema';
import { LabStaffUpdateToOneWithWhereWithoutOrganizationInvitationIntentInputObjectSchema as LabStaffUpdateToOneWithWhereWithoutOrganizationInvitationIntentInputObjectSchema } from './LabStaffUpdateToOneWithWhereWithoutOrganizationInvitationIntentInput.schema';
import { LabStaffUpdateWithoutOrganizationInvitationIntentInputObjectSchema as LabStaffUpdateWithoutOrganizationInvitationIntentInputObjectSchema } from './LabStaffUpdateWithoutOrganizationInvitationIntentInput.schema';
import { LabStaffUncheckedUpdateWithoutOrganizationInvitationIntentInputObjectSchema as LabStaffUncheckedUpdateWithoutOrganizationInvitationIntentInputObjectSchema } from './LabStaffUncheckedUpdateWithoutOrganizationInvitationIntentInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabStaffCreateWithoutOrganizationInvitationIntentInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutOrganizationInvitationIntentInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabStaffCreateOrConnectWithoutOrganizationInvitationIntentInputObjectSchema).optional(),
  upsert: z.lazy(() => LabStaffUpsertWithoutOrganizationInvitationIntentInputObjectSchema).optional(),
  connect: z.lazy(() => LabStaffWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabStaffUpdateToOneWithWhereWithoutOrganizationInvitationIntentInputObjectSchema), z.lazy(() => LabStaffUpdateWithoutOrganizationInvitationIntentInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateWithoutOrganizationInvitationIntentInputObjectSchema)]).optional()
}).strict();
export const LabStaffUpdateOneRequiredWithoutOrganizationInvitationIntentNestedInputObjectSchema: z.ZodType<Prisma.LabStaffUpdateOneRequiredWithoutOrganizationInvitationIntentNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpdateOneRequiredWithoutOrganizationInvitationIntentNestedInput>;
export const LabStaffUpdateOneRequiredWithoutOrganizationInvitationIntentNestedInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffCreateWithoutOrganizationInvitationIntentInputObjectSchema as LabStaffCreateWithoutOrganizationInvitationIntentInputObjectSchema } from './LabStaffCreateWithoutOrganizationInvitationIntentInput.schema';
import { LabStaffUncheckedCreateWithoutOrganizationInvitationIntentInputObjectSchema as LabStaffUncheckedCreateWithoutOrganizationInvitationIntentInputObjectSchema } from './LabStaffUncheckedCreateWithoutOrganizationInvitationIntentInput.schema';
import { LabStaffCreateOrConnectWithoutOrganizationInvitationIntentInputObjectSchema as LabStaffCreateOrConnectWithoutOrganizationInvitationIntentInputObjectSchema } from './LabStaffCreateOrConnectWithoutOrganizationInvitationIntentInput.schema';
import { LabStaffWhereUniqueInputObjectSchema as LabStaffWhereUniqueInputObjectSchema } from './LabStaffWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabStaffCreateWithoutOrganizationInvitationIntentInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutOrganizationInvitationIntentInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabStaffCreateOrConnectWithoutOrganizationInvitationIntentInputObjectSchema).optional(),
  connect: z.lazy(() => LabStaffWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabStaffCreateNestedOneWithoutOrganizationInvitationIntentInputObjectSchema: z.ZodType<Prisma.LabStaffCreateNestedOneWithoutOrganizationInvitationIntentInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffCreateNestedOneWithoutOrganizationInvitationIntentInput>;
export const LabStaffCreateNestedOneWithoutOrganizationInvitationIntentInputObjectZodSchema = makeSchema();

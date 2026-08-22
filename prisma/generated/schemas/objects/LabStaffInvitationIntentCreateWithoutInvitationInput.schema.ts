import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffCreateNestedOneWithoutOrganizationInvitationIntentInputObjectSchema as LabStaffCreateNestedOneWithoutOrganizationInvitationIntentInputObjectSchema } from './LabStaffCreateNestedOneWithoutOrganizationInvitationIntentInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  labStaff: z.lazy(() => LabStaffCreateNestedOneWithoutOrganizationInvitationIntentInputObjectSchema)
}).strict();
export const LabStaffInvitationIntentCreateWithoutInvitationInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentCreateWithoutInvitationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentCreateWithoutInvitationInput>;
export const LabStaffInvitationIntentCreateWithoutInvitationInputObjectZodSchema = makeSchema();

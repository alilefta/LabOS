import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationCreateNestedOneWithoutLabStaffIntentInputObjectSchema as InvitationCreateNestedOneWithoutLabStaffIntentInputObjectSchema } from './InvitationCreateNestedOneWithoutLabStaffIntentInput.schema';
import { LabStaffCreateNestedOneWithoutOrganizationInvitationIntentInputObjectSchema as LabStaffCreateNestedOneWithoutOrganizationInvitationIntentInputObjectSchema } from './LabStaffCreateNestedOneWithoutOrganizationInvitationIntentInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  invitation: z.lazy(() => InvitationCreateNestedOneWithoutLabStaffIntentInputObjectSchema),
  labStaff: z.lazy(() => LabStaffCreateNestedOneWithoutOrganizationInvitationIntentInputObjectSchema)
}).strict();
export const LabStaffInvitationIntentCreateInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentCreateInput>;
export const LabStaffInvitationIntentCreateInputObjectZodSchema = makeSchema();

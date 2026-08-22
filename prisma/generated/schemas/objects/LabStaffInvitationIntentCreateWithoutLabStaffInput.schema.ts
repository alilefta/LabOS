import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvitationCreateNestedOneWithoutLabStaffIntentInputObjectSchema as InvitationCreateNestedOneWithoutLabStaffIntentInputObjectSchema } from './InvitationCreateNestedOneWithoutLabStaffIntentInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invitation: z.lazy(() => InvitationCreateNestedOneWithoutLabStaffIntentInputObjectSchema)
}).strict();
export const LabStaffInvitationIntentCreateWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentCreateWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentCreateWithoutLabStaffInput>;
export const LabStaffInvitationIntentCreateWithoutLabStaffInputObjectZodSchema = makeSchema();

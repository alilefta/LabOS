import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffInvitationIntentWhereInputObjectSchema as LabStaffInvitationIntentWhereInputObjectSchema } from './LabStaffInvitationIntentWhereInput.schema';
import { LabStaffInvitationIntentUpdateWithoutLabStaffInputObjectSchema as LabStaffInvitationIntentUpdateWithoutLabStaffInputObjectSchema } from './LabStaffInvitationIntentUpdateWithoutLabStaffInput.schema';
import { LabStaffInvitationIntentUncheckedUpdateWithoutLabStaffInputObjectSchema as LabStaffInvitationIntentUncheckedUpdateWithoutLabStaffInputObjectSchema } from './LabStaffInvitationIntentUncheckedUpdateWithoutLabStaffInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabStaffInvitationIntentWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabStaffInvitationIntentUpdateWithoutLabStaffInputObjectSchema), z.lazy(() => LabStaffInvitationIntentUncheckedUpdateWithoutLabStaffInputObjectSchema)])
}).strict();
export const LabStaffInvitationIntentUpdateToOneWithWhereWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentUpdateToOneWithWhereWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentUpdateToOneWithWhereWithoutLabStaffInput>;
export const LabStaffInvitationIntentUpdateToOneWithWhereWithoutLabStaffInputObjectZodSchema = makeSchema();

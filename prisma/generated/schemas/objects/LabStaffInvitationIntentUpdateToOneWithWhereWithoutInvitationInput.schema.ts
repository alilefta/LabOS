import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffInvitationIntentWhereInputObjectSchema as LabStaffInvitationIntentWhereInputObjectSchema } from './LabStaffInvitationIntentWhereInput.schema';
import { LabStaffInvitationIntentUpdateWithoutInvitationInputObjectSchema as LabStaffInvitationIntentUpdateWithoutInvitationInputObjectSchema } from './LabStaffInvitationIntentUpdateWithoutInvitationInput.schema';
import { LabStaffInvitationIntentUncheckedUpdateWithoutInvitationInputObjectSchema as LabStaffInvitationIntentUncheckedUpdateWithoutInvitationInputObjectSchema } from './LabStaffInvitationIntentUncheckedUpdateWithoutInvitationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabStaffInvitationIntentWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabStaffInvitationIntentUpdateWithoutInvitationInputObjectSchema), z.lazy(() => LabStaffInvitationIntentUncheckedUpdateWithoutInvitationInputObjectSchema)])
}).strict();
export const LabStaffInvitationIntentUpdateToOneWithWhereWithoutInvitationInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentUpdateToOneWithWhereWithoutInvitationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentUpdateToOneWithWhereWithoutInvitationInput>;
export const LabStaffInvitationIntentUpdateToOneWithWhereWithoutInvitationInputObjectZodSchema = makeSchema();

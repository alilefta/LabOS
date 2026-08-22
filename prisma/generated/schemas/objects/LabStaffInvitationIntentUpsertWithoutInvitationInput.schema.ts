import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffInvitationIntentUpdateWithoutInvitationInputObjectSchema as LabStaffInvitationIntentUpdateWithoutInvitationInputObjectSchema } from './LabStaffInvitationIntentUpdateWithoutInvitationInput.schema';
import { LabStaffInvitationIntentUncheckedUpdateWithoutInvitationInputObjectSchema as LabStaffInvitationIntentUncheckedUpdateWithoutInvitationInputObjectSchema } from './LabStaffInvitationIntentUncheckedUpdateWithoutInvitationInput.schema';
import { LabStaffInvitationIntentCreateWithoutInvitationInputObjectSchema as LabStaffInvitationIntentCreateWithoutInvitationInputObjectSchema } from './LabStaffInvitationIntentCreateWithoutInvitationInput.schema';
import { LabStaffInvitationIntentUncheckedCreateWithoutInvitationInputObjectSchema as LabStaffInvitationIntentUncheckedCreateWithoutInvitationInputObjectSchema } from './LabStaffInvitationIntentUncheckedCreateWithoutInvitationInput.schema';
import { LabStaffInvitationIntentWhereInputObjectSchema as LabStaffInvitationIntentWhereInputObjectSchema } from './LabStaffInvitationIntentWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabStaffInvitationIntentUpdateWithoutInvitationInputObjectSchema), z.lazy(() => LabStaffInvitationIntentUncheckedUpdateWithoutInvitationInputObjectSchema)]),
  create: z.union([z.lazy(() => LabStaffInvitationIntentCreateWithoutInvitationInputObjectSchema), z.lazy(() => LabStaffInvitationIntentUncheckedCreateWithoutInvitationInputObjectSchema)]),
  where: z.lazy(() => LabStaffInvitationIntentWhereInputObjectSchema).optional()
}).strict();
export const LabStaffInvitationIntentUpsertWithoutInvitationInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentUpsertWithoutInvitationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentUpsertWithoutInvitationInput>;
export const LabStaffInvitationIntentUpsertWithoutInvitationInputObjectZodSchema = makeSchema();

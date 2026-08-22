import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffInvitationIntentUpdateWithoutLabStaffInputObjectSchema as LabStaffInvitationIntentUpdateWithoutLabStaffInputObjectSchema } from './LabStaffInvitationIntentUpdateWithoutLabStaffInput.schema';
import { LabStaffInvitationIntentUncheckedUpdateWithoutLabStaffInputObjectSchema as LabStaffInvitationIntentUncheckedUpdateWithoutLabStaffInputObjectSchema } from './LabStaffInvitationIntentUncheckedUpdateWithoutLabStaffInput.schema';
import { LabStaffInvitationIntentCreateWithoutLabStaffInputObjectSchema as LabStaffInvitationIntentCreateWithoutLabStaffInputObjectSchema } from './LabStaffInvitationIntentCreateWithoutLabStaffInput.schema';
import { LabStaffInvitationIntentUncheckedCreateWithoutLabStaffInputObjectSchema as LabStaffInvitationIntentUncheckedCreateWithoutLabStaffInputObjectSchema } from './LabStaffInvitationIntentUncheckedCreateWithoutLabStaffInput.schema';
import { LabStaffInvitationIntentWhereInputObjectSchema as LabStaffInvitationIntentWhereInputObjectSchema } from './LabStaffInvitationIntentWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabStaffInvitationIntentUpdateWithoutLabStaffInputObjectSchema), z.lazy(() => LabStaffInvitationIntentUncheckedUpdateWithoutLabStaffInputObjectSchema)]),
  create: z.union([z.lazy(() => LabStaffInvitationIntentCreateWithoutLabStaffInputObjectSchema), z.lazy(() => LabStaffInvitationIntentUncheckedCreateWithoutLabStaffInputObjectSchema)]),
  where: z.lazy(() => LabStaffInvitationIntentWhereInputObjectSchema).optional()
}).strict();
export const LabStaffInvitationIntentUpsertWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentUpsertWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentUpsertWithoutLabStaffInput>;
export const LabStaffInvitationIntentUpsertWithoutLabStaffInputObjectZodSchema = makeSchema();

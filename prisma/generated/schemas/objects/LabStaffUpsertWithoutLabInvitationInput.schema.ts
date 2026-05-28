import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffUpdateWithoutLabInvitationInputObjectSchema as LabStaffUpdateWithoutLabInvitationInputObjectSchema } from './LabStaffUpdateWithoutLabInvitationInput.schema';
import { LabStaffUncheckedUpdateWithoutLabInvitationInputObjectSchema as LabStaffUncheckedUpdateWithoutLabInvitationInputObjectSchema } from './LabStaffUncheckedUpdateWithoutLabInvitationInput.schema';
import { LabStaffCreateWithoutLabInvitationInputObjectSchema as LabStaffCreateWithoutLabInvitationInputObjectSchema } from './LabStaffCreateWithoutLabInvitationInput.schema';
import { LabStaffUncheckedCreateWithoutLabInvitationInputObjectSchema as LabStaffUncheckedCreateWithoutLabInvitationInputObjectSchema } from './LabStaffUncheckedCreateWithoutLabInvitationInput.schema';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabStaffUpdateWithoutLabInvitationInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateWithoutLabInvitationInputObjectSchema)]),
  create: z.union([z.lazy(() => LabStaffCreateWithoutLabInvitationInputObjectSchema), z.lazy(() => LabStaffUncheckedCreateWithoutLabInvitationInputObjectSchema)]),
  where: z.lazy(() => LabStaffWhereInputObjectSchema).optional()
}).strict();
export const LabStaffUpsertWithoutLabInvitationInputObjectSchema: z.ZodType<Prisma.LabStaffUpsertWithoutLabInvitationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpsertWithoutLabInvitationInput>;
export const LabStaffUpsertWithoutLabInvitationInputObjectZodSchema = makeSchema();

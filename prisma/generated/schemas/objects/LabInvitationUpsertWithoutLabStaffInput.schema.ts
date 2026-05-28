import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabInvitationUpdateWithoutLabStaffInputObjectSchema as LabInvitationUpdateWithoutLabStaffInputObjectSchema } from './LabInvitationUpdateWithoutLabStaffInput.schema';
import { LabInvitationUncheckedUpdateWithoutLabStaffInputObjectSchema as LabInvitationUncheckedUpdateWithoutLabStaffInputObjectSchema } from './LabInvitationUncheckedUpdateWithoutLabStaffInput.schema';
import { LabInvitationCreateWithoutLabStaffInputObjectSchema as LabInvitationCreateWithoutLabStaffInputObjectSchema } from './LabInvitationCreateWithoutLabStaffInput.schema';
import { LabInvitationUncheckedCreateWithoutLabStaffInputObjectSchema as LabInvitationUncheckedCreateWithoutLabStaffInputObjectSchema } from './LabInvitationUncheckedCreateWithoutLabStaffInput.schema';
import { LabInvitationWhereInputObjectSchema as LabInvitationWhereInputObjectSchema } from './LabInvitationWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabInvitationUpdateWithoutLabStaffInputObjectSchema), z.lazy(() => LabInvitationUncheckedUpdateWithoutLabStaffInputObjectSchema)]),
  create: z.union([z.lazy(() => LabInvitationCreateWithoutLabStaffInputObjectSchema), z.lazy(() => LabInvitationUncheckedCreateWithoutLabStaffInputObjectSchema)]),
  where: z.lazy(() => LabInvitationWhereInputObjectSchema).optional()
}).strict();
export const LabInvitationUpsertWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.LabInvitationUpsertWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationUpsertWithoutLabStaffInput>;
export const LabInvitationUpsertWithoutLabStaffInputObjectZodSchema = makeSchema();

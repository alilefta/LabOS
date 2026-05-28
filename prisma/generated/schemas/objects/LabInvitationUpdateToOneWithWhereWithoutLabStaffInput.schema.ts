import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabInvitationWhereInputObjectSchema as LabInvitationWhereInputObjectSchema } from './LabInvitationWhereInput.schema';
import { LabInvitationUpdateWithoutLabStaffInputObjectSchema as LabInvitationUpdateWithoutLabStaffInputObjectSchema } from './LabInvitationUpdateWithoutLabStaffInput.schema';
import { LabInvitationUncheckedUpdateWithoutLabStaffInputObjectSchema as LabInvitationUncheckedUpdateWithoutLabStaffInputObjectSchema } from './LabInvitationUncheckedUpdateWithoutLabStaffInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabInvitationWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabInvitationUpdateWithoutLabStaffInputObjectSchema), z.lazy(() => LabInvitationUncheckedUpdateWithoutLabStaffInputObjectSchema)])
}).strict();
export const LabInvitationUpdateToOneWithWhereWithoutLabStaffInputObjectSchema: z.ZodType<Prisma.LabInvitationUpdateToOneWithWhereWithoutLabStaffInput> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationUpdateToOneWithWhereWithoutLabStaffInput>;
export const LabInvitationUpdateToOneWithWhereWithoutLabStaffInputObjectZodSchema = makeSchema();

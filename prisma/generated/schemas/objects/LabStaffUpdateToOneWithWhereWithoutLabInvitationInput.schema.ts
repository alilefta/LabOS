import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema';
import { LabStaffUpdateWithoutLabInvitationInputObjectSchema as LabStaffUpdateWithoutLabInvitationInputObjectSchema } from './LabStaffUpdateWithoutLabInvitationInput.schema';
import { LabStaffUncheckedUpdateWithoutLabInvitationInputObjectSchema as LabStaffUncheckedUpdateWithoutLabInvitationInputObjectSchema } from './LabStaffUncheckedUpdateWithoutLabInvitationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabStaffWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabStaffUpdateWithoutLabInvitationInputObjectSchema), z.lazy(() => LabStaffUncheckedUpdateWithoutLabInvitationInputObjectSchema)])
}).strict();
export const LabStaffUpdateToOneWithWhereWithoutLabInvitationInputObjectSchema: z.ZodType<Prisma.LabStaffUpdateToOneWithWhereWithoutLabInvitationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpdateToOneWithWhereWithoutLabInvitationInput>;
export const LabStaffUpdateToOneWithWhereWithoutLabInvitationInputObjectZodSchema = makeSchema();

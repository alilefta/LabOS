import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffInvitationIntentLabStaffIdLabIdCompoundUniqueInputObjectSchema as LabStaffInvitationIntentLabStaffIdLabIdCompoundUniqueInputObjectSchema } from './LabStaffInvitationIntentLabStaffIdLabIdCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  invitationId: z.string().optional(),
  labStaffId_labId: z.lazy(() => LabStaffInvitationIntentLabStaffIdLabIdCompoundUniqueInputObjectSchema).optional()
}).strict();
export const LabStaffInvitationIntentWhereUniqueInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentWhereUniqueInput>;
export const LabStaffInvitationIntentWhereUniqueInputObjectZodSchema = makeSchema();

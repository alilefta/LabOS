import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  labStaffId: z.string(),
  labId: z.string()
}).strict();
export const LabStaffInvitationIntentLabStaffIdLabIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.LabStaffInvitationIntentLabStaffIdLabIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentLabStaffIdLabIdCompoundUniqueInput>;
export const LabStaffInvitationIntentLabStaffIdLabIdCompoundUniqueInputObjectZodSchema = makeSchema();

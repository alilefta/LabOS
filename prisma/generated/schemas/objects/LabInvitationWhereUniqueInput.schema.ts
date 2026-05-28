import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  token: z.string().optional(),
  labStaffId: z.string().optional()
}).strict();
export const LabInvitationWhereUniqueInputObjectSchema: z.ZodType<Prisma.LabInvitationWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.LabInvitationWhereUniqueInput>;
export const LabInvitationWhereUniqueInputObjectZodSchema = makeSchema();

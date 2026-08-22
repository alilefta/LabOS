import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabStaffInvitationIntentWhereInputObjectSchema as LabStaffInvitationIntentWhereInputObjectSchema } from './objects/LabStaffInvitationIntentWhereInput.schema';

export const LabStaffInvitationIntentDeleteManySchema: z.ZodType<Prisma.LabStaffInvitationIntentDeleteManyArgs> = z.object({ where: LabStaffInvitationIntentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentDeleteManyArgs>;

export const LabStaffInvitationIntentDeleteManyZodSchema = z.object({ where: LabStaffInvitationIntentWhereInputObjectSchema.optional() }).strict();
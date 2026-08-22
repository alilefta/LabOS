import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabStaffInvitationIntentSelectObjectSchema as LabStaffInvitationIntentSelectObjectSchema } from './objects/LabStaffInvitationIntentSelect.schema';
import { LabStaffInvitationIntentIncludeObjectSchema as LabStaffInvitationIntentIncludeObjectSchema } from './objects/LabStaffInvitationIntentInclude.schema';
import { LabStaffInvitationIntentWhereUniqueInputObjectSchema as LabStaffInvitationIntentWhereUniqueInputObjectSchema } from './objects/LabStaffInvitationIntentWhereUniqueInput.schema';

export const LabStaffInvitationIntentFindUniqueSchema: z.ZodType<Prisma.LabStaffInvitationIntentFindUniqueArgs> = z.object({ select: LabStaffInvitationIntentSelectObjectSchema.optional(), include: LabStaffInvitationIntentIncludeObjectSchema.optional(), where: LabStaffInvitationIntentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentFindUniqueArgs>;

export const LabStaffInvitationIntentFindUniqueZodSchema = z.object({ select: LabStaffInvitationIntentSelectObjectSchema.optional(), include: LabStaffInvitationIntentIncludeObjectSchema.optional(), where: LabStaffInvitationIntentWhereUniqueInputObjectSchema }).strict();
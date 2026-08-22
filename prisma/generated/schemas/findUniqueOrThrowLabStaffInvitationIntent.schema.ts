import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabStaffInvitationIntentSelectObjectSchema as LabStaffInvitationIntentSelectObjectSchema } from './objects/LabStaffInvitationIntentSelect.schema';
import { LabStaffInvitationIntentIncludeObjectSchema as LabStaffInvitationIntentIncludeObjectSchema } from './objects/LabStaffInvitationIntentInclude.schema';
import { LabStaffInvitationIntentWhereUniqueInputObjectSchema as LabStaffInvitationIntentWhereUniqueInputObjectSchema } from './objects/LabStaffInvitationIntentWhereUniqueInput.schema';

export const LabStaffInvitationIntentFindUniqueOrThrowSchema: z.ZodType<Prisma.LabStaffInvitationIntentFindUniqueOrThrowArgs> = z.object({ select: LabStaffInvitationIntentSelectObjectSchema.optional(), include: LabStaffInvitationIntentIncludeObjectSchema.optional(), where: LabStaffInvitationIntentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentFindUniqueOrThrowArgs>;

export const LabStaffInvitationIntentFindUniqueOrThrowZodSchema = z.object({ select: LabStaffInvitationIntentSelectObjectSchema.optional(), include: LabStaffInvitationIntentIncludeObjectSchema.optional(), where: LabStaffInvitationIntentWhereUniqueInputObjectSchema }).strict();
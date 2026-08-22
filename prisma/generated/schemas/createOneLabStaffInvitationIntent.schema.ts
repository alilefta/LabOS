import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabStaffInvitationIntentSelectObjectSchema as LabStaffInvitationIntentSelectObjectSchema } from './objects/LabStaffInvitationIntentSelect.schema';
import { LabStaffInvitationIntentIncludeObjectSchema as LabStaffInvitationIntentIncludeObjectSchema } from './objects/LabStaffInvitationIntentInclude.schema';
import { LabStaffInvitationIntentCreateInputObjectSchema as LabStaffInvitationIntentCreateInputObjectSchema } from './objects/LabStaffInvitationIntentCreateInput.schema';
import { LabStaffInvitationIntentUncheckedCreateInputObjectSchema as LabStaffInvitationIntentUncheckedCreateInputObjectSchema } from './objects/LabStaffInvitationIntentUncheckedCreateInput.schema';

export const LabStaffInvitationIntentCreateOneSchema: z.ZodType<Prisma.LabStaffInvitationIntentCreateArgs> = z.object({ select: LabStaffInvitationIntentSelectObjectSchema.optional(), include: LabStaffInvitationIntentIncludeObjectSchema.optional(), data: z.union([LabStaffInvitationIntentCreateInputObjectSchema, LabStaffInvitationIntentUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentCreateArgs>;

export const LabStaffInvitationIntentCreateOneZodSchema = z.object({ select: LabStaffInvitationIntentSelectObjectSchema.optional(), include: LabStaffInvitationIntentIncludeObjectSchema.optional(), data: z.union([LabStaffInvitationIntentCreateInputObjectSchema, LabStaffInvitationIntentUncheckedCreateInputObjectSchema]) }).strict();
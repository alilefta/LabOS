import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabStaffInvitationIntentSelectObjectSchema as LabStaffInvitationIntentSelectObjectSchema } from './objects/LabStaffInvitationIntentSelect.schema';
import { LabStaffInvitationIntentIncludeObjectSchema as LabStaffInvitationIntentIncludeObjectSchema } from './objects/LabStaffInvitationIntentInclude.schema';
import { LabStaffInvitationIntentUpdateInputObjectSchema as LabStaffInvitationIntentUpdateInputObjectSchema } from './objects/LabStaffInvitationIntentUpdateInput.schema';
import { LabStaffInvitationIntentUncheckedUpdateInputObjectSchema as LabStaffInvitationIntentUncheckedUpdateInputObjectSchema } from './objects/LabStaffInvitationIntentUncheckedUpdateInput.schema';
import { LabStaffInvitationIntentWhereUniqueInputObjectSchema as LabStaffInvitationIntentWhereUniqueInputObjectSchema } from './objects/LabStaffInvitationIntentWhereUniqueInput.schema';

export const LabStaffInvitationIntentUpdateOneSchema: z.ZodType<Prisma.LabStaffInvitationIntentUpdateArgs> = z.object({ select: LabStaffInvitationIntentSelectObjectSchema.optional(), include: LabStaffInvitationIntentIncludeObjectSchema.optional(), data: z.union([LabStaffInvitationIntentUpdateInputObjectSchema, LabStaffInvitationIntentUncheckedUpdateInputObjectSchema]), where: LabStaffInvitationIntentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentUpdateArgs>;

export const LabStaffInvitationIntentUpdateOneZodSchema = z.object({ select: LabStaffInvitationIntentSelectObjectSchema.optional(), include: LabStaffInvitationIntentIncludeObjectSchema.optional(), data: z.union([LabStaffInvitationIntentUpdateInputObjectSchema, LabStaffInvitationIntentUncheckedUpdateInputObjectSchema]), where: LabStaffInvitationIntentWhereUniqueInputObjectSchema }).strict();
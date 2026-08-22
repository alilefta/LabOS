import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabStaffInvitationIntentSelectObjectSchema as LabStaffInvitationIntentSelectObjectSchema } from './objects/LabStaffInvitationIntentSelect.schema';
import { LabStaffInvitationIntentUpdateManyMutationInputObjectSchema as LabStaffInvitationIntentUpdateManyMutationInputObjectSchema } from './objects/LabStaffInvitationIntentUpdateManyMutationInput.schema';
import { LabStaffInvitationIntentWhereInputObjectSchema as LabStaffInvitationIntentWhereInputObjectSchema } from './objects/LabStaffInvitationIntentWhereInput.schema';

export const LabStaffInvitationIntentUpdateManyAndReturnSchema: z.ZodType<Prisma.LabStaffInvitationIntentUpdateManyAndReturnArgs> = z.object({ select: LabStaffInvitationIntentSelectObjectSchema.optional(), data: LabStaffInvitationIntentUpdateManyMutationInputObjectSchema, where: LabStaffInvitationIntentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentUpdateManyAndReturnArgs>;

export const LabStaffInvitationIntentUpdateManyAndReturnZodSchema = z.object({ select: LabStaffInvitationIntentSelectObjectSchema.optional(), data: LabStaffInvitationIntentUpdateManyMutationInputObjectSchema, where: LabStaffInvitationIntentWhereInputObjectSchema.optional() }).strict();
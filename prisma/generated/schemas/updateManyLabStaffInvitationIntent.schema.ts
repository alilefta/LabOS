import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabStaffInvitationIntentUpdateManyMutationInputObjectSchema as LabStaffInvitationIntentUpdateManyMutationInputObjectSchema } from './objects/LabStaffInvitationIntentUpdateManyMutationInput.schema';
import { LabStaffInvitationIntentWhereInputObjectSchema as LabStaffInvitationIntentWhereInputObjectSchema } from './objects/LabStaffInvitationIntentWhereInput.schema';

export const LabStaffInvitationIntentUpdateManySchema: z.ZodType<Prisma.LabStaffInvitationIntentUpdateManyArgs> = z.object({ data: LabStaffInvitationIntentUpdateManyMutationInputObjectSchema, where: LabStaffInvitationIntentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentUpdateManyArgs>;

export const LabStaffInvitationIntentUpdateManyZodSchema = z.object({ data: LabStaffInvitationIntentUpdateManyMutationInputObjectSchema, where: LabStaffInvitationIntentWhereInputObjectSchema.optional() }).strict();
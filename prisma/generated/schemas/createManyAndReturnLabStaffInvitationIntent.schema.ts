import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabStaffInvitationIntentSelectObjectSchema as LabStaffInvitationIntentSelectObjectSchema } from './objects/LabStaffInvitationIntentSelect.schema';
import { LabStaffInvitationIntentCreateManyInputObjectSchema as LabStaffInvitationIntentCreateManyInputObjectSchema } from './objects/LabStaffInvitationIntentCreateManyInput.schema';

export const LabStaffInvitationIntentCreateManyAndReturnSchema: z.ZodType<Prisma.LabStaffInvitationIntentCreateManyAndReturnArgs> = z.object({ select: LabStaffInvitationIntentSelectObjectSchema.optional(), data: z.union([ LabStaffInvitationIntentCreateManyInputObjectSchema, z.array(LabStaffInvitationIntentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentCreateManyAndReturnArgs>;

export const LabStaffInvitationIntentCreateManyAndReturnZodSchema = z.object({ select: LabStaffInvitationIntentSelectObjectSchema.optional(), data: z.union([ LabStaffInvitationIntentCreateManyInputObjectSchema, z.array(LabStaffInvitationIntentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
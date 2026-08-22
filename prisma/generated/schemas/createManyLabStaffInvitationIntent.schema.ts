import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabStaffInvitationIntentCreateManyInputObjectSchema as LabStaffInvitationIntentCreateManyInputObjectSchema } from './objects/LabStaffInvitationIntentCreateManyInput.schema';

export const LabStaffInvitationIntentCreateManySchema: z.ZodType<Prisma.LabStaffInvitationIntentCreateManyArgs> = z.object({ data: z.union([ LabStaffInvitationIntentCreateManyInputObjectSchema, z.array(LabStaffInvitationIntentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.LabStaffInvitationIntentCreateManyArgs>;

export const LabStaffInvitationIntentCreateManyZodSchema = z.object({ data: z.union([ LabStaffInvitationIntentCreateManyInputObjectSchema, z.array(LabStaffInvitationIntentCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
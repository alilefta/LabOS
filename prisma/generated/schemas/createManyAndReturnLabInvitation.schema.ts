import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabInvitationSelectObjectSchema as LabInvitationSelectObjectSchema } from './objects/LabInvitationSelect.schema';
import { LabInvitationCreateManyInputObjectSchema as LabInvitationCreateManyInputObjectSchema } from './objects/LabInvitationCreateManyInput.schema';

export const LabInvitationCreateManyAndReturnSchema: z.ZodType<Prisma.LabInvitationCreateManyAndReturnArgs> = z.object({ select: LabInvitationSelectObjectSchema.optional(), data: z.union([ LabInvitationCreateManyInputObjectSchema, z.array(LabInvitationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.LabInvitationCreateManyAndReturnArgs>;

export const LabInvitationCreateManyAndReturnZodSchema = z.object({ select: LabInvitationSelectObjectSchema.optional(), data: z.union([ LabInvitationCreateManyInputObjectSchema, z.array(LabInvitationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
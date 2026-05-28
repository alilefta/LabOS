import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabInvitationCreateManyInputObjectSchema as LabInvitationCreateManyInputObjectSchema } from './objects/LabInvitationCreateManyInput.schema';

export const LabInvitationCreateManySchema: z.ZodType<Prisma.LabInvitationCreateManyArgs> = z.object({ data: z.union([ LabInvitationCreateManyInputObjectSchema, z.array(LabInvitationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.LabInvitationCreateManyArgs>;

export const LabInvitationCreateManyZodSchema = z.object({ data: z.union([ LabInvitationCreateManyInputObjectSchema, z.array(LabInvitationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
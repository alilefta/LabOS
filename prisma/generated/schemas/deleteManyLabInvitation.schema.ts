import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabInvitationWhereInputObjectSchema as LabInvitationWhereInputObjectSchema } from './objects/LabInvitationWhereInput.schema';

export const LabInvitationDeleteManySchema: z.ZodType<Prisma.LabInvitationDeleteManyArgs> = z.object({ where: LabInvitationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabInvitationDeleteManyArgs>;

export const LabInvitationDeleteManyZodSchema = z.object({ where: LabInvitationWhereInputObjectSchema.optional() }).strict();
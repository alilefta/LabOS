import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabInvitationSelectObjectSchema as LabInvitationSelectObjectSchema } from './objects/LabInvitationSelect.schema';
import { LabInvitationIncludeObjectSchema as LabInvitationIncludeObjectSchema } from './objects/LabInvitationInclude.schema';
import { LabInvitationWhereUniqueInputObjectSchema as LabInvitationWhereUniqueInputObjectSchema } from './objects/LabInvitationWhereUniqueInput.schema';

export const LabInvitationDeleteOneSchema: z.ZodType<Prisma.LabInvitationDeleteArgs> = z.object({ select: LabInvitationSelectObjectSchema.optional(), include: LabInvitationIncludeObjectSchema.optional(), where: LabInvitationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.LabInvitationDeleteArgs>;

export const LabInvitationDeleteOneZodSchema = z.object({ select: LabInvitationSelectObjectSchema.optional(), include: LabInvitationIncludeObjectSchema.optional(), where: LabInvitationWhereUniqueInputObjectSchema }).strict();
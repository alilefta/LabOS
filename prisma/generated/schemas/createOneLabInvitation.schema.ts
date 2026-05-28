import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabInvitationSelectObjectSchema as LabInvitationSelectObjectSchema } from './objects/LabInvitationSelect.schema';
import { LabInvitationIncludeObjectSchema as LabInvitationIncludeObjectSchema } from './objects/LabInvitationInclude.schema';
import { LabInvitationCreateInputObjectSchema as LabInvitationCreateInputObjectSchema } from './objects/LabInvitationCreateInput.schema';
import { LabInvitationUncheckedCreateInputObjectSchema as LabInvitationUncheckedCreateInputObjectSchema } from './objects/LabInvitationUncheckedCreateInput.schema';

export const LabInvitationCreateOneSchema: z.ZodType<Prisma.LabInvitationCreateArgs> = z.object({ select: LabInvitationSelectObjectSchema.optional(), include: LabInvitationIncludeObjectSchema.optional(), data: z.union([LabInvitationCreateInputObjectSchema, LabInvitationUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.LabInvitationCreateArgs>;

export const LabInvitationCreateOneZodSchema = z.object({ select: LabInvitationSelectObjectSchema.optional(), include: LabInvitationIncludeObjectSchema.optional(), data: z.union([LabInvitationCreateInputObjectSchema, LabInvitationUncheckedCreateInputObjectSchema]) }).strict();
import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabInvitationSelectObjectSchema as LabInvitationSelectObjectSchema } from './objects/LabInvitationSelect.schema';
import { LabInvitationIncludeObjectSchema as LabInvitationIncludeObjectSchema } from './objects/LabInvitationInclude.schema';
import { LabInvitationUpdateInputObjectSchema as LabInvitationUpdateInputObjectSchema } from './objects/LabInvitationUpdateInput.schema';
import { LabInvitationUncheckedUpdateInputObjectSchema as LabInvitationUncheckedUpdateInputObjectSchema } from './objects/LabInvitationUncheckedUpdateInput.schema';
import { LabInvitationWhereUniqueInputObjectSchema as LabInvitationWhereUniqueInputObjectSchema } from './objects/LabInvitationWhereUniqueInput.schema';

export const LabInvitationUpdateOneSchema: z.ZodType<Prisma.LabInvitationUpdateArgs> = z.object({ select: LabInvitationSelectObjectSchema.optional(), include: LabInvitationIncludeObjectSchema.optional(), data: z.union([LabInvitationUpdateInputObjectSchema, LabInvitationUncheckedUpdateInputObjectSchema]), where: LabInvitationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.LabInvitationUpdateArgs>;

export const LabInvitationUpdateOneZodSchema = z.object({ select: LabInvitationSelectObjectSchema.optional(), include: LabInvitationIncludeObjectSchema.optional(), data: z.union([LabInvitationUpdateInputObjectSchema, LabInvitationUncheckedUpdateInputObjectSchema]), where: LabInvitationWhereUniqueInputObjectSchema }).strict();
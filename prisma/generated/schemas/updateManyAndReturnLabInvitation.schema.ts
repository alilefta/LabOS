import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabInvitationSelectObjectSchema as LabInvitationSelectObjectSchema } from './objects/LabInvitationSelect.schema';
import { LabInvitationUpdateManyMutationInputObjectSchema as LabInvitationUpdateManyMutationInputObjectSchema } from './objects/LabInvitationUpdateManyMutationInput.schema';
import { LabInvitationWhereInputObjectSchema as LabInvitationWhereInputObjectSchema } from './objects/LabInvitationWhereInput.schema';

export const LabInvitationUpdateManyAndReturnSchema: z.ZodType<Prisma.LabInvitationUpdateManyAndReturnArgs> = z.object({ select: LabInvitationSelectObjectSchema.optional(), data: LabInvitationUpdateManyMutationInputObjectSchema, where: LabInvitationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabInvitationUpdateManyAndReturnArgs>;

export const LabInvitationUpdateManyAndReturnZodSchema = z.object({ select: LabInvitationSelectObjectSchema.optional(), data: LabInvitationUpdateManyMutationInputObjectSchema, where: LabInvitationWhereInputObjectSchema.optional() }).strict();
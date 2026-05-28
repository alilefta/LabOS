import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabInvitationUpdateManyMutationInputObjectSchema as LabInvitationUpdateManyMutationInputObjectSchema } from './objects/LabInvitationUpdateManyMutationInput.schema';
import { LabInvitationWhereInputObjectSchema as LabInvitationWhereInputObjectSchema } from './objects/LabInvitationWhereInput.schema';

export const LabInvitationUpdateManySchema: z.ZodType<Prisma.LabInvitationUpdateManyArgs> = z.object({ data: LabInvitationUpdateManyMutationInputObjectSchema, where: LabInvitationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.LabInvitationUpdateManyArgs>;

export const LabInvitationUpdateManyZodSchema = z.object({ data: LabInvitationUpdateManyMutationInputObjectSchema, where: LabInvitationWhereInputObjectSchema.optional() }).strict();
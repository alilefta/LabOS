import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabInvitationSelectObjectSchema as LabInvitationSelectObjectSchema } from './objects/LabInvitationSelect.schema';
import { LabInvitationIncludeObjectSchema as LabInvitationIncludeObjectSchema } from './objects/LabInvitationInclude.schema';
import { LabInvitationWhereUniqueInputObjectSchema as LabInvitationWhereUniqueInputObjectSchema } from './objects/LabInvitationWhereUniqueInput.schema';
import { LabInvitationCreateInputObjectSchema as LabInvitationCreateInputObjectSchema } from './objects/LabInvitationCreateInput.schema';
import { LabInvitationUncheckedCreateInputObjectSchema as LabInvitationUncheckedCreateInputObjectSchema } from './objects/LabInvitationUncheckedCreateInput.schema';
import { LabInvitationUpdateInputObjectSchema as LabInvitationUpdateInputObjectSchema } from './objects/LabInvitationUpdateInput.schema';
import { LabInvitationUncheckedUpdateInputObjectSchema as LabInvitationUncheckedUpdateInputObjectSchema } from './objects/LabInvitationUncheckedUpdateInput.schema';

export const LabInvitationUpsertOneSchema: z.ZodType<Prisma.LabInvitationUpsertArgs> = z.object({ select: LabInvitationSelectObjectSchema.optional(), include: LabInvitationIncludeObjectSchema.optional(), where: LabInvitationWhereUniqueInputObjectSchema, create: z.union([ LabInvitationCreateInputObjectSchema, LabInvitationUncheckedCreateInputObjectSchema ]), update: z.union([ LabInvitationUpdateInputObjectSchema, LabInvitationUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.LabInvitationUpsertArgs>;

export const LabInvitationUpsertOneZodSchema = z.object({ select: LabInvitationSelectObjectSchema.optional(), include: LabInvitationIncludeObjectSchema.optional(), where: LabInvitationWhereUniqueInputObjectSchema, create: z.union([ LabInvitationCreateInputObjectSchema, LabInvitationUncheckedCreateInputObjectSchema ]), update: z.union([ LabInvitationUpdateInputObjectSchema, LabInvitationUncheckedUpdateInputObjectSchema ]) }).strict();
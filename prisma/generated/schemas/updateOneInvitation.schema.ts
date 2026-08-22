import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvitationSelectObjectSchema as InvitationSelectObjectSchema } from './objects/InvitationSelect.schema';
import { InvitationIncludeObjectSchema as InvitationIncludeObjectSchema } from './objects/InvitationInclude.schema';
import { InvitationUpdateInputObjectSchema as InvitationUpdateInputObjectSchema } from './objects/InvitationUpdateInput.schema';
import { InvitationUncheckedUpdateInputObjectSchema as InvitationUncheckedUpdateInputObjectSchema } from './objects/InvitationUncheckedUpdateInput.schema';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './objects/InvitationWhereUniqueInput.schema';

export const InvitationUpdateOneSchema: z.ZodType<Prisma.InvitationUpdateArgs> = z.object({ select: InvitationSelectObjectSchema.optional(), include: InvitationIncludeObjectSchema.optional(), data: z.union([InvitationUpdateInputObjectSchema, InvitationUncheckedUpdateInputObjectSchema]), where: InvitationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.InvitationUpdateArgs>;

export const InvitationUpdateOneZodSchema = z.object({ select: InvitationSelectObjectSchema.optional(), include: InvitationIncludeObjectSchema.optional(), data: z.union([InvitationUpdateInputObjectSchema, InvitationUncheckedUpdateInputObjectSchema]), where: InvitationWhereUniqueInputObjectSchema }).strict();
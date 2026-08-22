import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvitationSelectObjectSchema as InvitationSelectObjectSchema } from './objects/InvitationSelect.schema';
import { InvitationIncludeObjectSchema as InvitationIncludeObjectSchema } from './objects/InvitationInclude.schema';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './objects/InvitationWhereUniqueInput.schema';

export const InvitationDeleteOneSchema: z.ZodType<Prisma.InvitationDeleteArgs> = z.object({ select: InvitationSelectObjectSchema.optional(), include: InvitationIncludeObjectSchema.optional(), where: InvitationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.InvitationDeleteArgs>;

export const InvitationDeleteOneZodSchema = z.object({ select: InvitationSelectObjectSchema.optional(), include: InvitationIncludeObjectSchema.optional(), where: InvitationWhereUniqueInputObjectSchema }).strict();
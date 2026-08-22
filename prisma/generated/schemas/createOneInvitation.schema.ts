import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvitationSelectObjectSchema as InvitationSelectObjectSchema } from './objects/InvitationSelect.schema';
import { InvitationIncludeObjectSchema as InvitationIncludeObjectSchema } from './objects/InvitationInclude.schema';
import { InvitationCreateInputObjectSchema as InvitationCreateInputObjectSchema } from './objects/InvitationCreateInput.schema';
import { InvitationUncheckedCreateInputObjectSchema as InvitationUncheckedCreateInputObjectSchema } from './objects/InvitationUncheckedCreateInput.schema';

export const InvitationCreateOneSchema: z.ZodType<Prisma.InvitationCreateArgs> = z.object({ select: InvitationSelectObjectSchema.optional(), include: InvitationIncludeObjectSchema.optional(), data: z.union([InvitationCreateInputObjectSchema, InvitationUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.InvitationCreateArgs>;

export const InvitationCreateOneZodSchema = z.object({ select: InvitationSelectObjectSchema.optional(), include: InvitationIncludeObjectSchema.optional(), data: z.union([InvitationCreateInputObjectSchema, InvitationUncheckedCreateInputObjectSchema]) }).strict();
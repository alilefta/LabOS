import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvitationSelectObjectSchema as InvitationSelectObjectSchema } from './objects/InvitationSelect.schema';
import { InvitationIncludeObjectSchema as InvitationIncludeObjectSchema } from './objects/InvitationInclude.schema';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './objects/InvitationWhereUniqueInput.schema';
import { InvitationCreateInputObjectSchema as InvitationCreateInputObjectSchema } from './objects/InvitationCreateInput.schema';
import { InvitationUncheckedCreateInputObjectSchema as InvitationUncheckedCreateInputObjectSchema } from './objects/InvitationUncheckedCreateInput.schema';
import { InvitationUpdateInputObjectSchema as InvitationUpdateInputObjectSchema } from './objects/InvitationUpdateInput.schema';
import { InvitationUncheckedUpdateInputObjectSchema as InvitationUncheckedUpdateInputObjectSchema } from './objects/InvitationUncheckedUpdateInput.schema';

export const InvitationUpsertOneSchema: z.ZodType<Prisma.InvitationUpsertArgs> = z.object({ select: InvitationSelectObjectSchema.optional(), include: InvitationIncludeObjectSchema.optional(), where: InvitationWhereUniqueInputObjectSchema, create: z.union([ InvitationCreateInputObjectSchema, InvitationUncheckedCreateInputObjectSchema ]), update: z.union([ InvitationUpdateInputObjectSchema, InvitationUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.InvitationUpsertArgs>;

export const InvitationUpsertOneZodSchema = z.object({ select: InvitationSelectObjectSchema.optional(), include: InvitationIncludeObjectSchema.optional(), where: InvitationWhereUniqueInputObjectSchema, create: z.union([ InvitationCreateInputObjectSchema, InvitationUncheckedCreateInputObjectSchema ]), update: z.union([ InvitationUpdateInputObjectSchema, InvitationUncheckedUpdateInputObjectSchema ]) }).strict();
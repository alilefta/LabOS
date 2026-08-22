import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvitationSelectObjectSchema as InvitationSelectObjectSchema } from './objects/InvitationSelect.schema';
import { InvitationUpdateManyMutationInputObjectSchema as InvitationUpdateManyMutationInputObjectSchema } from './objects/InvitationUpdateManyMutationInput.schema';
import { InvitationWhereInputObjectSchema as InvitationWhereInputObjectSchema } from './objects/InvitationWhereInput.schema';

export const InvitationUpdateManyAndReturnSchema: z.ZodType<Prisma.InvitationUpdateManyAndReturnArgs> = z.object({ select: InvitationSelectObjectSchema.optional(), data: InvitationUpdateManyMutationInputObjectSchema, where: InvitationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.InvitationUpdateManyAndReturnArgs>;

export const InvitationUpdateManyAndReturnZodSchema = z.object({ select: InvitationSelectObjectSchema.optional(), data: InvitationUpdateManyMutationInputObjectSchema, where: InvitationWhereInputObjectSchema.optional() }).strict();
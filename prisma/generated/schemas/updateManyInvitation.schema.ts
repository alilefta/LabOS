import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvitationUpdateManyMutationInputObjectSchema as InvitationUpdateManyMutationInputObjectSchema } from './objects/InvitationUpdateManyMutationInput.schema';
import { InvitationWhereInputObjectSchema as InvitationWhereInputObjectSchema } from './objects/InvitationWhereInput.schema';

export const InvitationUpdateManySchema: z.ZodType<Prisma.InvitationUpdateManyArgs> = z.object({ data: InvitationUpdateManyMutationInputObjectSchema, where: InvitationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.InvitationUpdateManyArgs>;

export const InvitationUpdateManyZodSchema = z.object({ data: InvitationUpdateManyMutationInputObjectSchema, where: InvitationWhereInputObjectSchema.optional() }).strict();
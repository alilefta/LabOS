import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvitationOrderByWithRelationInputObjectSchema as InvitationOrderByWithRelationInputObjectSchema } from './objects/InvitationOrderByWithRelationInput.schema';
import { InvitationWhereInputObjectSchema as InvitationWhereInputObjectSchema } from './objects/InvitationWhereInput.schema';
import { InvitationWhereUniqueInputObjectSchema as InvitationWhereUniqueInputObjectSchema } from './objects/InvitationWhereUniqueInput.schema';
import { InvitationCountAggregateInputObjectSchema as InvitationCountAggregateInputObjectSchema } from './objects/InvitationCountAggregateInput.schema';

export const InvitationCountSchema: z.ZodType<Prisma.InvitationCountArgs> = z.object({ orderBy: z.union([InvitationOrderByWithRelationInputObjectSchema, InvitationOrderByWithRelationInputObjectSchema.array()]).optional(), where: InvitationWhereInputObjectSchema.optional(), cursor: InvitationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), InvitationCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.InvitationCountArgs>;

export const InvitationCountZodSchema = z.object({ orderBy: z.union([InvitationOrderByWithRelationInputObjectSchema, InvitationOrderByWithRelationInputObjectSchema.array()]).optional(), where: InvitationWhereInputObjectSchema.optional(), cursor: InvitationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), InvitationCountAggregateInputObjectSchema ]).optional() }).strict();
import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabInvitationOrderByWithRelationInputObjectSchema as LabInvitationOrderByWithRelationInputObjectSchema } from './objects/LabInvitationOrderByWithRelationInput.schema';
import { LabInvitationWhereInputObjectSchema as LabInvitationWhereInputObjectSchema } from './objects/LabInvitationWhereInput.schema';
import { LabInvitationWhereUniqueInputObjectSchema as LabInvitationWhereUniqueInputObjectSchema } from './objects/LabInvitationWhereUniqueInput.schema';
import { LabInvitationCountAggregateInputObjectSchema as LabInvitationCountAggregateInputObjectSchema } from './objects/LabInvitationCountAggregateInput.schema';

export const LabInvitationCountSchema: z.ZodType<Prisma.LabInvitationCountArgs> = z.object({ orderBy: z.union([LabInvitationOrderByWithRelationInputObjectSchema, LabInvitationOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabInvitationWhereInputObjectSchema.optional(), cursor: LabInvitationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), LabInvitationCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.LabInvitationCountArgs>;

export const LabInvitationCountZodSchema = z.object({ orderBy: z.union([LabInvitationOrderByWithRelationInputObjectSchema, LabInvitationOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabInvitationWhereInputObjectSchema.optional(), cursor: LabInvitationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), LabInvitationCountAggregateInputObjectSchema ]).optional() }).strict();
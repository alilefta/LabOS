import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { StaffPayoutOrderByWithRelationInputObjectSchema as StaffPayoutOrderByWithRelationInputObjectSchema } from './objects/StaffPayoutOrderByWithRelationInput.schema';
import { StaffPayoutWhereInputObjectSchema as StaffPayoutWhereInputObjectSchema } from './objects/StaffPayoutWhereInput.schema';
import { StaffPayoutWhereUniqueInputObjectSchema as StaffPayoutWhereUniqueInputObjectSchema } from './objects/StaffPayoutWhereUniqueInput.schema';
import { StaffPayoutCountAggregateInputObjectSchema as StaffPayoutCountAggregateInputObjectSchema } from './objects/StaffPayoutCountAggregateInput.schema';

export const StaffPayoutCountSchema: z.ZodType<Prisma.StaffPayoutCountArgs> = z.object({ orderBy: z.union([StaffPayoutOrderByWithRelationInputObjectSchema, StaffPayoutOrderByWithRelationInputObjectSchema.array()]).optional(), where: StaffPayoutWhereInputObjectSchema.optional(), cursor: StaffPayoutWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), StaffPayoutCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.StaffPayoutCountArgs>;

export const StaffPayoutCountZodSchema = z.object({ orderBy: z.union([StaffPayoutOrderByWithRelationInputObjectSchema, StaffPayoutOrderByWithRelationInputObjectSchema.array()]).optional(), where: StaffPayoutWhereInputObjectSchema.optional(), cursor: StaffPayoutWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), StaffPayoutCountAggregateInputObjectSchema ]).optional() }).strict();
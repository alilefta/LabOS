import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabSubscriptionPlanIncludeObjectSchema as LabSubscriptionPlanIncludeObjectSchema } from './objects/LabSubscriptionPlanInclude.schema';
import { LabSubscriptionPlanOrderByWithRelationInputObjectSchema as LabSubscriptionPlanOrderByWithRelationInputObjectSchema } from './objects/LabSubscriptionPlanOrderByWithRelationInput.schema';
import { LabSubscriptionPlanWhereInputObjectSchema as LabSubscriptionPlanWhereInputObjectSchema } from './objects/LabSubscriptionPlanWhereInput.schema';
import { LabSubscriptionPlanWhereUniqueInputObjectSchema as LabSubscriptionPlanWhereUniqueInputObjectSchema } from './objects/LabSubscriptionPlanWhereUniqueInput.schema';
import { LabSubscriptionPlanScalarFieldEnumSchema } from './enums/LabSubscriptionPlanScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const LabSubscriptionPlanFindManySelectSchema: z.ZodType<Prisma.LabSubscriptionPlanSelect> = z.object({
    id: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    tier: z.boolean().optional(),
    maxMembers: z.boolean().optional(),
    maxCasesMonth: z.boolean().optional(),
    stripeCustomerId: z.boolean().optional(),
    stripeSubscriptionId: z.boolean().optional(),
    stripePriceId: z.boolean().optional(),
    subscriptionNextRenewal: z.boolean().optional(),
    isCancelled: z.boolean().optional(),
    cancellationDate: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.LabSubscriptionPlanSelect>;

export const LabSubscriptionPlanFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    tier: z.boolean().optional(),
    maxMembers: z.boolean().optional(),
    maxCasesMonth: z.boolean().optional(),
    stripeCustomerId: z.boolean().optional(),
    stripeSubscriptionId: z.boolean().optional(),
    stripePriceId: z.boolean().optional(),
    subscriptionNextRenewal: z.boolean().optional(),
    isCancelled: z.boolean().optional(),
    cancellationDate: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const LabSubscriptionPlanFindManySchema: z.ZodType<Prisma.LabSubscriptionPlanFindManyArgs> = z.object({ select: LabSubscriptionPlanFindManySelectSchema.optional(), include: z.lazy(() => LabSubscriptionPlanIncludeObjectSchema.optional()), orderBy: z.union([LabSubscriptionPlanOrderByWithRelationInputObjectSchema, LabSubscriptionPlanOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabSubscriptionPlanWhereInputObjectSchema.optional(), cursor: LabSubscriptionPlanWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([LabSubscriptionPlanScalarFieldEnumSchema, LabSubscriptionPlanScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.LabSubscriptionPlanFindManyArgs>;

export const LabSubscriptionPlanFindManyZodSchema = z.object({ select: LabSubscriptionPlanFindManySelectSchema.optional(), include: z.lazy(() => LabSubscriptionPlanIncludeObjectSchema.optional()), orderBy: z.union([LabSubscriptionPlanOrderByWithRelationInputObjectSchema, LabSubscriptionPlanOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabSubscriptionPlanWhereInputObjectSchema.optional(), cursor: LabSubscriptionPlanWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([LabSubscriptionPlanScalarFieldEnumSchema, LabSubscriptionPlanScalarFieldEnumSchema.array()]).optional() }).strict();
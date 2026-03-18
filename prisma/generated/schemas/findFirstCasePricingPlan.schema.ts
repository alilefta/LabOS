import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CasePricingPlanIncludeObjectSchema as CasePricingPlanIncludeObjectSchema } from './objects/CasePricingPlanInclude.schema';
import { CasePricingPlanOrderByWithRelationInputObjectSchema as CasePricingPlanOrderByWithRelationInputObjectSchema } from './objects/CasePricingPlanOrderByWithRelationInput.schema';
import { CasePricingPlanWhereInputObjectSchema as CasePricingPlanWhereInputObjectSchema } from './objects/CasePricingPlanWhereInput.schema';
import { CasePricingPlanWhereUniqueInputObjectSchema as CasePricingPlanWhereUniqueInputObjectSchema } from './objects/CasePricingPlanWhereUniqueInput.schema';
import { CasePricingPlanScalarFieldEnumSchema } from './enums/CasePricingPlanScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CasePricingPlanFindFirstSelectSchema: z.ZodType<Prisma.CasePricingPlanSelect> = z.object({
    id: z.boolean().optional(),
    labId: z.boolean().optional(),
    Lab: z.boolean().optional(),
    pricingStrategy: z.boolean().optional(),
    firstToothPrice: z.boolean().optional(),
    bulkPrice: z.boolean().optional(),
    additionalToothPrice: z.boolean().optional(),
    bulkPriceThreshold: z.boolean().optional(),
    caseWorkItem: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CasePricingPlanSelect>;

export const CasePricingPlanFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    labId: z.boolean().optional(),
    Lab: z.boolean().optional(),
    pricingStrategy: z.boolean().optional(),
    firstToothPrice: z.boolean().optional(),
    bulkPrice: z.boolean().optional(),
    additionalToothPrice: z.boolean().optional(),
    bulkPriceThreshold: z.boolean().optional(),
    caseWorkItem: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const CasePricingPlanFindFirstSchema: z.ZodType<Prisma.CasePricingPlanFindFirstArgs> = z.object({ select: CasePricingPlanFindFirstSelectSchema.optional(), include: z.lazy(() => CasePricingPlanIncludeObjectSchema.optional()), orderBy: z.union([CasePricingPlanOrderByWithRelationInputObjectSchema, CasePricingPlanOrderByWithRelationInputObjectSchema.array()]).optional(), where: CasePricingPlanWhereInputObjectSchema.optional(), cursor: CasePricingPlanWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CasePricingPlanScalarFieldEnumSchema, CasePricingPlanScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CasePricingPlanFindFirstArgs>;

export const CasePricingPlanFindFirstZodSchema = z.object({ select: CasePricingPlanFindFirstSelectSchema.optional(), include: z.lazy(() => CasePricingPlanIncludeObjectSchema.optional()), orderBy: z.union([CasePricingPlanOrderByWithRelationInputObjectSchema, CasePricingPlanOrderByWithRelationInputObjectSchema.array()]).optional(), where: CasePricingPlanWhereInputObjectSchema.optional(), cursor: CasePricingPlanWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CasePricingPlanScalarFieldEnumSchema, CasePricingPlanScalarFieldEnumSchema.array()]).optional() }).strict();
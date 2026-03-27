import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CasePricingPlanIncludeObjectSchema as CasePricingPlanIncludeObjectSchema } from './objects/CasePricingPlanInclude.schema';
import { CasePricingPlanOrderByWithRelationInputObjectSchema as CasePricingPlanOrderByWithRelationInputObjectSchema } from './objects/CasePricingPlanOrderByWithRelationInput.schema';
import { CasePricingPlanWhereInputObjectSchema as CasePricingPlanWhereInputObjectSchema } from './objects/CasePricingPlanWhereInput.schema';
import { CasePricingPlanWhereUniqueInputObjectSchema as CasePricingPlanWhereUniqueInputObjectSchema } from './objects/CasePricingPlanWhereUniqueInput.schema';
import { CasePricingPlanScalarFieldEnumSchema } from './enums/CasePricingPlanScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CasePricingPlanFindManySelectSchema: z.ZodType<Prisma.CasePricingPlanSelect> = z.object({
    id: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    name: z.boolean().optional(),
    isDefault: z.boolean().optional(),
    pricingStrategy: z.boolean().optional(),
    firstToothPrice: z.boolean().optional(),
    bulkPrice: z.boolean().optional(),
    additionalToothPrice: z.boolean().optional(),
    bulkPriceThreshold: z.boolean().optional(),
    productId: z.boolean().optional(),
    product: z.boolean().optional(),
    clinicId: z.boolean().optional(),
    clinic: z.boolean().optional(),
    caseWorkItem: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CasePricingPlanSelect>;

export const CasePricingPlanFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    name: z.boolean().optional(),
    isDefault: z.boolean().optional(),
    pricingStrategy: z.boolean().optional(),
    firstToothPrice: z.boolean().optional(),
    bulkPrice: z.boolean().optional(),
    additionalToothPrice: z.boolean().optional(),
    bulkPriceThreshold: z.boolean().optional(),
    productId: z.boolean().optional(),
    product: z.boolean().optional(),
    clinicId: z.boolean().optional(),
    clinic: z.boolean().optional(),
    caseWorkItem: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const CasePricingPlanFindManySchema: z.ZodType<Prisma.CasePricingPlanFindManyArgs> = z.object({ select: CasePricingPlanFindManySelectSchema.optional(), include: z.lazy(() => CasePricingPlanIncludeObjectSchema.optional()), orderBy: z.union([CasePricingPlanOrderByWithRelationInputObjectSchema, CasePricingPlanOrderByWithRelationInputObjectSchema.array()]).optional(), where: CasePricingPlanWhereInputObjectSchema.optional(), cursor: CasePricingPlanWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CasePricingPlanScalarFieldEnumSchema, CasePricingPlanScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CasePricingPlanFindManyArgs>;

export const CasePricingPlanFindManyZodSchema = z.object({ select: CasePricingPlanFindManySelectSchema.optional(), include: z.lazy(() => CasePricingPlanIncludeObjectSchema.optional()), orderBy: z.union([CasePricingPlanOrderByWithRelationInputObjectSchema, CasePricingPlanOrderByWithRelationInputObjectSchema.array()]).optional(), where: CasePricingPlanWhereInputObjectSchema.optional(), cursor: CasePricingPlanWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CasePricingPlanScalarFieldEnumSchema, CasePricingPlanScalarFieldEnumSchema.array()]).optional() }).strict();
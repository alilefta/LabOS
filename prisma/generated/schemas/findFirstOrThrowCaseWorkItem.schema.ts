import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseWorkItemIncludeObjectSchema as CaseWorkItemIncludeObjectSchema } from './objects/CaseWorkItemInclude.schema';
import { CaseWorkItemOrderByWithRelationInputObjectSchema as CaseWorkItemOrderByWithRelationInputObjectSchema } from './objects/CaseWorkItemOrderByWithRelationInput.schema';
import { CaseWorkItemWhereInputObjectSchema as CaseWorkItemWhereInputObjectSchema } from './objects/CaseWorkItemWhereInput.schema';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './objects/CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemScalarFieldEnumSchema } from './enums/CaseWorkItemScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CaseWorkItemFindFirstOrThrowSelectSchema: z.ZodType<Prisma.CaseWorkItemSelect> = z.object({
    id: z.boolean().optional(),
    productId: z.boolean().optional(),
    product: z.boolean().optional(),
    labId: z.boolean().optional(),
    Lab: z.boolean().optional(),
    caseId: z.boolean().optional(),
    case: z.boolean().optional(),
    casePricingPlanId: z.boolean().optional(),
    casePricingPlan: z.boolean().optional(),
    totalPrice: z.boolean().optional(),
    pricingStrategy: z.boolean().optional(),
    firstToothPrice: z.boolean().optional(),
    bulkPrice: z.boolean().optional(),
    additionalToothPrice: z.boolean().optional(),
    bulkPriceThreshold: z.boolean().optional(),
    jawType: z.boolean().optional(),
    selectedTeeth: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemSelect>;

export const CaseWorkItemFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    productId: z.boolean().optional(),
    product: z.boolean().optional(),
    labId: z.boolean().optional(),
    Lab: z.boolean().optional(),
    caseId: z.boolean().optional(),
    case: z.boolean().optional(),
    casePricingPlanId: z.boolean().optional(),
    casePricingPlan: z.boolean().optional(),
    totalPrice: z.boolean().optional(),
    pricingStrategy: z.boolean().optional(),
    firstToothPrice: z.boolean().optional(),
    bulkPrice: z.boolean().optional(),
    additionalToothPrice: z.boolean().optional(),
    bulkPriceThreshold: z.boolean().optional(),
    jawType: z.boolean().optional(),
    selectedTeeth: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const CaseWorkItemFindFirstOrThrowSchema: z.ZodType<Prisma.CaseWorkItemFindFirstOrThrowArgs> = z.object({ select: CaseWorkItemFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => CaseWorkItemIncludeObjectSchema.optional()), orderBy: z.union([CaseWorkItemOrderByWithRelationInputObjectSchema, CaseWorkItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseWorkItemWhereInputObjectSchema.optional(), cursor: CaseWorkItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseWorkItemScalarFieldEnumSchema, CaseWorkItemScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CaseWorkItemFindFirstOrThrowArgs>;

export const CaseWorkItemFindFirstOrThrowZodSchema = z.object({ select: CaseWorkItemFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => CaseWorkItemIncludeObjectSchema.optional()), orderBy: z.union([CaseWorkItemOrderByWithRelationInputObjectSchema, CaseWorkItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseWorkItemWhereInputObjectSchema.optional(), cursor: CaseWorkItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseWorkItemScalarFieldEnumSchema, CaseWorkItemScalarFieldEnumSchema.array()]).optional() }).strict();
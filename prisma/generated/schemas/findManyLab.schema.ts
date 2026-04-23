import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabIncludeObjectSchema as LabIncludeObjectSchema } from './objects/LabInclude.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './objects/LabOrderByWithRelationInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './objects/LabWhereInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './objects/LabWhereUniqueInput.schema';
import { LabScalarFieldEnumSchema } from './enums/LabScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const LabFindManySelectSchema: z.ZodType<Prisma.LabSelect> = z.object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    slug: z.boolean().optional(),
    brandAvatarUrl: z.boolean().optional(),
    subtitle: z.boolean().optional(),
    labSubscriptionPlan: z.boolean().optional(),
    clinics: z.boolean().optional(),
    cases: z.boolean().optional(),
    caseCategories: z.boolean().optional(),
    workTypes: z.boolean().optional(),
    products: z.boolean().optional(),
    caseWorkItems: z.boolean().optional(),
    selectedTeeth: z.boolean().optional(),
    casePricingPlans: z.boolean().optional(),
    caseAssetFiles: z.boolean().optional(),
    patients: z.boolean().optional(),
    dentists: z.boolean().optional(),
    staffAssignments: z.boolean().optional(),
    users: z.boolean().optional(),
    staff: z.boolean().optional(),
    nextCaseNumber: z.boolean().optional(),
    caseActivityLogs: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.LabSelect>;

export const LabFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    slug: z.boolean().optional(),
    brandAvatarUrl: z.boolean().optional(),
    subtitle: z.boolean().optional(),
    labSubscriptionPlan: z.boolean().optional(),
    clinics: z.boolean().optional(),
    cases: z.boolean().optional(),
    caseCategories: z.boolean().optional(),
    workTypes: z.boolean().optional(),
    products: z.boolean().optional(),
    caseWorkItems: z.boolean().optional(),
    selectedTeeth: z.boolean().optional(),
    casePricingPlans: z.boolean().optional(),
    caseAssetFiles: z.boolean().optional(),
    patients: z.boolean().optional(),
    dentists: z.boolean().optional(),
    staffAssignments: z.boolean().optional(),
    users: z.boolean().optional(),
    staff: z.boolean().optional(),
    nextCaseNumber: z.boolean().optional(),
    caseActivityLogs: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const LabFindManySchema: z.ZodType<Prisma.LabFindManyArgs> = z.object({ select: LabFindManySelectSchema.optional(), include: z.lazy(() => LabIncludeObjectSchema.optional()), orderBy: z.union([LabOrderByWithRelationInputObjectSchema, LabOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabWhereInputObjectSchema.optional(), cursor: LabWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([LabScalarFieldEnumSchema, LabScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.LabFindManyArgs>;

export const LabFindManyZodSchema = z.object({ select: LabFindManySelectSchema.optional(), include: z.lazy(() => LabIncludeObjectSchema.optional()), orderBy: z.union([LabOrderByWithRelationInputObjectSchema, LabOrderByWithRelationInputObjectSchema.array()]).optional(), where: LabWhereInputObjectSchema.optional(), cursor: LabWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([LabScalarFieldEnumSchema, LabScalarFieldEnumSchema.array()]).optional() }).strict();
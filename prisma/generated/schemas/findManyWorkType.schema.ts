import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { WorkTypeIncludeObjectSchema as WorkTypeIncludeObjectSchema } from './objects/WorkTypeInclude.schema';
import { WorkTypeOrderByWithRelationInputObjectSchema as WorkTypeOrderByWithRelationInputObjectSchema } from './objects/WorkTypeOrderByWithRelationInput.schema';
import { WorkTypeWhereInputObjectSchema as WorkTypeWhereInputObjectSchema } from './objects/WorkTypeWhereInput.schema';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './objects/WorkTypeWhereUniqueInput.schema';
import { WorkTypeScalarFieldEnumSchema } from './enums/WorkTypeScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const WorkTypeFindManySelectSchema: z.ZodType<Prisma.WorkTypeSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    imageUrl: z.boolean().optional(),
    products: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    requireTeethSelection: z.boolean().optional(),
    caseWorkItems: z.boolean().optional(),
    caseCategoryId: z.boolean().optional(),
    caseCategory: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.WorkTypeSelect>;

export const WorkTypeFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    imageUrl: z.boolean().optional(),
    products: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    requireTeethSelection: z.boolean().optional(),
    caseWorkItems: z.boolean().optional(),
    caseCategoryId: z.boolean().optional(),
    caseCategory: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const WorkTypeFindManySchema: z.ZodType<Prisma.WorkTypeFindManyArgs> = z.object({ select: WorkTypeFindManySelectSchema.optional(), include: z.lazy(() => WorkTypeIncludeObjectSchema.optional()), orderBy: z.union([WorkTypeOrderByWithRelationInputObjectSchema, WorkTypeOrderByWithRelationInputObjectSchema.array()]).optional(), where: WorkTypeWhereInputObjectSchema.optional(), cursor: WorkTypeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([WorkTypeScalarFieldEnumSchema, WorkTypeScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.WorkTypeFindManyArgs>;

export const WorkTypeFindManyZodSchema = z.object({ select: WorkTypeFindManySelectSchema.optional(), include: z.lazy(() => WorkTypeIncludeObjectSchema.optional()), orderBy: z.union([WorkTypeOrderByWithRelationInputObjectSchema, WorkTypeOrderByWithRelationInputObjectSchema.array()]).optional(), where: WorkTypeWhereInputObjectSchema.optional(), cursor: WorkTypeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([WorkTypeScalarFieldEnumSchema, WorkTypeScalarFieldEnumSchema.array()]).optional() }).strict();
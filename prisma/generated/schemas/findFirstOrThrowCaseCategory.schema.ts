import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseCategoryIncludeObjectSchema as CaseCategoryIncludeObjectSchema } from './objects/CaseCategoryInclude.schema';
import { CaseCategoryOrderByWithRelationInputObjectSchema as CaseCategoryOrderByWithRelationInputObjectSchema } from './objects/CaseCategoryOrderByWithRelationInput.schema';
import { CaseCategoryWhereInputObjectSchema as CaseCategoryWhereInputObjectSchema } from './objects/CaseCategoryWhereInput.schema';
import { CaseCategoryWhereUniqueInputObjectSchema as CaseCategoryWhereUniqueInputObjectSchema } from './objects/CaseCategoryWhereUniqueInput.schema';
import { CaseCategoryScalarFieldEnumSchema } from './enums/CaseCategoryScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CaseCategoryFindFirstOrThrowSelectSchema: z.ZodType<Prisma.CaseCategorySelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    imageUrl: z.boolean().optional(),
    isActive: z.boolean().optional(),
    workTypes: z.boolean().optional(),
    cases: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CaseCategorySelect>;

export const CaseCategoryFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    imageUrl: z.boolean().optional(),
    isActive: z.boolean().optional(),
    workTypes: z.boolean().optional(),
    cases: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const CaseCategoryFindFirstOrThrowSchema: z.ZodType<Prisma.CaseCategoryFindFirstOrThrowArgs> = z.object({ select: CaseCategoryFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => CaseCategoryIncludeObjectSchema.optional()), orderBy: z.union([CaseCategoryOrderByWithRelationInputObjectSchema, CaseCategoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseCategoryWhereInputObjectSchema.optional(), cursor: CaseCategoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseCategoryScalarFieldEnumSchema, CaseCategoryScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CaseCategoryFindFirstOrThrowArgs>;

export const CaseCategoryFindFirstOrThrowZodSchema = z.object({ select: CaseCategoryFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => CaseCategoryIncludeObjectSchema.optional()), orderBy: z.union([CaseCategoryOrderByWithRelationInputObjectSchema, CaseCategoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseCategoryWhereInputObjectSchema.optional(), cursor: CaseCategoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseCategoryScalarFieldEnumSchema, CaseCategoryScalarFieldEnumSchema.array()]).optional() }).strict();
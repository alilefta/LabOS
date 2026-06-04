import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ProductAddonIncludeObjectSchema as ProductAddonIncludeObjectSchema } from './objects/ProductAddonInclude.schema';
import { ProductAddonOrderByWithRelationInputObjectSchema as ProductAddonOrderByWithRelationInputObjectSchema } from './objects/ProductAddonOrderByWithRelationInput.schema';
import { ProductAddonWhereInputObjectSchema as ProductAddonWhereInputObjectSchema } from './objects/ProductAddonWhereInput.schema';
import { ProductAddonWhereUniqueInputObjectSchema as ProductAddonWhereUniqueInputObjectSchema } from './objects/ProductAddonWhereUniqueInput.schema';
import { ProductAddonScalarFieldEnumSchema } from './enums/ProductAddonScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ProductAddonFindFirstOrThrowSelectSchema: z.ZodType<Prisma.ProductAddonSelect> = z.object({
    id: z.boolean().optional(),
    productId: z.boolean().optional(),
    product: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    name: z.boolean().optional(),
    price: z.boolean().optional(),
    isArchived: z.boolean().optional(),
    caseWorkItemAddons: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ProductAddonSelect>;

export const ProductAddonFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    productId: z.boolean().optional(),
    product: z.boolean().optional(),
    labId: z.boolean().optional(),
    lab: z.boolean().optional(),
    name: z.boolean().optional(),
    price: z.boolean().optional(),
    isArchived: z.boolean().optional(),
    caseWorkItemAddons: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const ProductAddonFindFirstOrThrowSchema: z.ZodType<Prisma.ProductAddonFindFirstOrThrowArgs> = z.object({ select: ProductAddonFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => ProductAddonIncludeObjectSchema.optional()), orderBy: z.union([ProductAddonOrderByWithRelationInputObjectSchema, ProductAddonOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProductAddonWhereInputObjectSchema.optional(), cursor: ProductAddonWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProductAddonScalarFieldEnumSchema, ProductAddonScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ProductAddonFindFirstOrThrowArgs>;

export const ProductAddonFindFirstOrThrowZodSchema = z.object({ select: ProductAddonFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => ProductAddonIncludeObjectSchema.optional()), orderBy: z.union([ProductAddonOrderByWithRelationInputObjectSchema, ProductAddonOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProductAddonWhereInputObjectSchema.optional(), cursor: ProductAddonWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProductAddonScalarFieldEnumSchema, ProductAddonScalarFieldEnumSchema.array()]).optional() }).strict();
import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ProductAddonSelectObjectSchema as ProductAddonSelectObjectSchema } from './objects/ProductAddonSelect.schema';
import { ProductAddonIncludeObjectSchema as ProductAddonIncludeObjectSchema } from './objects/ProductAddonInclude.schema';
import { ProductAddonCreateInputObjectSchema as ProductAddonCreateInputObjectSchema } from './objects/ProductAddonCreateInput.schema';
import { ProductAddonUncheckedCreateInputObjectSchema as ProductAddonUncheckedCreateInputObjectSchema } from './objects/ProductAddonUncheckedCreateInput.schema';

export const ProductAddonCreateOneSchema: z.ZodType<Prisma.ProductAddonCreateArgs> = z.object({ select: ProductAddonSelectObjectSchema.optional(), include: ProductAddonIncludeObjectSchema.optional(), data: z.union([ProductAddonCreateInputObjectSchema, ProductAddonUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ProductAddonCreateArgs>;

export const ProductAddonCreateOneZodSchema = z.object({ select: ProductAddonSelectObjectSchema.optional(), include: ProductAddonIncludeObjectSchema.optional(), data: z.union([ProductAddonCreateInputObjectSchema, ProductAddonUncheckedCreateInputObjectSchema]) }).strict();
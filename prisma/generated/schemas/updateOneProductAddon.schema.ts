import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ProductAddonSelectObjectSchema as ProductAddonSelectObjectSchema } from './objects/ProductAddonSelect.schema';
import { ProductAddonIncludeObjectSchema as ProductAddonIncludeObjectSchema } from './objects/ProductAddonInclude.schema';
import { ProductAddonUpdateInputObjectSchema as ProductAddonUpdateInputObjectSchema } from './objects/ProductAddonUpdateInput.schema';
import { ProductAddonUncheckedUpdateInputObjectSchema as ProductAddonUncheckedUpdateInputObjectSchema } from './objects/ProductAddonUncheckedUpdateInput.schema';
import { ProductAddonWhereUniqueInputObjectSchema as ProductAddonWhereUniqueInputObjectSchema } from './objects/ProductAddonWhereUniqueInput.schema';

export const ProductAddonUpdateOneSchema: z.ZodType<Prisma.ProductAddonUpdateArgs> = z.object({ select: ProductAddonSelectObjectSchema.optional(), include: ProductAddonIncludeObjectSchema.optional(), data: z.union([ProductAddonUpdateInputObjectSchema, ProductAddonUncheckedUpdateInputObjectSchema]), where: ProductAddonWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProductAddonUpdateArgs>;

export const ProductAddonUpdateOneZodSchema = z.object({ select: ProductAddonSelectObjectSchema.optional(), include: ProductAddonIncludeObjectSchema.optional(), data: z.union([ProductAddonUpdateInputObjectSchema, ProductAddonUncheckedUpdateInputObjectSchema]), where: ProductAddonWhereUniqueInputObjectSchema }).strict();
import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ProductAddonSelectObjectSchema as ProductAddonSelectObjectSchema } from './objects/ProductAddonSelect.schema';
import { ProductAddonIncludeObjectSchema as ProductAddonIncludeObjectSchema } from './objects/ProductAddonInclude.schema';
import { ProductAddonWhereUniqueInputObjectSchema as ProductAddonWhereUniqueInputObjectSchema } from './objects/ProductAddonWhereUniqueInput.schema';

export const ProductAddonFindUniqueSchema: z.ZodType<Prisma.ProductAddonFindUniqueArgs> = z.object({ select: ProductAddonSelectObjectSchema.optional(), include: ProductAddonIncludeObjectSchema.optional(), where: ProductAddonWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProductAddonFindUniqueArgs>;

export const ProductAddonFindUniqueZodSchema = z.object({ select: ProductAddonSelectObjectSchema.optional(), include: ProductAddonIncludeObjectSchema.optional(), where: ProductAddonWhereUniqueInputObjectSchema }).strict();
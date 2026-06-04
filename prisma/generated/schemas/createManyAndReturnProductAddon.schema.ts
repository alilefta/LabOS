import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ProductAddonSelectObjectSchema as ProductAddonSelectObjectSchema } from './objects/ProductAddonSelect.schema';
import { ProductAddonCreateManyInputObjectSchema as ProductAddonCreateManyInputObjectSchema } from './objects/ProductAddonCreateManyInput.schema';

export const ProductAddonCreateManyAndReturnSchema: z.ZodType<Prisma.ProductAddonCreateManyAndReturnArgs> = z.object({ select: ProductAddonSelectObjectSchema.optional(), data: z.union([ ProductAddonCreateManyInputObjectSchema, z.array(ProductAddonCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ProductAddonCreateManyAndReturnArgs>;

export const ProductAddonCreateManyAndReturnZodSchema = z.object({ select: ProductAddonSelectObjectSchema.optional(), data: z.union([ ProductAddonCreateManyInputObjectSchema, z.array(ProductAddonCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
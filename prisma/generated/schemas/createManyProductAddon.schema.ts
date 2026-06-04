import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ProductAddonCreateManyInputObjectSchema as ProductAddonCreateManyInputObjectSchema } from './objects/ProductAddonCreateManyInput.schema';

export const ProductAddonCreateManySchema: z.ZodType<Prisma.ProductAddonCreateManyArgs> = z.object({ data: z.union([ ProductAddonCreateManyInputObjectSchema, z.array(ProductAddonCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ProductAddonCreateManyArgs>;

export const ProductAddonCreateManyZodSchema = z.object({ data: z.union([ ProductAddonCreateManyInputObjectSchema, z.array(ProductAddonCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ProductAddonSelectObjectSchema as ProductAddonSelectObjectSchema } from './objects/ProductAddonSelect.schema';
import { ProductAddonIncludeObjectSchema as ProductAddonIncludeObjectSchema } from './objects/ProductAddonInclude.schema';
import { ProductAddonWhereUniqueInputObjectSchema as ProductAddonWhereUniqueInputObjectSchema } from './objects/ProductAddonWhereUniqueInput.schema';
import { ProductAddonCreateInputObjectSchema as ProductAddonCreateInputObjectSchema } from './objects/ProductAddonCreateInput.schema';
import { ProductAddonUncheckedCreateInputObjectSchema as ProductAddonUncheckedCreateInputObjectSchema } from './objects/ProductAddonUncheckedCreateInput.schema';
import { ProductAddonUpdateInputObjectSchema as ProductAddonUpdateInputObjectSchema } from './objects/ProductAddonUpdateInput.schema';
import { ProductAddonUncheckedUpdateInputObjectSchema as ProductAddonUncheckedUpdateInputObjectSchema } from './objects/ProductAddonUncheckedUpdateInput.schema';

export const ProductAddonUpsertOneSchema: z.ZodType<Prisma.ProductAddonUpsertArgs> = z.object({ select: ProductAddonSelectObjectSchema.optional(), include: ProductAddonIncludeObjectSchema.optional(), where: ProductAddonWhereUniqueInputObjectSchema, create: z.union([ ProductAddonCreateInputObjectSchema, ProductAddonUncheckedCreateInputObjectSchema ]), update: z.union([ ProductAddonUpdateInputObjectSchema, ProductAddonUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ProductAddonUpsertArgs>;

export const ProductAddonUpsertOneZodSchema = z.object({ select: ProductAddonSelectObjectSchema.optional(), include: ProductAddonIncludeObjectSchema.optional(), where: ProductAddonWhereUniqueInputObjectSchema, create: z.union([ ProductAddonCreateInputObjectSchema, ProductAddonUncheckedCreateInputObjectSchema ]), update: z.union([ ProductAddonUpdateInputObjectSchema, ProductAddonUncheckedUpdateInputObjectSchema ]) }).strict();
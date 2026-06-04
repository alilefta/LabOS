import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ProductAddonSelectObjectSchema as ProductAddonSelectObjectSchema } from './objects/ProductAddonSelect.schema';
import { ProductAddonUpdateManyMutationInputObjectSchema as ProductAddonUpdateManyMutationInputObjectSchema } from './objects/ProductAddonUpdateManyMutationInput.schema';
import { ProductAddonWhereInputObjectSchema as ProductAddonWhereInputObjectSchema } from './objects/ProductAddonWhereInput.schema';

export const ProductAddonUpdateManyAndReturnSchema: z.ZodType<Prisma.ProductAddonUpdateManyAndReturnArgs> = z.object({ select: ProductAddonSelectObjectSchema.optional(), data: ProductAddonUpdateManyMutationInputObjectSchema, where: ProductAddonWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ProductAddonUpdateManyAndReturnArgs>;

export const ProductAddonUpdateManyAndReturnZodSchema = z.object({ select: ProductAddonSelectObjectSchema.optional(), data: ProductAddonUpdateManyMutationInputObjectSchema, where: ProductAddonWhereInputObjectSchema.optional() }).strict();
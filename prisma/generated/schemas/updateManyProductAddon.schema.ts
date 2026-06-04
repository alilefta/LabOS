import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ProductAddonUpdateManyMutationInputObjectSchema as ProductAddonUpdateManyMutationInputObjectSchema } from './objects/ProductAddonUpdateManyMutationInput.schema';
import { ProductAddonWhereInputObjectSchema as ProductAddonWhereInputObjectSchema } from './objects/ProductAddonWhereInput.schema';

export const ProductAddonUpdateManySchema: z.ZodType<Prisma.ProductAddonUpdateManyArgs> = z.object({ data: ProductAddonUpdateManyMutationInputObjectSchema, where: ProductAddonWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ProductAddonUpdateManyArgs>;

export const ProductAddonUpdateManyZodSchema = z.object({ data: ProductAddonUpdateManyMutationInputObjectSchema, where: ProductAddonWhereInputObjectSchema.optional() }).strict();
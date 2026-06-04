import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ProductAddonWhereInputObjectSchema as ProductAddonWhereInputObjectSchema } from './objects/ProductAddonWhereInput.schema';

export const ProductAddonDeleteManySchema: z.ZodType<Prisma.ProductAddonDeleteManyArgs> = z.object({ where: ProductAddonWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ProductAddonDeleteManyArgs>;

export const ProductAddonDeleteManyZodSchema = z.object({ where: ProductAddonWhereInputObjectSchema.optional() }).strict();
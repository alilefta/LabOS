import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonWhereUniqueInputObjectSchema as ProductAddonWhereUniqueInputObjectSchema } from './ProductAddonWhereUniqueInput.schema';
import { ProductAddonCreateWithoutProductInputObjectSchema as ProductAddonCreateWithoutProductInputObjectSchema } from './ProductAddonCreateWithoutProductInput.schema';
import { ProductAddonUncheckedCreateWithoutProductInputObjectSchema as ProductAddonUncheckedCreateWithoutProductInputObjectSchema } from './ProductAddonUncheckedCreateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductAddonWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductAddonCreateWithoutProductInputObjectSchema), z.lazy(() => ProductAddonUncheckedCreateWithoutProductInputObjectSchema)])
}).strict();
export const ProductAddonCreateOrConnectWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductAddonCreateOrConnectWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonCreateOrConnectWithoutProductInput>;
export const ProductAddonCreateOrConnectWithoutProductInputObjectZodSchema = makeSchema();

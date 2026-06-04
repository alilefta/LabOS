import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonWhereUniqueInputObjectSchema as ProductAddonWhereUniqueInputObjectSchema } from './ProductAddonWhereUniqueInput.schema';
import { ProductAddonUpdateWithoutProductInputObjectSchema as ProductAddonUpdateWithoutProductInputObjectSchema } from './ProductAddonUpdateWithoutProductInput.schema';
import { ProductAddonUncheckedUpdateWithoutProductInputObjectSchema as ProductAddonUncheckedUpdateWithoutProductInputObjectSchema } from './ProductAddonUncheckedUpdateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductAddonWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ProductAddonUpdateWithoutProductInputObjectSchema), z.lazy(() => ProductAddonUncheckedUpdateWithoutProductInputObjectSchema)])
}).strict();
export const ProductAddonUpdateWithWhereUniqueWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductAddonUpdateWithWhereUniqueWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonUpdateWithWhereUniqueWithoutProductInput>;
export const ProductAddonUpdateWithWhereUniqueWithoutProductInputObjectZodSchema = makeSchema();

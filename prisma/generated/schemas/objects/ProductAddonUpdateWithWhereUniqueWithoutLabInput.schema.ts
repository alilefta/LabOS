import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonWhereUniqueInputObjectSchema as ProductAddonWhereUniqueInputObjectSchema } from './ProductAddonWhereUniqueInput.schema';
import { ProductAddonUpdateWithoutLabInputObjectSchema as ProductAddonUpdateWithoutLabInputObjectSchema } from './ProductAddonUpdateWithoutLabInput.schema';
import { ProductAddonUncheckedUpdateWithoutLabInputObjectSchema as ProductAddonUncheckedUpdateWithoutLabInputObjectSchema } from './ProductAddonUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductAddonWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ProductAddonUpdateWithoutLabInputObjectSchema), z.lazy(() => ProductAddonUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const ProductAddonUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.ProductAddonUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonUpdateWithWhereUniqueWithoutLabInput>;
export const ProductAddonUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();

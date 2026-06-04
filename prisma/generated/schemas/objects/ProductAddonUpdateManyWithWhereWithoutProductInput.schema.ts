import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonScalarWhereInputObjectSchema as ProductAddonScalarWhereInputObjectSchema } from './ProductAddonScalarWhereInput.schema';
import { ProductAddonUpdateManyMutationInputObjectSchema as ProductAddonUpdateManyMutationInputObjectSchema } from './ProductAddonUpdateManyMutationInput.schema';
import { ProductAddonUncheckedUpdateManyWithoutProductInputObjectSchema as ProductAddonUncheckedUpdateManyWithoutProductInputObjectSchema } from './ProductAddonUncheckedUpdateManyWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductAddonScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ProductAddonUpdateManyMutationInputObjectSchema), z.lazy(() => ProductAddonUncheckedUpdateManyWithoutProductInputObjectSchema)])
}).strict();
export const ProductAddonUpdateManyWithWhereWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductAddonUpdateManyWithWhereWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonUpdateManyWithWhereWithoutProductInput>;
export const ProductAddonUpdateManyWithWhereWithoutProductInputObjectZodSchema = makeSchema();

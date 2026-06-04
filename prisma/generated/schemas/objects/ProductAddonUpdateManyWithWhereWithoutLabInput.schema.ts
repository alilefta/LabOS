import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonScalarWhereInputObjectSchema as ProductAddonScalarWhereInputObjectSchema } from './ProductAddonScalarWhereInput.schema';
import { ProductAddonUpdateManyMutationInputObjectSchema as ProductAddonUpdateManyMutationInputObjectSchema } from './ProductAddonUpdateManyMutationInput.schema';
import { ProductAddonUncheckedUpdateManyWithoutLabInputObjectSchema as ProductAddonUncheckedUpdateManyWithoutLabInputObjectSchema } from './ProductAddonUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductAddonScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ProductAddonUpdateManyMutationInputObjectSchema), z.lazy(() => ProductAddonUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const ProductAddonUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.ProductAddonUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonUpdateManyWithWhereWithoutLabInput>;
export const ProductAddonUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();

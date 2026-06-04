import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonCreateManyProductInputObjectSchema as ProductAddonCreateManyProductInputObjectSchema } from './ProductAddonCreateManyProductInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ProductAddonCreateManyProductInputObjectSchema), z.lazy(() => ProductAddonCreateManyProductInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ProductAddonCreateManyProductInputEnvelopeObjectSchema: z.ZodType<Prisma.ProductAddonCreateManyProductInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonCreateManyProductInputEnvelope>;
export const ProductAddonCreateManyProductInputEnvelopeObjectZodSchema = makeSchema();

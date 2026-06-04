import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonCreateManyLabInputObjectSchema as ProductAddonCreateManyLabInputObjectSchema } from './ProductAddonCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ProductAddonCreateManyLabInputObjectSchema), z.lazy(() => ProductAddonCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ProductAddonCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.ProductAddonCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonCreateManyLabInputEnvelope>;
export const ProductAddonCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();

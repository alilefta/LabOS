import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductCreateManyLabInputObjectSchema as ProductCreateManyLabInputObjectSchema } from './ProductCreateManyLabInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ProductCreateManyLabInputObjectSchema), z.lazy(() => ProductCreateManyLabInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ProductCreateManyLabInputEnvelopeObjectSchema: z.ZodType<Prisma.ProductCreateManyLabInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateManyLabInputEnvelope>;
export const ProductCreateManyLabInputEnvelopeObjectZodSchema = makeSchema();

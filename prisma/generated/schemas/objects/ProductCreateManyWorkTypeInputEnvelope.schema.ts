import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductCreateManyWorkTypeInputObjectSchema as ProductCreateManyWorkTypeInputObjectSchema } from './ProductCreateManyWorkTypeInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ProductCreateManyWorkTypeInputObjectSchema), z.lazy(() => ProductCreateManyWorkTypeInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ProductCreateManyWorkTypeInputEnvelopeObjectSchema: z.ZodType<Prisma.ProductCreateManyWorkTypeInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateManyWorkTypeInputEnvelope>;
export const ProductCreateManyWorkTypeInputEnvelopeObjectZodSchema = makeSchema();

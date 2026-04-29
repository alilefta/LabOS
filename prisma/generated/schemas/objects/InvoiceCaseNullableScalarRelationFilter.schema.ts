import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseWhereInputObjectSchema as InvoiceCaseWhereInputObjectSchema } from './InvoiceCaseWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => InvoiceCaseWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => InvoiceCaseWhereInputObjectSchema).optional().nullable()
}).strict();
export const InvoiceCaseNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.InvoiceCaseNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseNullableScalarRelationFilter>;
export const InvoiceCaseNullableScalarRelationFilterObjectZodSchema = makeSchema();

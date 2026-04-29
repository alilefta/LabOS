import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { InvoiceCaseWhereInputObjectSchema as InvoiceCaseWhereInputObjectSchema } from './InvoiceCaseWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => InvoiceCaseWhereInputObjectSchema).optional(),
  some: z.lazy(() => InvoiceCaseWhereInputObjectSchema).optional(),
  none: z.lazy(() => InvoiceCaseWhereInputObjectSchema).optional()
}).strict();
export const InvoiceCaseListRelationFilterObjectSchema: z.ZodType<Prisma.InvoiceCaseListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceCaseListRelationFilter>;
export const InvoiceCaseListRelationFilterObjectZodSchema = makeSchema();

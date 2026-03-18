import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SalesRepresentativeWhereInputObjectSchema as SalesRepresentativeWhereInputObjectSchema } from './SalesRepresentativeWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => SalesRepresentativeWhereInputObjectSchema).optional(),
  some: z.lazy(() => SalesRepresentativeWhereInputObjectSchema).optional(),
  none: z.lazy(() => SalesRepresentativeWhereInputObjectSchema).optional()
}).strict();
export const SalesRepresentativeListRelationFilterObjectSchema: z.ZodType<Prisma.SalesRepresentativeListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeListRelationFilter>;
export const SalesRepresentativeListRelationFilterObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SalesRepresentativeWhereInputObjectSchema as SalesRepresentativeWhereInputObjectSchema } from './SalesRepresentativeWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => SalesRepresentativeWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => SalesRepresentativeWhereInputObjectSchema).optional().nullable()
}).strict();
export const SalesRepresentativeNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.SalesRepresentativeNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeNullableScalarRelationFilter>;
export const SalesRepresentativeNullableScalarRelationFilterObjectZodSchema = makeSchema();

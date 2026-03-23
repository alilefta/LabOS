import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryWhereInputObjectSchema as CaseCategoryWhereInputObjectSchema } from './CaseCategoryWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => CaseCategoryWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => CaseCategoryWhereInputObjectSchema).optional().nullable()
}).strict();
export const CaseCategoryNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.CaseCategoryNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryNullableScalarRelationFilter>;
export const CaseCategoryNullableScalarRelationFilterObjectZodSchema = makeSchema();

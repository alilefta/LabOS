import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryWhereInputObjectSchema as CaseCategoryWhereInputObjectSchema } from './CaseCategoryWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => CaseCategoryWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => CaseCategoryWhereInputObjectSchema).optional()
}).strict();
export const CaseCategoryScalarRelationFilterObjectSchema: z.ZodType<Prisma.CaseCategoryScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryScalarRelationFilter>;
export const CaseCategoryScalarRelationFilterObjectZodSchema = makeSchema();

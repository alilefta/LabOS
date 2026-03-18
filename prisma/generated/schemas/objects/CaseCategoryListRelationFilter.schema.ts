import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryWhereInputObjectSchema as CaseCategoryWhereInputObjectSchema } from './CaseCategoryWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => CaseCategoryWhereInputObjectSchema).optional(),
  some: z.lazy(() => CaseCategoryWhereInputObjectSchema).optional(),
  none: z.lazy(() => CaseCategoryWhereInputObjectSchema).optional()
}).strict();
export const CaseCategoryListRelationFilterObjectSchema: z.ZodType<Prisma.CaseCategoryListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryListRelationFilter>;
export const CaseCategoryListRelationFilterObjectZodSchema = makeSchema();

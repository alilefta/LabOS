import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => CaseWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => CaseWhereInputObjectSchema).optional()
}).strict();
export const CaseScalarRelationFilterObjectSchema: z.ZodType<Prisma.CaseScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CaseScalarRelationFilter>;
export const CaseScalarRelationFilterObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => CaseWhereInputObjectSchema).optional(),
  some: z.lazy(() => CaseWhereInputObjectSchema).optional(),
  none: z.lazy(() => CaseWhereInputObjectSchema).optional()
}).strict();
export const CaseListRelationFilterObjectSchema: z.ZodType<Prisma.CaseListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CaseListRelationFilter>;
export const CaseListRelationFilterObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereInputObjectSchema as CaseWorkItemWhereInputObjectSchema } from './CaseWorkItemWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => CaseWorkItemWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => CaseWorkItemWhereInputObjectSchema).optional()
}).strict();
export const CaseWorkItemScalarRelationFilterObjectSchema: z.ZodType<Prisma.CaseWorkItemScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemScalarRelationFilter>;
export const CaseWorkItemScalarRelationFilterObjectZodSchema = makeSchema();

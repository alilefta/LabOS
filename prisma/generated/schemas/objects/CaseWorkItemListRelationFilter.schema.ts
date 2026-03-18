import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereInputObjectSchema as CaseWorkItemWhereInputObjectSchema } from './CaseWorkItemWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => CaseWorkItemWhereInputObjectSchema).optional(),
  some: z.lazy(() => CaseWorkItemWhereInputObjectSchema).optional(),
  none: z.lazy(() => CaseWorkItemWhereInputObjectSchema).optional()
}).strict();
export const CaseWorkItemListRelationFilterObjectSchema: z.ZodType<Prisma.CaseWorkItemListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemListRelationFilter>;
export const CaseWorkItemListRelationFilterObjectZodSchema = makeSchema();

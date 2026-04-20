import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogWhereInputObjectSchema as CaseActivityLogWhereInputObjectSchema } from './CaseActivityLogWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => CaseActivityLogWhereInputObjectSchema).optional(),
  some: z.lazy(() => CaseActivityLogWhereInputObjectSchema).optional(),
  none: z.lazy(() => CaseActivityLogWhereInputObjectSchema).optional()
}).strict();
export const CaseActivityLogListRelationFilterObjectSchema: z.ZodType<Prisma.CaseActivityLogListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogListRelationFilter>;
export const CaseActivityLogListRelationFilterObjectZodSchema = makeSchema();

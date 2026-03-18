import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeWhereInputObjectSchema as WorkTypeWhereInputObjectSchema } from './WorkTypeWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => WorkTypeWhereInputObjectSchema).optional(),
  some: z.lazy(() => WorkTypeWhereInputObjectSchema).optional(),
  none: z.lazy(() => WorkTypeWhereInputObjectSchema).optional()
}).strict();
export const WorkTypeListRelationFilterObjectSchema: z.ZodType<Prisma.WorkTypeListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeListRelationFilter>;
export const WorkTypeListRelationFilterObjectZodSchema = makeSchema();

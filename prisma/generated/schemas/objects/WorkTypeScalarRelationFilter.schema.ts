import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeWhereInputObjectSchema as WorkTypeWhereInputObjectSchema } from './WorkTypeWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => WorkTypeWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => WorkTypeWhereInputObjectSchema).optional()
}).strict();
export const WorkTypeScalarRelationFilterObjectSchema: z.ZodType<Prisma.WorkTypeScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeScalarRelationFilter>;
export const WorkTypeScalarRelationFilterObjectZodSchema = makeSchema();

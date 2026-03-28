import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeWhereInputObjectSchema as WorkTypeWhereInputObjectSchema } from './WorkTypeWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => WorkTypeWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => WorkTypeWhereInputObjectSchema).optional().nullable()
}).strict();
export const WorkTypeNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.WorkTypeNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeNullableScalarRelationFilter>;
export const WorkTypeNullableScalarRelationFilterObjectZodSchema = makeSchema();

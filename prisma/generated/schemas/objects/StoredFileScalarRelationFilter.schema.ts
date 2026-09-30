import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileWhereInputObjectSchema as StoredFileWhereInputObjectSchema } from './StoredFileWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => StoredFileWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => StoredFileWhereInputObjectSchema).optional()
}).strict();
export const StoredFileScalarRelationFilterObjectSchema: z.ZodType<Prisma.StoredFileScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileScalarRelationFilter>;
export const StoredFileScalarRelationFilterObjectZodSchema = makeSchema();

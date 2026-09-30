import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileWhereInputObjectSchema as StoredFileWhereInputObjectSchema } from './StoredFileWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => StoredFileWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => StoredFileWhereInputObjectSchema).optional().nullable()
}).strict();
export const StoredFileNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.StoredFileNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileNullableScalarRelationFilter>;
export const StoredFileNullableScalarRelationFilterObjectZodSchema = makeSchema();

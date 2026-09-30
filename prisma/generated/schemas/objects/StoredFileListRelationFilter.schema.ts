import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileWhereInputObjectSchema as StoredFileWhereInputObjectSchema } from './StoredFileWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => StoredFileWhereInputObjectSchema).optional(),
  some: z.lazy(() => StoredFileWhereInputObjectSchema).optional(),
  none: z.lazy(() => StoredFileWhereInputObjectSchema).optional()
}).strict();
export const StoredFileListRelationFilterObjectSchema: z.ZodType<Prisma.StoredFileListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileListRelationFilter>;
export const StoredFileListRelationFilterObjectZodSchema = makeSchema();

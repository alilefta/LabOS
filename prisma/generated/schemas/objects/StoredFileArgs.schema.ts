import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileSelectObjectSchema as StoredFileSelectObjectSchema } from './StoredFileSelect.schema';
import { StoredFileIncludeObjectSchema as StoredFileIncludeObjectSchema } from './StoredFileInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => StoredFileSelectObjectSchema).optional(),
  include: z.lazy(() => StoredFileIncludeObjectSchema).optional()
}).strict();
export const StoredFileArgsObjectSchema = makeSchema();
export const StoredFileArgsObjectZodSchema = makeSchema();

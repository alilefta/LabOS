import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantSelectObjectSchema as FileUploadGrantSelectObjectSchema } from './FileUploadGrantSelect.schema';
import { FileUploadGrantIncludeObjectSchema as FileUploadGrantIncludeObjectSchema } from './FileUploadGrantInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => FileUploadGrantSelectObjectSchema).optional(),
  include: z.lazy(() => FileUploadGrantIncludeObjectSchema).optional()
}).strict();
export const FileUploadGrantArgsObjectSchema = makeSchema();
export const FileUploadGrantArgsObjectZodSchema = makeSchema();

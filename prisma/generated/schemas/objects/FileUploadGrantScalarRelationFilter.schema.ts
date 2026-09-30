import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantWhereInputObjectSchema as FileUploadGrantWhereInputObjectSchema } from './FileUploadGrantWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => FileUploadGrantWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => FileUploadGrantWhereInputObjectSchema).optional()
}).strict();
export const FileUploadGrantScalarRelationFilterObjectSchema: z.ZodType<Prisma.FileUploadGrantScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantScalarRelationFilter>;
export const FileUploadGrantScalarRelationFilterObjectZodSchema = makeSchema();

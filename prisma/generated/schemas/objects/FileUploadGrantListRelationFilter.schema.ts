import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantWhereInputObjectSchema as FileUploadGrantWhereInputObjectSchema } from './FileUploadGrantWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => FileUploadGrantWhereInputObjectSchema).optional(),
  some: z.lazy(() => FileUploadGrantWhereInputObjectSchema).optional(),
  none: z.lazy(() => FileUploadGrantWhereInputObjectSchema).optional()
}).strict();
export const FileUploadGrantListRelationFilterObjectSchema: z.ZodType<Prisma.FileUploadGrantListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantListRelationFilter>;
export const FileUploadGrantListRelationFilterObjectZodSchema = makeSchema();

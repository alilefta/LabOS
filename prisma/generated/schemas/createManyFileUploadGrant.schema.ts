import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { FileUploadGrantCreateManyInputObjectSchema as FileUploadGrantCreateManyInputObjectSchema } from './objects/FileUploadGrantCreateManyInput.schema';

export const FileUploadGrantCreateManySchema: z.ZodType<Prisma.FileUploadGrantCreateManyArgs> = z.object({ data: z.union([ FileUploadGrantCreateManyInputObjectSchema, z.array(FileUploadGrantCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.FileUploadGrantCreateManyArgs>;

export const FileUploadGrantCreateManyZodSchema = z.object({ data: z.union([ FileUploadGrantCreateManyInputObjectSchema, z.array(FileUploadGrantCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
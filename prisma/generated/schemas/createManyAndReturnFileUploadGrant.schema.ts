import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { FileUploadGrantSelectObjectSchema as FileUploadGrantSelectObjectSchema } from './objects/FileUploadGrantSelect.schema';
import { FileUploadGrantCreateManyInputObjectSchema as FileUploadGrantCreateManyInputObjectSchema } from './objects/FileUploadGrantCreateManyInput.schema';

export const FileUploadGrantCreateManyAndReturnSchema: z.ZodType<Prisma.FileUploadGrantCreateManyAndReturnArgs> = z.object({ select: FileUploadGrantSelectObjectSchema.optional(), data: z.union([ FileUploadGrantCreateManyInputObjectSchema, z.array(FileUploadGrantCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.FileUploadGrantCreateManyAndReturnArgs>;

export const FileUploadGrantCreateManyAndReturnZodSchema = z.object({ select: FileUploadGrantSelectObjectSchema.optional(), data: z.union([ FileUploadGrantCreateManyInputObjectSchema, z.array(FileUploadGrantCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();
import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { FileUploadGrantSelectObjectSchema as FileUploadGrantSelectObjectSchema } from './objects/FileUploadGrantSelect.schema';
import { FileUploadGrantIncludeObjectSchema as FileUploadGrantIncludeObjectSchema } from './objects/FileUploadGrantInclude.schema';
import { FileUploadGrantCreateInputObjectSchema as FileUploadGrantCreateInputObjectSchema } from './objects/FileUploadGrantCreateInput.schema';
import { FileUploadGrantUncheckedCreateInputObjectSchema as FileUploadGrantUncheckedCreateInputObjectSchema } from './objects/FileUploadGrantUncheckedCreateInput.schema';

export const FileUploadGrantCreateOneSchema: z.ZodType<Prisma.FileUploadGrantCreateArgs> = z.object({ select: FileUploadGrantSelectObjectSchema.optional(), include: FileUploadGrantIncludeObjectSchema.optional(), data: z.union([FileUploadGrantCreateInputObjectSchema, FileUploadGrantUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.FileUploadGrantCreateArgs>;

export const FileUploadGrantCreateOneZodSchema = z.object({ select: FileUploadGrantSelectObjectSchema.optional(), include: FileUploadGrantIncludeObjectSchema.optional(), data: z.union([FileUploadGrantCreateInputObjectSchema, FileUploadGrantUncheckedCreateInputObjectSchema]) }).strict();
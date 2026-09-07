import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { FileUploadGrantSelectObjectSchema as FileUploadGrantSelectObjectSchema } from './objects/FileUploadGrantSelect.schema';
import { FileUploadGrantIncludeObjectSchema as FileUploadGrantIncludeObjectSchema } from './objects/FileUploadGrantInclude.schema';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './objects/FileUploadGrantWhereUniqueInput.schema';

export const FileUploadGrantFindUniqueSchema: z.ZodType<Prisma.FileUploadGrantFindUniqueArgs> = z.object({ select: FileUploadGrantSelectObjectSchema.optional(), include: FileUploadGrantIncludeObjectSchema.optional(), where: FileUploadGrantWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.FileUploadGrantFindUniqueArgs>;

export const FileUploadGrantFindUniqueZodSchema = z.object({ select: FileUploadGrantSelectObjectSchema.optional(), include: FileUploadGrantIncludeObjectSchema.optional(), where: FileUploadGrantWhereUniqueInputObjectSchema }).strict();
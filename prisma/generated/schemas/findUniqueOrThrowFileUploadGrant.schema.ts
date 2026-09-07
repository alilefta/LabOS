import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { FileUploadGrantSelectObjectSchema as FileUploadGrantSelectObjectSchema } from './objects/FileUploadGrantSelect.schema';
import { FileUploadGrantIncludeObjectSchema as FileUploadGrantIncludeObjectSchema } from './objects/FileUploadGrantInclude.schema';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './objects/FileUploadGrantWhereUniqueInput.schema';

export const FileUploadGrantFindUniqueOrThrowSchema: z.ZodType<Prisma.FileUploadGrantFindUniqueOrThrowArgs> = z.object({ select: FileUploadGrantSelectObjectSchema.optional(), include: FileUploadGrantIncludeObjectSchema.optional(), where: FileUploadGrantWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.FileUploadGrantFindUniqueOrThrowArgs>;

export const FileUploadGrantFindUniqueOrThrowZodSchema = z.object({ select: FileUploadGrantSelectObjectSchema.optional(), include: FileUploadGrantIncludeObjectSchema.optional(), where: FileUploadGrantWhereUniqueInputObjectSchema }).strict();
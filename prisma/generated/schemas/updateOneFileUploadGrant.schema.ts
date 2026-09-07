import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { FileUploadGrantSelectObjectSchema as FileUploadGrantSelectObjectSchema } from './objects/FileUploadGrantSelect.schema';
import { FileUploadGrantIncludeObjectSchema as FileUploadGrantIncludeObjectSchema } from './objects/FileUploadGrantInclude.schema';
import { FileUploadGrantUpdateInputObjectSchema as FileUploadGrantUpdateInputObjectSchema } from './objects/FileUploadGrantUpdateInput.schema';
import { FileUploadGrantUncheckedUpdateInputObjectSchema as FileUploadGrantUncheckedUpdateInputObjectSchema } from './objects/FileUploadGrantUncheckedUpdateInput.schema';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './objects/FileUploadGrantWhereUniqueInput.schema';

export const FileUploadGrantUpdateOneSchema: z.ZodType<Prisma.FileUploadGrantUpdateArgs> = z.object({ select: FileUploadGrantSelectObjectSchema.optional(), include: FileUploadGrantIncludeObjectSchema.optional(), data: z.union([FileUploadGrantUpdateInputObjectSchema, FileUploadGrantUncheckedUpdateInputObjectSchema]), where: FileUploadGrantWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.FileUploadGrantUpdateArgs>;

export const FileUploadGrantUpdateOneZodSchema = z.object({ select: FileUploadGrantSelectObjectSchema.optional(), include: FileUploadGrantIncludeObjectSchema.optional(), data: z.union([FileUploadGrantUpdateInputObjectSchema, FileUploadGrantUncheckedUpdateInputObjectSchema]), where: FileUploadGrantWhereUniqueInputObjectSchema }).strict();
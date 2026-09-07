import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { FileUploadGrantWhereInputObjectSchema as FileUploadGrantWhereInputObjectSchema } from './objects/FileUploadGrantWhereInput.schema';

export const FileUploadGrantDeleteManySchema: z.ZodType<Prisma.FileUploadGrantDeleteManyArgs> = z.object({ where: FileUploadGrantWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FileUploadGrantDeleteManyArgs>;

export const FileUploadGrantDeleteManyZodSchema = z.object({ where: FileUploadGrantWhereInputObjectSchema.optional() }).strict();
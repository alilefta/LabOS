import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { FileUploadGrantSelectObjectSchema as FileUploadGrantSelectObjectSchema } from './objects/FileUploadGrantSelect.schema';
import { FileUploadGrantIncludeObjectSchema as FileUploadGrantIncludeObjectSchema } from './objects/FileUploadGrantInclude.schema';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './objects/FileUploadGrantWhereUniqueInput.schema';
import { FileUploadGrantCreateInputObjectSchema as FileUploadGrantCreateInputObjectSchema } from './objects/FileUploadGrantCreateInput.schema';
import { FileUploadGrantUncheckedCreateInputObjectSchema as FileUploadGrantUncheckedCreateInputObjectSchema } from './objects/FileUploadGrantUncheckedCreateInput.schema';
import { FileUploadGrantUpdateInputObjectSchema as FileUploadGrantUpdateInputObjectSchema } from './objects/FileUploadGrantUpdateInput.schema';
import { FileUploadGrantUncheckedUpdateInputObjectSchema as FileUploadGrantUncheckedUpdateInputObjectSchema } from './objects/FileUploadGrantUncheckedUpdateInput.schema';

export const FileUploadGrantUpsertOneSchema: z.ZodType<Prisma.FileUploadGrantUpsertArgs> = z.object({ select: FileUploadGrantSelectObjectSchema.optional(), include: FileUploadGrantIncludeObjectSchema.optional(), where: FileUploadGrantWhereUniqueInputObjectSchema, create: z.union([ FileUploadGrantCreateInputObjectSchema, FileUploadGrantUncheckedCreateInputObjectSchema ]), update: z.union([ FileUploadGrantUpdateInputObjectSchema, FileUploadGrantUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.FileUploadGrantUpsertArgs>;

export const FileUploadGrantUpsertOneZodSchema = z.object({ select: FileUploadGrantSelectObjectSchema.optional(), include: FileUploadGrantIncludeObjectSchema.optional(), where: FileUploadGrantWhereUniqueInputObjectSchema, create: z.union([ FileUploadGrantCreateInputObjectSchema, FileUploadGrantUncheckedCreateInputObjectSchema ]), update: z.union([ FileUploadGrantUpdateInputObjectSchema, FileUploadGrantUncheckedUpdateInputObjectSchema ]) }).strict();
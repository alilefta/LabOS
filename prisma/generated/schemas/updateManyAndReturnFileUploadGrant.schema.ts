import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { FileUploadGrantSelectObjectSchema as FileUploadGrantSelectObjectSchema } from './objects/FileUploadGrantSelect.schema';
import { FileUploadGrantUpdateManyMutationInputObjectSchema as FileUploadGrantUpdateManyMutationInputObjectSchema } from './objects/FileUploadGrantUpdateManyMutationInput.schema';
import { FileUploadGrantWhereInputObjectSchema as FileUploadGrantWhereInputObjectSchema } from './objects/FileUploadGrantWhereInput.schema';

export const FileUploadGrantUpdateManyAndReturnSchema: z.ZodType<Prisma.FileUploadGrantUpdateManyAndReturnArgs> = z.object({ select: FileUploadGrantSelectObjectSchema.optional(), data: FileUploadGrantUpdateManyMutationInputObjectSchema, where: FileUploadGrantWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FileUploadGrantUpdateManyAndReturnArgs>;

export const FileUploadGrantUpdateManyAndReturnZodSchema = z.object({ select: FileUploadGrantSelectObjectSchema.optional(), data: FileUploadGrantUpdateManyMutationInputObjectSchema, where: FileUploadGrantWhereInputObjectSchema.optional() }).strict();
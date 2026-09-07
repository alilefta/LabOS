import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { FileUploadGrantUpdateManyMutationInputObjectSchema as FileUploadGrantUpdateManyMutationInputObjectSchema } from './objects/FileUploadGrantUpdateManyMutationInput.schema';
import { FileUploadGrantWhereInputObjectSchema as FileUploadGrantWhereInputObjectSchema } from './objects/FileUploadGrantWhereInput.schema';

export const FileUploadGrantUpdateManySchema: z.ZodType<Prisma.FileUploadGrantUpdateManyArgs> = z.object({ data: FileUploadGrantUpdateManyMutationInputObjectSchema, where: FileUploadGrantWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FileUploadGrantUpdateManyArgs>;

export const FileUploadGrantUpdateManyZodSchema = z.object({ data: FileUploadGrantUpdateManyMutationInputObjectSchema, where: FileUploadGrantWhereInputObjectSchema.optional() }).strict();
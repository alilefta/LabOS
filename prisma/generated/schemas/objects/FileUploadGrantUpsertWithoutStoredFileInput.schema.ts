import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantUpdateWithoutStoredFileInputObjectSchema as FileUploadGrantUpdateWithoutStoredFileInputObjectSchema } from './FileUploadGrantUpdateWithoutStoredFileInput.schema';
import { FileUploadGrantUncheckedUpdateWithoutStoredFileInputObjectSchema as FileUploadGrantUncheckedUpdateWithoutStoredFileInputObjectSchema } from './FileUploadGrantUncheckedUpdateWithoutStoredFileInput.schema';
import { FileUploadGrantCreateWithoutStoredFileInputObjectSchema as FileUploadGrantCreateWithoutStoredFileInputObjectSchema } from './FileUploadGrantCreateWithoutStoredFileInput.schema';
import { FileUploadGrantUncheckedCreateWithoutStoredFileInputObjectSchema as FileUploadGrantUncheckedCreateWithoutStoredFileInputObjectSchema } from './FileUploadGrantUncheckedCreateWithoutStoredFileInput.schema';
import { FileUploadGrantWhereInputObjectSchema as FileUploadGrantWhereInputObjectSchema } from './FileUploadGrantWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => FileUploadGrantUpdateWithoutStoredFileInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedUpdateWithoutStoredFileInputObjectSchema)]),
  create: z.union([z.lazy(() => FileUploadGrantCreateWithoutStoredFileInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedCreateWithoutStoredFileInputObjectSchema)]),
  where: z.lazy(() => FileUploadGrantWhereInputObjectSchema).optional()
}).strict();
export const FileUploadGrantUpsertWithoutStoredFileInputObjectSchema: z.ZodType<Prisma.FileUploadGrantUpsertWithoutStoredFileInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantUpsertWithoutStoredFileInput>;
export const FileUploadGrantUpsertWithoutStoredFileInputObjectZodSchema = makeSchema();

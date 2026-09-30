import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantWhereInputObjectSchema as FileUploadGrantWhereInputObjectSchema } from './FileUploadGrantWhereInput.schema';
import { FileUploadGrantUpdateWithoutStoredFileInputObjectSchema as FileUploadGrantUpdateWithoutStoredFileInputObjectSchema } from './FileUploadGrantUpdateWithoutStoredFileInput.schema';
import { FileUploadGrantUncheckedUpdateWithoutStoredFileInputObjectSchema as FileUploadGrantUncheckedUpdateWithoutStoredFileInputObjectSchema } from './FileUploadGrantUncheckedUpdateWithoutStoredFileInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileUploadGrantWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => FileUploadGrantUpdateWithoutStoredFileInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedUpdateWithoutStoredFileInputObjectSchema)])
}).strict();
export const FileUploadGrantUpdateToOneWithWhereWithoutStoredFileInputObjectSchema: z.ZodType<Prisma.FileUploadGrantUpdateToOneWithWhereWithoutStoredFileInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantUpdateToOneWithWhereWithoutStoredFileInput>;
export const FileUploadGrantUpdateToOneWithWhereWithoutStoredFileInputObjectZodSchema = makeSchema();

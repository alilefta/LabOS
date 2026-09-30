import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './FileUploadGrantWhereUniqueInput.schema';
import { FileUploadGrantCreateWithoutStoredFileInputObjectSchema as FileUploadGrantCreateWithoutStoredFileInputObjectSchema } from './FileUploadGrantCreateWithoutStoredFileInput.schema';
import { FileUploadGrantUncheckedCreateWithoutStoredFileInputObjectSchema as FileUploadGrantUncheckedCreateWithoutStoredFileInputObjectSchema } from './FileUploadGrantUncheckedCreateWithoutStoredFileInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => FileUploadGrantCreateWithoutStoredFileInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedCreateWithoutStoredFileInputObjectSchema)])
}).strict();
export const FileUploadGrantCreateOrConnectWithoutStoredFileInputObjectSchema: z.ZodType<Prisma.FileUploadGrantCreateOrConnectWithoutStoredFileInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantCreateOrConnectWithoutStoredFileInput>;
export const FileUploadGrantCreateOrConnectWithoutStoredFileInputObjectZodSchema = makeSchema();

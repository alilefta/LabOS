import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantCreateWithoutStoredFileInputObjectSchema as FileUploadGrantCreateWithoutStoredFileInputObjectSchema } from './FileUploadGrantCreateWithoutStoredFileInput.schema';
import { FileUploadGrantUncheckedCreateWithoutStoredFileInputObjectSchema as FileUploadGrantUncheckedCreateWithoutStoredFileInputObjectSchema } from './FileUploadGrantUncheckedCreateWithoutStoredFileInput.schema';
import { FileUploadGrantCreateOrConnectWithoutStoredFileInputObjectSchema as FileUploadGrantCreateOrConnectWithoutStoredFileInputObjectSchema } from './FileUploadGrantCreateOrConnectWithoutStoredFileInput.schema';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './FileUploadGrantWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FileUploadGrantCreateWithoutStoredFileInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedCreateWithoutStoredFileInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => FileUploadGrantCreateOrConnectWithoutStoredFileInputObjectSchema).optional(),
  connect: z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema).optional()
}).strict();
export const FileUploadGrantCreateNestedOneWithoutStoredFileInputObjectSchema: z.ZodType<Prisma.FileUploadGrantCreateNestedOneWithoutStoredFileInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantCreateNestedOneWithoutStoredFileInput>;
export const FileUploadGrantCreateNestedOneWithoutStoredFileInputObjectZodSchema = makeSchema();

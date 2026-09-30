import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantCreateWithoutStoredFileInputObjectSchema as FileUploadGrantCreateWithoutStoredFileInputObjectSchema } from './FileUploadGrantCreateWithoutStoredFileInput.schema';
import { FileUploadGrantUncheckedCreateWithoutStoredFileInputObjectSchema as FileUploadGrantUncheckedCreateWithoutStoredFileInputObjectSchema } from './FileUploadGrantUncheckedCreateWithoutStoredFileInput.schema';
import { FileUploadGrantCreateOrConnectWithoutStoredFileInputObjectSchema as FileUploadGrantCreateOrConnectWithoutStoredFileInputObjectSchema } from './FileUploadGrantCreateOrConnectWithoutStoredFileInput.schema';
import { FileUploadGrantUpsertWithoutStoredFileInputObjectSchema as FileUploadGrantUpsertWithoutStoredFileInputObjectSchema } from './FileUploadGrantUpsertWithoutStoredFileInput.schema';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './FileUploadGrantWhereUniqueInput.schema';
import { FileUploadGrantUpdateToOneWithWhereWithoutStoredFileInputObjectSchema as FileUploadGrantUpdateToOneWithWhereWithoutStoredFileInputObjectSchema } from './FileUploadGrantUpdateToOneWithWhereWithoutStoredFileInput.schema';
import { FileUploadGrantUpdateWithoutStoredFileInputObjectSchema as FileUploadGrantUpdateWithoutStoredFileInputObjectSchema } from './FileUploadGrantUpdateWithoutStoredFileInput.schema';
import { FileUploadGrantUncheckedUpdateWithoutStoredFileInputObjectSchema as FileUploadGrantUncheckedUpdateWithoutStoredFileInputObjectSchema } from './FileUploadGrantUncheckedUpdateWithoutStoredFileInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FileUploadGrantCreateWithoutStoredFileInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedCreateWithoutStoredFileInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => FileUploadGrantCreateOrConnectWithoutStoredFileInputObjectSchema).optional(),
  upsert: z.lazy(() => FileUploadGrantUpsertWithoutStoredFileInputObjectSchema).optional(),
  connect: z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => FileUploadGrantUpdateToOneWithWhereWithoutStoredFileInputObjectSchema), z.lazy(() => FileUploadGrantUpdateWithoutStoredFileInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedUpdateWithoutStoredFileInputObjectSchema)]).optional()
}).strict();
export const FileUploadGrantUpdateOneRequiredWithoutStoredFileNestedInputObjectSchema: z.ZodType<Prisma.FileUploadGrantUpdateOneRequiredWithoutStoredFileNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantUpdateOneRequiredWithoutStoredFileNestedInput>;
export const FileUploadGrantUpdateOneRequiredWithoutStoredFileNestedInputObjectZodSchema = makeSchema();

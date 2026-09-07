import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './FileUploadGrantWhereUniqueInput.schema';
import { FileUploadGrantUpdateWithoutLabInputObjectSchema as FileUploadGrantUpdateWithoutLabInputObjectSchema } from './FileUploadGrantUpdateWithoutLabInput.schema';
import { FileUploadGrantUncheckedUpdateWithoutLabInputObjectSchema as FileUploadGrantUncheckedUpdateWithoutLabInputObjectSchema } from './FileUploadGrantUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => FileUploadGrantUpdateWithoutLabInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const FileUploadGrantUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.FileUploadGrantUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantUpdateWithWhereUniqueWithoutLabInput>;
export const FileUploadGrantUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();

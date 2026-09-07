import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './FileUploadGrantWhereUniqueInput.schema';
import { FileUploadGrantUpdateWithoutLabInputObjectSchema as FileUploadGrantUpdateWithoutLabInputObjectSchema } from './FileUploadGrantUpdateWithoutLabInput.schema';
import { FileUploadGrantUncheckedUpdateWithoutLabInputObjectSchema as FileUploadGrantUncheckedUpdateWithoutLabInputObjectSchema } from './FileUploadGrantUncheckedUpdateWithoutLabInput.schema';
import { FileUploadGrantCreateWithoutLabInputObjectSchema as FileUploadGrantCreateWithoutLabInputObjectSchema } from './FileUploadGrantCreateWithoutLabInput.schema';
import { FileUploadGrantUncheckedCreateWithoutLabInputObjectSchema as FileUploadGrantUncheckedCreateWithoutLabInputObjectSchema } from './FileUploadGrantUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => FileUploadGrantUpdateWithoutLabInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => FileUploadGrantCreateWithoutLabInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const FileUploadGrantUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.FileUploadGrantUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantUpsertWithWhereUniqueWithoutLabInput>;
export const FileUploadGrantUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();

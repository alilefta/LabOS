import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './FileUploadGrantWhereUniqueInput.schema';
import { FileUploadGrantCreateWithoutLabInputObjectSchema as FileUploadGrantCreateWithoutLabInputObjectSchema } from './FileUploadGrantCreateWithoutLabInput.schema';
import { FileUploadGrantUncheckedCreateWithoutLabInputObjectSchema as FileUploadGrantUncheckedCreateWithoutLabInputObjectSchema } from './FileUploadGrantUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => FileUploadGrantCreateWithoutLabInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const FileUploadGrantCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.FileUploadGrantCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantCreateOrConnectWithoutLabInput>;
export const FileUploadGrantCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantScalarWhereInputObjectSchema as FileUploadGrantScalarWhereInputObjectSchema } from './FileUploadGrantScalarWhereInput.schema';
import { FileUploadGrantUpdateManyMutationInputObjectSchema as FileUploadGrantUpdateManyMutationInputObjectSchema } from './FileUploadGrantUpdateManyMutationInput.schema';
import { FileUploadGrantUncheckedUpdateManyWithoutLabInputObjectSchema as FileUploadGrantUncheckedUpdateManyWithoutLabInputObjectSchema } from './FileUploadGrantUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileUploadGrantScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => FileUploadGrantUpdateManyMutationInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const FileUploadGrantUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.FileUploadGrantUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantUpdateManyWithWhereWithoutLabInput>;
export const FileUploadGrantUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantScalarWhereInputObjectSchema as FileUploadGrantScalarWhereInputObjectSchema } from './FileUploadGrantScalarWhereInput.schema';
import { FileUploadGrantUpdateManyMutationInputObjectSchema as FileUploadGrantUpdateManyMutationInputObjectSchema } from './FileUploadGrantUpdateManyMutationInput.schema';
import { FileUploadGrantUncheckedUpdateManyWithoutOrganizationInputObjectSchema as FileUploadGrantUncheckedUpdateManyWithoutOrganizationInputObjectSchema } from './FileUploadGrantUncheckedUpdateManyWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileUploadGrantScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => FileUploadGrantUpdateManyMutationInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedUpdateManyWithoutOrganizationInputObjectSchema)])
}).strict();
export const FileUploadGrantUpdateManyWithWhereWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.FileUploadGrantUpdateManyWithWhereWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantUpdateManyWithWhereWithoutOrganizationInput>;
export const FileUploadGrantUpdateManyWithWhereWithoutOrganizationInputObjectZodSchema = makeSchema();

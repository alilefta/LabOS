import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantWhereUniqueInputObjectSchema as FileUploadGrantWhereUniqueInputObjectSchema } from './FileUploadGrantWhereUniqueInput.schema';
import { FileUploadGrantUpdateWithoutOrganizationInputObjectSchema as FileUploadGrantUpdateWithoutOrganizationInputObjectSchema } from './FileUploadGrantUpdateWithoutOrganizationInput.schema';
import { FileUploadGrantUncheckedUpdateWithoutOrganizationInputObjectSchema as FileUploadGrantUncheckedUpdateWithoutOrganizationInputObjectSchema } from './FileUploadGrantUncheckedUpdateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileUploadGrantWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => FileUploadGrantUpdateWithoutOrganizationInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedUpdateWithoutOrganizationInputObjectSchema)])
}).strict();
export const FileUploadGrantUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.FileUploadGrantUpdateWithWhereUniqueWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantUpdateWithWhereUniqueWithoutOrganizationInput>;
export const FileUploadGrantUpdateWithWhereUniqueWithoutOrganizationInputObjectZodSchema = makeSchema();

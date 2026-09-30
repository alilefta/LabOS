import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantWhereInputObjectSchema as FileUploadGrantWhereInputObjectSchema } from './FileUploadGrantWhereInput.schema';
import { FileUploadGrantUpdateWithoutClinicalUploadEvidenceInputObjectSchema as FileUploadGrantUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './FileUploadGrantUpdateWithoutClinicalUploadEvidenceInput.schema';
import { FileUploadGrantUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema as FileUploadGrantUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './FileUploadGrantUncheckedUpdateWithoutClinicalUploadEvidenceInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileUploadGrantWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => FileUploadGrantUpdateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema)])
}).strict();
export const FileUploadGrantUpdateToOneWithWhereWithoutClinicalUploadEvidenceInputObjectSchema: z.ZodType<Prisma.FileUploadGrantUpdateToOneWithWhereWithoutClinicalUploadEvidenceInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantUpdateToOneWithWhereWithoutClinicalUploadEvidenceInput>;
export const FileUploadGrantUpdateToOneWithWhereWithoutClinicalUploadEvidenceInputObjectZodSchema = makeSchema();

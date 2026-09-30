import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantUpdateWithoutClinicalUploadEvidenceInputObjectSchema as FileUploadGrantUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './FileUploadGrantUpdateWithoutClinicalUploadEvidenceInput.schema';
import { FileUploadGrantUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema as FileUploadGrantUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './FileUploadGrantUncheckedUpdateWithoutClinicalUploadEvidenceInput.schema';
import { FileUploadGrantCreateWithoutClinicalUploadEvidenceInputObjectSchema as FileUploadGrantCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './FileUploadGrantCreateWithoutClinicalUploadEvidenceInput.schema';
import { FileUploadGrantUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema as FileUploadGrantUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './FileUploadGrantUncheckedCreateWithoutClinicalUploadEvidenceInput.schema';
import { FileUploadGrantWhereInputObjectSchema as FileUploadGrantWhereInputObjectSchema } from './FileUploadGrantWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => FileUploadGrantUpdateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema)]),
  create: z.union([z.lazy(() => FileUploadGrantCreateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => FileUploadGrantUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema)]),
  where: z.lazy(() => FileUploadGrantWhereInputObjectSchema).optional()
}).strict();
export const FileUploadGrantUpsertWithoutClinicalUploadEvidenceInputObjectSchema: z.ZodType<Prisma.FileUploadGrantUpsertWithoutClinicalUploadEvidenceInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantUpsertWithoutClinicalUploadEvidenceInput>;
export const FileUploadGrantUpsertWithoutClinicalUploadEvidenceInputObjectZodSchema = makeSchema();

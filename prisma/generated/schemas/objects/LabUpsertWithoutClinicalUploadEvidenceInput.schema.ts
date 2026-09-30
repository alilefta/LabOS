import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutClinicalUploadEvidenceInputObjectSchema as LabUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './LabUpdateWithoutClinicalUploadEvidenceInput.schema';
import { LabUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema as LabUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './LabUncheckedUpdateWithoutClinicalUploadEvidenceInput.schema';
import { LabCreateWithoutClinicalUploadEvidenceInputObjectSchema as LabCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './LabCreateWithoutClinicalUploadEvidenceInput.schema';
import { LabUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema as LabUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './LabUncheckedCreateWithoutClinicalUploadEvidenceInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutClinicalUploadEvidenceInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutClinicalUploadEvidenceInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutClinicalUploadEvidenceInput>;
export const LabUpsertWithoutClinicalUploadEvidenceInputObjectZodSchema = makeSchema();

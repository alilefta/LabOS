import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutClinicalUploadEvidenceInputObjectSchema as LabUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './LabUpdateWithoutClinicalUploadEvidenceInput.schema';
import { LabUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema as LabUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './LabUncheckedUpdateWithoutClinicalUploadEvidenceInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutClinicalUploadEvidenceInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutClinicalUploadEvidenceInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutClinicalUploadEvidenceInput>;
export const LabUpdateToOneWithWhereWithoutClinicalUploadEvidenceInputObjectZodSchema = makeSchema();

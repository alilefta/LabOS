import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutClinicalUploadEvidenceInputObjectSchema as LabCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './LabCreateWithoutClinicalUploadEvidenceInput.schema';
import { LabUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema as LabUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './LabUncheckedCreateWithoutClinicalUploadEvidenceInput.schema';
import { LabCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema as LabCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema } from './LabCreateOrConnectWithoutClinicalUploadEvidenceInput.schema';
import { LabUpsertWithoutClinicalUploadEvidenceInputObjectSchema as LabUpsertWithoutClinicalUploadEvidenceInputObjectSchema } from './LabUpsertWithoutClinicalUploadEvidenceInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutClinicalUploadEvidenceInputObjectSchema as LabUpdateToOneWithWhereWithoutClinicalUploadEvidenceInputObjectSchema } from './LabUpdateToOneWithWhereWithoutClinicalUploadEvidenceInput.schema';
import { LabUpdateWithoutClinicalUploadEvidenceInputObjectSchema as LabUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './LabUpdateWithoutClinicalUploadEvidenceInput.schema';
import { LabUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema as LabUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './LabUncheckedUpdateWithoutClinicalUploadEvidenceInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutClinicalUploadEvidenceInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => LabUpdateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutClinicalUploadEvidenceNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutClinicalUploadEvidenceNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutClinicalUploadEvidenceNestedInput>;
export const LabUpdateOneRequiredWithoutClinicalUploadEvidenceNestedInputObjectZodSchema = makeSchema();

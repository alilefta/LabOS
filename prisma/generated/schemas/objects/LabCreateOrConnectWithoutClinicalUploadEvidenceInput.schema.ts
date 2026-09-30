import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutClinicalUploadEvidenceInputObjectSchema as LabCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './LabCreateWithoutClinicalUploadEvidenceInput.schema';
import { LabUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema as LabUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './LabUncheckedCreateWithoutClinicalUploadEvidenceInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutClinicalUploadEvidenceInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutClinicalUploadEvidenceInput>;
export const LabCreateOrConnectWithoutClinicalUploadEvidenceInputObjectZodSchema = makeSchema();

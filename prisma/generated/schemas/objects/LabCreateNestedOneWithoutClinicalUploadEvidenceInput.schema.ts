import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutClinicalUploadEvidenceInputObjectSchema as LabCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './LabCreateWithoutClinicalUploadEvidenceInput.schema';
import { LabUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema as LabUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './LabUncheckedCreateWithoutClinicalUploadEvidenceInput.schema';
import { LabCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema as LabCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema } from './LabCreateOrConnectWithoutClinicalUploadEvidenceInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutClinicalUploadEvidenceInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutClinicalUploadEvidenceInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutClinicalUploadEvidenceInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutClinicalUploadEvidenceInput>;
export const LabCreateNestedOneWithoutClinicalUploadEvidenceInputObjectZodSchema = makeSchema();

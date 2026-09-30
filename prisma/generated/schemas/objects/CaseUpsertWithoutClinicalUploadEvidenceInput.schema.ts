import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseUpdateWithoutClinicalUploadEvidenceInputObjectSchema as CaseUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './CaseUpdateWithoutClinicalUploadEvidenceInput.schema';
import { CaseUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema as CaseUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './CaseUncheckedUpdateWithoutClinicalUploadEvidenceInput.schema';
import { CaseCreateWithoutClinicalUploadEvidenceInputObjectSchema as CaseCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './CaseCreateWithoutClinicalUploadEvidenceInput.schema';
import { CaseUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema as CaseUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema } from './CaseUncheckedCreateWithoutClinicalUploadEvidenceInput.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CaseUpdateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseCreateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema)]),
  where: z.lazy(() => CaseWhereInputObjectSchema).optional()
}).strict();
export const CaseUpsertWithoutClinicalUploadEvidenceInputObjectSchema: z.ZodType<Prisma.CaseUpsertWithoutClinicalUploadEvidenceInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpsertWithoutClinicalUploadEvidenceInput>;
export const CaseUpsertWithoutClinicalUploadEvidenceInputObjectZodSchema = makeSchema();

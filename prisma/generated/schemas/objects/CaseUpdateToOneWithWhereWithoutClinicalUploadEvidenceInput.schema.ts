import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema';
import { CaseUpdateWithoutClinicalUploadEvidenceInputObjectSchema as CaseUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './CaseUpdateWithoutClinicalUploadEvidenceInput.schema';
import { CaseUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema as CaseUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema } from './CaseUncheckedUpdateWithoutClinicalUploadEvidenceInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CaseUpdateWithoutClinicalUploadEvidenceInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutClinicalUploadEvidenceInputObjectSchema)])
}).strict();
export const CaseUpdateToOneWithWhereWithoutClinicalUploadEvidenceInputObjectSchema: z.ZodType<Prisma.CaseUpdateToOneWithWhereWithoutClinicalUploadEvidenceInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateToOneWithWhereWithoutClinicalUploadEvidenceInput>;
export const CaseUpdateToOneWithWhereWithoutClinicalUploadEvidenceInputObjectZodSchema = makeSchema();

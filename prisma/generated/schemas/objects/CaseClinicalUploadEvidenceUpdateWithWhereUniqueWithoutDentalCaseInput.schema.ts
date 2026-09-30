import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema as CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema } from './CaseClinicalUploadEvidenceWhereUniqueInput.schema';
import { CaseClinicalUploadEvidenceUpdateWithoutDentalCaseInputObjectSchema as CaseClinicalUploadEvidenceUpdateWithoutDentalCaseInputObjectSchema } from './CaseClinicalUploadEvidenceUpdateWithoutDentalCaseInput.schema';
import { CaseClinicalUploadEvidenceUncheckedUpdateWithoutDentalCaseInputObjectSchema as CaseClinicalUploadEvidenceUncheckedUpdateWithoutDentalCaseInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedUpdateWithoutDentalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseClinicalUploadEvidenceUpdateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedUpdateWithoutDentalCaseInputObjectSchema)])
}).strict();
export const CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutDentalCaseInput>;
export const CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutDentalCaseInputObjectZodSchema = makeSchema();

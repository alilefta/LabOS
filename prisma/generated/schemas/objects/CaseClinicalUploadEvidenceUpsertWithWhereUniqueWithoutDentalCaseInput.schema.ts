import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema as CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema } from './CaseClinicalUploadEvidenceWhereUniqueInput.schema';
import { CaseClinicalUploadEvidenceUpdateWithoutDentalCaseInputObjectSchema as CaseClinicalUploadEvidenceUpdateWithoutDentalCaseInputObjectSchema } from './CaseClinicalUploadEvidenceUpdateWithoutDentalCaseInput.schema';
import { CaseClinicalUploadEvidenceUncheckedUpdateWithoutDentalCaseInputObjectSchema as CaseClinicalUploadEvidenceUncheckedUpdateWithoutDentalCaseInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedUpdateWithoutDentalCaseInput.schema';
import { CaseClinicalUploadEvidenceCreateWithoutDentalCaseInputObjectSchema as CaseClinicalUploadEvidenceCreateWithoutDentalCaseInputObjectSchema } from './CaseClinicalUploadEvidenceCreateWithoutDentalCaseInput.schema';
import { CaseClinicalUploadEvidenceUncheckedCreateWithoutDentalCaseInputObjectSchema as CaseClinicalUploadEvidenceUncheckedCreateWithoutDentalCaseInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedCreateWithoutDentalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseClinicalUploadEvidenceUpdateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedUpdateWithoutDentalCaseInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedCreateWithoutDentalCaseInputObjectSchema)])
}).strict();
export const CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutDentalCaseInput>;
export const CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutDentalCaseInputObjectZodSchema = makeSchema();

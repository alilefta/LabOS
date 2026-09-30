import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema as CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema } from './CaseClinicalUploadEvidenceWhereUniqueInput.schema';
import { CaseClinicalUploadEvidenceCreateWithoutDentalCaseInputObjectSchema as CaseClinicalUploadEvidenceCreateWithoutDentalCaseInputObjectSchema } from './CaseClinicalUploadEvidenceCreateWithoutDentalCaseInput.schema';
import { CaseClinicalUploadEvidenceUncheckedCreateWithoutDentalCaseInputObjectSchema as CaseClinicalUploadEvidenceUncheckedCreateWithoutDentalCaseInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedCreateWithoutDentalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedCreateWithoutDentalCaseInputObjectSchema)])
}).strict();
export const CaseClinicalUploadEvidenceCreateOrConnectWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateOrConnectWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateOrConnectWithoutDentalCaseInput>;
export const CaseClinicalUploadEvidenceCreateOrConnectWithoutDentalCaseInputObjectZodSchema = makeSchema();

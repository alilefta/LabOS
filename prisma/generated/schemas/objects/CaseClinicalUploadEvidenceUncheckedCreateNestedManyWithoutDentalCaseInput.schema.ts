import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceCreateWithoutDentalCaseInputObjectSchema as CaseClinicalUploadEvidenceCreateWithoutDentalCaseInputObjectSchema } from './CaseClinicalUploadEvidenceCreateWithoutDentalCaseInput.schema';
import { CaseClinicalUploadEvidenceUncheckedCreateWithoutDentalCaseInputObjectSchema as CaseClinicalUploadEvidenceUncheckedCreateWithoutDentalCaseInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedCreateWithoutDentalCaseInput.schema';
import { CaseClinicalUploadEvidenceCreateOrConnectWithoutDentalCaseInputObjectSchema as CaseClinicalUploadEvidenceCreateOrConnectWithoutDentalCaseInputObjectSchema } from './CaseClinicalUploadEvidenceCreateOrConnectWithoutDentalCaseInput.schema';
import { CaseClinicalUploadEvidenceCreateManyDentalCaseInputEnvelopeObjectSchema as CaseClinicalUploadEvidenceCreateManyDentalCaseInputEnvelopeObjectSchema } from './CaseClinicalUploadEvidenceCreateManyDentalCaseInputEnvelope.schema';
import { CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema as CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema } from './CaseClinicalUploadEvidenceWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceCreateWithoutDentalCaseInputObjectSchema).array(), z.lazy(() => CaseClinicalUploadEvidenceUncheckedCreateWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedCreateWithoutDentalCaseInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateOrConnectWithoutDentalCaseInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceCreateOrConnectWithoutDentalCaseInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseClinicalUploadEvidenceCreateManyDentalCaseInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseClinicalUploadEvidenceUncheckedCreateNestedManyWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUncheckedCreateNestedManyWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUncheckedCreateNestedManyWithoutDentalCaseInput>;
export const CaseClinicalUploadEvidenceUncheckedCreateNestedManyWithoutDentalCaseInputObjectZodSchema = makeSchema();

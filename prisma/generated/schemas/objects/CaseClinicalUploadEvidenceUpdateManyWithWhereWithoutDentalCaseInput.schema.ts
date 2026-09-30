import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceScalarWhereInputObjectSchema as CaseClinicalUploadEvidenceScalarWhereInputObjectSchema } from './CaseClinicalUploadEvidenceScalarWhereInput.schema';
import { CaseClinicalUploadEvidenceUpdateManyMutationInputObjectSchema as CaseClinicalUploadEvidenceUpdateManyMutationInputObjectSchema } from './CaseClinicalUploadEvidenceUpdateManyMutationInput.schema';
import { CaseClinicalUploadEvidenceUncheckedUpdateManyWithoutDentalCaseInputObjectSchema as CaseClinicalUploadEvidenceUncheckedUpdateManyWithoutDentalCaseInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedUpdateManyWithoutDentalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseClinicalUploadEvidenceScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseClinicalUploadEvidenceUpdateManyMutationInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedUpdateManyWithoutDentalCaseInputObjectSchema)])
}).strict();
export const CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutDentalCaseInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutDentalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutDentalCaseInput>;
export const CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutDentalCaseInputObjectZodSchema = makeSchema();

import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceScalarWhereInputObjectSchema as CaseClinicalUploadEvidenceScalarWhereInputObjectSchema } from './CaseClinicalUploadEvidenceScalarWhereInput.schema';
import { CaseClinicalUploadEvidenceUpdateManyMutationInputObjectSchema as CaseClinicalUploadEvidenceUpdateManyMutationInputObjectSchema } from './CaseClinicalUploadEvidenceUpdateManyMutationInput.schema';
import { CaseClinicalUploadEvidenceUncheckedUpdateManyWithoutOrganizationInputObjectSchema as CaseClinicalUploadEvidenceUncheckedUpdateManyWithoutOrganizationInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedUpdateManyWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseClinicalUploadEvidenceScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseClinicalUploadEvidenceUpdateManyMutationInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedUpdateManyWithoutOrganizationInputObjectSchema)])
}).strict();
export const CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutOrganizationInput>;
export const CaseClinicalUploadEvidenceUpdateManyWithWhereWithoutOrganizationInputObjectZodSchema = makeSchema();

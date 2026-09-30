import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema as CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema } from './CaseClinicalUploadEvidenceWhereUniqueInput.schema';
import { CaseClinicalUploadEvidenceUpdateWithoutOrganizationInputObjectSchema as CaseClinicalUploadEvidenceUpdateWithoutOrganizationInputObjectSchema } from './CaseClinicalUploadEvidenceUpdateWithoutOrganizationInput.schema';
import { CaseClinicalUploadEvidenceUncheckedUpdateWithoutOrganizationInputObjectSchema as CaseClinicalUploadEvidenceUncheckedUpdateWithoutOrganizationInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedUpdateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseClinicalUploadEvidenceUpdateWithoutOrganizationInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedUpdateWithoutOrganizationInputObjectSchema)])
}).strict();
export const CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutOrganizationInput>;
export const CaseClinicalUploadEvidenceUpdateWithWhereUniqueWithoutOrganizationInputObjectZodSchema = makeSchema();

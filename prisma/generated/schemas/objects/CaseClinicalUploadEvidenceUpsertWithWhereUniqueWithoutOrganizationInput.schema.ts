import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema as CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema } from './CaseClinicalUploadEvidenceWhereUniqueInput.schema';
import { CaseClinicalUploadEvidenceUpdateWithoutOrganizationInputObjectSchema as CaseClinicalUploadEvidenceUpdateWithoutOrganizationInputObjectSchema } from './CaseClinicalUploadEvidenceUpdateWithoutOrganizationInput.schema';
import { CaseClinicalUploadEvidenceUncheckedUpdateWithoutOrganizationInputObjectSchema as CaseClinicalUploadEvidenceUncheckedUpdateWithoutOrganizationInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedUpdateWithoutOrganizationInput.schema';
import { CaseClinicalUploadEvidenceCreateWithoutOrganizationInputObjectSchema as CaseClinicalUploadEvidenceCreateWithoutOrganizationInputObjectSchema } from './CaseClinicalUploadEvidenceCreateWithoutOrganizationInput.schema';
import { CaseClinicalUploadEvidenceUncheckedCreateWithoutOrganizationInputObjectSchema as CaseClinicalUploadEvidenceUncheckedCreateWithoutOrganizationInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedCreateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseClinicalUploadEvidenceUpdateWithoutOrganizationInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedUpdateWithoutOrganizationInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateWithoutOrganizationInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedCreateWithoutOrganizationInputObjectSchema)])
}).strict();
export const CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutOrganizationInput>;
export const CaseClinicalUploadEvidenceUpsertWithWhereUniqueWithoutOrganizationInputObjectZodSchema = makeSchema();

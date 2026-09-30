import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema as CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema } from './CaseClinicalUploadEvidenceWhereUniqueInput.schema';
import { CaseClinicalUploadEvidenceCreateWithoutOrganizationInputObjectSchema as CaseClinicalUploadEvidenceCreateWithoutOrganizationInputObjectSchema } from './CaseClinicalUploadEvidenceCreateWithoutOrganizationInput.schema';
import { CaseClinicalUploadEvidenceUncheckedCreateWithoutOrganizationInputObjectSchema as CaseClinicalUploadEvidenceUncheckedCreateWithoutOrganizationInputObjectSchema } from './CaseClinicalUploadEvidenceUncheckedCreateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseClinicalUploadEvidenceCreateWithoutOrganizationInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceUncheckedCreateWithoutOrganizationInputObjectSchema)])
}).strict();
export const CaseClinicalUploadEvidenceCreateOrConnectWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateOrConnectWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateOrConnectWithoutOrganizationInput>;
export const CaseClinicalUploadEvidenceCreateOrConnectWithoutOrganizationInputObjectZodSchema = makeSchema();

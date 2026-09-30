import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalUploadEvidenceProviderProviderObjectKeyCompoundUniqueInputObjectSchema as CaseClinicalUploadEvidenceProviderProviderObjectKeyCompoundUniqueInputObjectSchema } from './CaseClinicalUploadEvidenceProviderProviderObjectKeyCompoundUniqueInput.schema';
import { CaseClinicalUploadEvidenceUploadGrantIdOrganizationIdLabIdProviderProviderObjectKeyCompoundUniqueInputObjectSchema as CaseClinicalUploadEvidenceUploadGrantIdOrganizationIdLabIdProviderProviderObjectKeyCompoundUniqueInputObjectSchema } from './CaseClinicalUploadEvidenceUploadGrantIdOrganizationIdLabIdProviderProviderObjectKeyCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  uploadGrantId: z.string().optional(),
  provider_providerObjectKey: z.lazy(() => CaseClinicalUploadEvidenceProviderProviderObjectKeyCompoundUniqueInputObjectSchema).optional(),
  uploadGrantId_organizationId_labId_provider_providerObjectKey: z.lazy(() => CaseClinicalUploadEvidenceUploadGrantIdOrganizationIdLabIdProviderProviderObjectKeyCompoundUniqueInputObjectSchema).optional()
}).strict();
export const CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceWhereUniqueInput>;
export const CaseClinicalUploadEvidenceWhereUniqueInputObjectZodSchema = makeSchema();

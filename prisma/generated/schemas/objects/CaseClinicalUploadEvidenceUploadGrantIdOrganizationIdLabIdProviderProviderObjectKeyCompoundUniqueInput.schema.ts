import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema'

const makeSchema = () => z.object({
  uploadGrantId: z.string(),
  organizationId: z.string(),
  labId: z.string(),
  provider: StoredFileProviderSchema,
  providerObjectKey: z.string()
}).strict();
export const CaseClinicalUploadEvidenceUploadGrantIdOrganizationIdLabIdProviderProviderObjectKeyCompoundUniqueInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUploadGrantIdOrganizationIdLabIdProviderProviderObjectKeyCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUploadGrantIdOrganizationIdLabIdProviderProviderObjectKeyCompoundUniqueInput>;
export const CaseClinicalUploadEvidenceUploadGrantIdOrganizationIdLabIdProviderProviderObjectKeyCompoundUniqueInputObjectZodSchema = makeSchema();

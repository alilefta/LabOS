import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema'

const makeSchema = () => z.object({
  provider: StoredFileProviderSchema,
  providerObjectKey: z.string()
}).strict();
export const CaseClinicalUploadEvidenceProviderProviderObjectKeyCompoundUniqueInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceProviderProviderObjectKeyCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceProviderProviderObjectKeyCompoundUniqueInput>;
export const CaseClinicalUploadEvidenceProviderProviderObjectKeyCompoundUniqueInputObjectZodSchema = makeSchema();

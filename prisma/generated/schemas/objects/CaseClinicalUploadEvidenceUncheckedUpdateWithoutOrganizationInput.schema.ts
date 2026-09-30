import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { EnumStoredFileProviderFieldUpdateOperationsInputObjectSchema as EnumStoredFileProviderFieldUpdateOperationsInputObjectSchema } from './EnumStoredFileProviderFieldUpdateOperationsInput.schema';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema';
import { EnumCaseClinicalPurposeFieldUpdateOperationsInputObjectSchema as EnumCaseClinicalPurposeFieldUpdateOperationsInputObjectSchema } from './EnumCaseClinicalPurposeFieldUpdateOperationsInput.schema';
import { CaseClinicalVerifiedFormatSchema } from '../enums/CaseClinicalVerifiedFormat.schema';
import { EnumCaseClinicalVerifiedFormatFieldUpdateOperationsInputObjectSchema as EnumCaseClinicalVerifiedFormatFieldUpdateOperationsInputObjectSchema } from './EnumCaseClinicalVerifiedFormatFieldUpdateOperationsInput.schema';
import { CaseClinicalValidatedSuffixSchema } from '../enums/CaseClinicalValidatedSuffix.schema';
import { EnumCaseClinicalValidatedSuffixFieldUpdateOperationsInputObjectSchema as EnumCaseClinicalValidatedSuffixFieldUpdateOperationsInputObjectSchema } from './EnumCaseClinicalValidatedSuffixFieldUpdateOperationsInput.schema';
import { BigIntFieldUpdateOperationsInputObjectSchema as BigIntFieldUpdateOperationsInputObjectSchema } from './BigIntFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  uploadGrantId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  labId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  caseId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  provider: z.union([StoredFileProviderSchema, z.lazy(() => EnumStoredFileProviderFieldUpdateOperationsInputObjectSchema)]).optional(),
  providerObjectKey: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  clinicalPurpose: z.union([CaseClinicalPurposeSchema, z.lazy(() => EnumCaseClinicalPurposeFieldUpdateOperationsInputObjectSchema)]).optional(),
  verifiedFormat: z.union([CaseClinicalVerifiedFormatSchema, z.lazy(() => EnumCaseClinicalVerifiedFormatFieldUpdateOperationsInputObjectSchema)]).optional(),
  validatedSuffix: z.union([CaseClinicalValidatedSuffixSchema, z.lazy(() => EnumCaseClinicalValidatedSuffixFieldUpdateOperationsInputObjectSchema)]).optional(),
  measuredSizeBytes: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputObjectSchema)]).optional(),
  width: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  height: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  contentSha256: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  validationProfile: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  validatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const CaseClinicalUploadEvidenceUncheckedUpdateWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUncheckedUpdateWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUncheckedUpdateWithoutOrganizationInput>;
export const CaseClinicalUploadEvidenceUncheckedUpdateWithoutOrganizationInputObjectZodSchema = makeSchema();

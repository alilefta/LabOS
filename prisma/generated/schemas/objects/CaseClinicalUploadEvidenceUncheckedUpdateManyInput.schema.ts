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
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { CaseClinicalCodecBackendSchema } from '../enums/CaseClinicalCodecBackend.schema';
import { NullableEnumCaseClinicalCodecBackendFieldUpdateOperationsInputObjectSchema as NullableEnumCaseClinicalCodecBackendFieldUpdateOperationsInputObjectSchema } from './NullableEnumCaseClinicalCodecBackendFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema as NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { NullableBoolFieldUpdateOperationsInputObjectSchema as NullableBoolFieldUpdateOperationsInputObjectSchema } from './NullableBoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  uploadGrantId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  organizationId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
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
  contentSha256: z.union([z.string().max(64), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  validationProfile: z.union([z.string().max(64), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  validatorVersion: z.union([z.string().max(48), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  codecBackend: z.union([CaseClinicalCodecBackendSchema, z.lazy(() => NullableEnumCaseClinicalCodecBackendFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  codecPackageVersion: z.union([z.string().max(24), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  codecLibraryVersion: z.union([z.string().max(24), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  codecRuntimeSha256: z.union([z.string().max(64), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  sourceComponents: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  isProgressive: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  validatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const CaseClinicalUploadEvidenceUncheckedUpdateManyInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceUncheckedUpdateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceUncheckedUpdateManyInput>;
export const CaseClinicalUploadEvidenceUncheckedUpdateManyInputObjectZodSchema = makeSchema();

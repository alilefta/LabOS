import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { EnumStoredFileProviderFieldUpdateOperationsInputObjectSchema as EnumStoredFileProviderFieldUpdateOperationsInputObjectSchema } from './EnumStoredFileProviderFieldUpdateOperationsInput.schema';
import { StoredFilePurposeSchema } from '../enums/StoredFilePurpose.schema';
import { EnumStoredFilePurposeFieldUpdateOperationsInputObjectSchema as EnumStoredFilePurposeFieldUpdateOperationsInputObjectSchema } from './EnumStoredFilePurposeFieldUpdateOperationsInput.schema';
import { BigIntFieldUpdateOperationsInputObjectSchema as BigIntFieldUpdateOperationsInputObjectSchema } from './BigIntFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CaseAssetFileVersionUncheckedUpdateOneWithoutStoredFileNestedInputObjectSchema as CaseAssetFileVersionUncheckedUpdateOneWithoutStoredFileNestedInputObjectSchema } from './CaseAssetFileVersionUncheckedUpdateOneWithoutStoredFileNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  organizationId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  labId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  sourceUploadGrantId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  provider: z.union([StoredFileProviderSchema, z.lazy(() => EnumStoredFileProviderFieldUpdateOperationsInputObjectSchema)]).optional(),
  providerObjectKey: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  purpose: z.union([StoredFilePurposeSchema, z.lazy(() => EnumStoredFilePurposeFieldUpdateOperationsInputObjectSchema)]).optional(),
  detectedMimeType: z.union([z.string().max(255), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  sizeBytes: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputObjectSchema)]).optional(),
  checksumAlgorithm: z.union([z.string().max(32), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  checksumValue: z.union([z.string().max(256), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  uploaderMemberId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  uploaderMemberIdSnapshot: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  caseVersion: z.lazy(() => CaseAssetFileVersionUncheckedUpdateOneWithoutStoredFileNestedInputObjectSchema).optional()
}).strict();
export const StoredFileUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.StoredFileUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUncheckedUpdateInput>;
export const StoredFileUncheckedUpdateInputObjectZodSchema = makeSchema();

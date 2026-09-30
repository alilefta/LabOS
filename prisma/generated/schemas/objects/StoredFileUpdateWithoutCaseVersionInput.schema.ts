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
import { OrganizationUpdateOneRequiredWithoutStoredFilesNestedInputObjectSchema as OrganizationUpdateOneRequiredWithoutStoredFilesNestedInputObjectSchema } from './OrganizationUpdateOneRequiredWithoutStoredFilesNestedInput.schema';
import { LabUpdateOneRequiredWithoutStoredFilesNestedInputObjectSchema as LabUpdateOneRequiredWithoutStoredFilesNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutStoredFilesNestedInput.schema';
import { FileUploadGrantUpdateOneRequiredWithoutStoredFileNestedInputObjectSchema as FileUploadGrantUpdateOneRequiredWithoutStoredFileNestedInputObjectSchema } from './FileUploadGrantUpdateOneRequiredWithoutStoredFileNestedInput.schema';
import { MemberUpdateOneWithoutUploadedStoredFilesNestedInputObjectSchema as MemberUpdateOneWithoutUploadedStoredFilesNestedInputObjectSchema } from './MemberUpdateOneWithoutUploadedStoredFilesNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  provider: z.union([StoredFileProviderSchema, z.lazy(() => EnumStoredFileProviderFieldUpdateOperationsInputObjectSchema)]).optional(),
  providerObjectKey: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  purpose: z.union([StoredFilePurposeSchema, z.lazy(() => EnumStoredFilePurposeFieldUpdateOperationsInputObjectSchema)]).optional(),
  detectedMimeType: z.union([z.string().max(255), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  sizeBytes: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputObjectSchema)]).optional(),
  checksumAlgorithm: z.union([z.string().max(32), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  checksumValue: z.union([z.string().max(256), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  uploaderMemberIdSnapshot: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutStoredFilesNestedInputObjectSchema).optional(),
  lab: z.lazy(() => LabUpdateOneRequiredWithoutStoredFilesNestedInputObjectSchema).optional(),
  sourceGrant: z.lazy(() => FileUploadGrantUpdateOneRequiredWithoutStoredFileNestedInputObjectSchema).optional(),
  uploaderMember: z.lazy(() => MemberUpdateOneWithoutUploadedStoredFilesNestedInputObjectSchema).optional()
}).strict();
export const StoredFileUpdateWithoutCaseVersionInputObjectSchema: z.ZodType<Prisma.StoredFileUpdateWithoutCaseVersionInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUpdateWithoutCaseVersionInput>;
export const StoredFileUpdateWithoutCaseVersionInputObjectZodSchema = makeSchema();

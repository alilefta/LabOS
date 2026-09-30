import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { FileUploadGrantStatusSchema } from '../enums/FileUploadGrantStatus.schema';
import { EnumFileUploadGrantStatusFieldUpdateOperationsInputObjectSchema as EnumFileUploadGrantStatusFieldUpdateOperationsInputObjectSchema } from './EnumFileUploadGrantStatusFieldUpdateOperationsInput.schema';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { NullableEnumStoredFileProviderFieldUpdateOperationsInputObjectSchema as NullableEnumStoredFileProviderFieldUpdateOperationsInputObjectSchema } from './NullableEnumStoredFileProviderFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { OrganizationUpdateOneRequiredWithoutFileUploadGrantsNestedInputObjectSchema as OrganizationUpdateOneRequiredWithoutFileUploadGrantsNestedInputObjectSchema } from './OrganizationUpdateOneRequiredWithoutFileUploadGrantsNestedInput.schema';
import { LabUpdateOneRequiredWithoutFileUploadGrantsNestedInputObjectSchema as LabUpdateOneRequiredWithoutFileUploadGrantsNestedInputObjectSchema } from './LabUpdateOneRequiredWithoutFileUploadGrantsNestedInput.schema';
import { MemberUpdateOneWithoutFileUploadGrantsNestedInputObjectSchema as MemberUpdateOneWithoutFileUploadGrantsNestedInputObjectSchema } from './MemberUpdateOneWithoutFileUploadGrantsNestedInput.schema';
import { StoredFileUpdateOneWithoutSourceGrantNestedInputObjectSchema as StoredFileUpdateOneWithoutSourceGrantNestedInputObjectSchema } from './StoredFileUpdateOneWithoutSourceGrantNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  boundaryId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  purpose: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  targetType: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  targetId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  status: z.union([FileUploadGrantStatusSchema, z.lazy(() => EnumFileUploadGrantStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  provider: z.union([StoredFileProviderSchema, z.lazy(() => NullableEnumStoredFileProviderFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  providerFileKey: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  providerFileUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  correlationId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  uploadedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  consumedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  expiredAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  failedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  failureCode: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  providerDeletedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  cleanupAttemptCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  lastCleanupAttemptAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  cleanupFailureCode: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutFileUploadGrantsNestedInputObjectSchema).optional(),
  lab: z.lazy(() => LabUpdateOneRequiredWithoutFileUploadGrantsNestedInputObjectSchema).optional(),
  createdByMember: z.lazy(() => MemberUpdateOneWithoutFileUploadGrantsNestedInputObjectSchema).optional(),
  storedFile: z.lazy(() => StoredFileUpdateOneWithoutSourceGrantNestedInputObjectSchema).optional()
}).strict();
export const FileUploadGrantUpdateWithoutClinicalUploadEvidenceInputObjectSchema: z.ZodType<Prisma.FileUploadGrantUpdateWithoutClinicalUploadEvidenceInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantUpdateWithoutClinicalUploadEvidenceInput>;
export const FileUploadGrantUpdateWithoutClinicalUploadEvidenceInputObjectZodSchema = makeSchema();

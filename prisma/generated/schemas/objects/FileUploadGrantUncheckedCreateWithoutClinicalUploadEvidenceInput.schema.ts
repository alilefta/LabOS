import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FileUploadGrantStatusSchema } from '../enums/FileUploadGrantStatus.schema';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { StoredFileUncheckedCreateNestedOneWithoutSourceGrantInputObjectSchema as StoredFileUncheckedCreateNestedOneWithoutSourceGrantInputObjectSchema } from './StoredFileUncheckedCreateNestedOneWithoutSourceGrantInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  organizationId: z.string(),
  labId: z.string(),
  createdByMemberId: z.string().optional().nullable(),
  boundaryId: z.string(),
  purpose: z.string(),
  targetType: z.string().optional().nullable(),
  targetId: z.string().optional().nullable(),
  status: FileUploadGrantStatusSchema.optional(),
  provider: StoredFileProviderSchema.optional().nullable(),
  providerFileKey: z.string().optional().nullable(),
  providerFileUrl: z.string().optional().nullable(),
  correlationId: z.string(),
  expiresAt: z.coerce.date(),
  uploadedAt: z.coerce.date().optional().nullable(),
  consumedAt: z.coerce.date().optional().nullable(),
  expiredAt: z.coerce.date().optional().nullable(),
  failedAt: z.coerce.date().optional().nullable(),
  failureCode: z.string().optional().nullable(),
  providerDeletedAt: z.coerce.date().optional().nullable(),
  cleanupAttemptCount: z.number().int().optional(),
  lastCleanupAttemptAt: z.coerce.date().optional().nullable(),
  cleanupFailureCode: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  storedFile: z.lazy(() => StoredFileUncheckedCreateNestedOneWithoutSourceGrantInputObjectSchema).optional()
}).strict();
export const FileUploadGrantUncheckedCreateWithoutClinicalUploadEvidenceInputObjectSchema: z.ZodType<Prisma.FileUploadGrantUncheckedCreateWithoutClinicalUploadEvidenceInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantUncheckedCreateWithoutClinicalUploadEvidenceInput>;
export const FileUploadGrantUncheckedCreateWithoutClinicalUploadEvidenceInputObjectZodSchema = makeSchema();

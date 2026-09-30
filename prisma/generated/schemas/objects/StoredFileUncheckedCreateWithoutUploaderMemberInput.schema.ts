import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { StoredFilePurposeSchema } from '../enums/StoredFilePurpose.schema';
import { CaseAssetFileVersionUncheckedCreateNestedOneWithoutStoredFileInputObjectSchema as CaseAssetFileVersionUncheckedCreateNestedOneWithoutStoredFileInputObjectSchema } from './CaseAssetFileVersionUncheckedCreateNestedOneWithoutStoredFileInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  organizationId: z.string(),
  labId: z.string(),
  sourceUploadGrantId: z.string(),
  provider: StoredFileProviderSchema,
  providerObjectKey: z.string(),
  purpose: StoredFilePurposeSchema,
  detectedMimeType: z.string(),
  sizeBytes: z.bigint(),
  checksumAlgorithm: z.string().optional().nullable(),
  checksumValue: z.string().optional().nullable(),
  uploaderMemberIdSnapshot: z.string(),
  createdAt: z.coerce.date().optional(),
  caseVersion: z.lazy(() => CaseAssetFileVersionUncheckedCreateNestedOneWithoutStoredFileInputObjectSchema).optional()
}).strict();
export const StoredFileUncheckedCreateWithoutUploaderMemberInputObjectSchema: z.ZodType<Prisma.StoredFileUncheckedCreateWithoutUploaderMemberInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUncheckedCreateWithoutUploaderMemberInput>;
export const StoredFileUncheckedCreateWithoutUploaderMemberInputObjectZodSchema = makeSchema();

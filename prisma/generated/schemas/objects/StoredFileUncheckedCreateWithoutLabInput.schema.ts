import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { StoredFilePurposeSchema } from '../enums/StoredFilePurpose.schema';
import { CaseAssetFileVersionUncheckedCreateNestedOneWithoutStoredFileInputObjectSchema as CaseAssetFileVersionUncheckedCreateNestedOneWithoutStoredFileInputObjectSchema } from './CaseAssetFileVersionUncheckedCreateNestedOneWithoutStoredFileInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  sourceUploadGrantId: z.string(),
  provider: StoredFileProviderSchema,
  providerObjectKey: z.string(),
  purpose: StoredFilePurposeSchema,
  detectedMimeType: z.string(),
  sizeBytes: z.bigint(),
  checksumAlgorithm: z.string().optional().nullable(),
  checksumValue: z.string().optional().nullable(),
  uploaderMemberId: z.string().optional().nullable(),
  uploaderMemberIdSnapshot: z.string(),
  createdAt: z.coerce.date().optional(),
  caseVersion: z.lazy(() => CaseAssetFileVersionUncheckedCreateNestedOneWithoutStoredFileInputObjectSchema).optional()
}).strict();
export const StoredFileUncheckedCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.StoredFileUncheckedCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUncheckedCreateWithoutLabInput>;
export const StoredFileUncheckedCreateWithoutLabInputObjectZodSchema = makeSchema();

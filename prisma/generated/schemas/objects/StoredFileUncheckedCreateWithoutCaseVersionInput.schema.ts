import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { StoredFilePurposeSchema } from '../enums/StoredFilePurpose.schema'

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
  uploaderMemberId: z.string().optional().nullable(),
  uploaderMemberIdSnapshot: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();
export const StoredFileUncheckedCreateWithoutCaseVersionInputObjectSchema: z.ZodType<Prisma.StoredFileUncheckedCreateWithoutCaseVersionInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileUncheckedCreateWithoutCaseVersionInput>;
export const StoredFileUncheckedCreateWithoutCaseVersionInputObjectZodSchema = makeSchema();

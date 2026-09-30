import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { StoredFilePurposeSchema } from '../enums/StoredFilePurpose.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  labId: z.string(),
  sourceUploadGrantId: z.string(),
  provider: StoredFileProviderSchema,
  providerObjectKey: z.string(),
  purpose: StoredFilePurposeSchema,
  detectedMimeType: z.string().max(255),
  sizeBytes: z.bigint(),
  checksumAlgorithm: z.string().max(32).optional().nullable(),
  checksumValue: z.string().max(256).optional().nullable(),
  uploaderMemberId: z.string().optional().nullable(),
  uploaderMemberIdSnapshot: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();
export const StoredFileCreateManyOrganizationInputObjectSchema: z.ZodType<Prisma.StoredFileCreateManyOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileCreateManyOrganizationInput>;
export const StoredFileCreateManyOrganizationInputObjectZodSchema = makeSchema();

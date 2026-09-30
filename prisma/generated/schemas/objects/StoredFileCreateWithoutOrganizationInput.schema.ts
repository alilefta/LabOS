import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { StoredFilePurposeSchema } from '../enums/StoredFilePurpose.schema';
import { LabCreateNestedOneWithoutStoredFilesInputObjectSchema as LabCreateNestedOneWithoutStoredFilesInputObjectSchema } from './LabCreateNestedOneWithoutStoredFilesInput.schema';
import { FileUploadGrantCreateNestedOneWithoutStoredFileInputObjectSchema as FileUploadGrantCreateNestedOneWithoutStoredFileInputObjectSchema } from './FileUploadGrantCreateNestedOneWithoutStoredFileInput.schema';
import { MemberCreateNestedOneWithoutUploadedStoredFilesInputObjectSchema as MemberCreateNestedOneWithoutUploadedStoredFilesInputObjectSchema } from './MemberCreateNestedOneWithoutUploadedStoredFilesInput.schema';
import { CaseAssetFileVersionCreateNestedOneWithoutStoredFileInputObjectSchema as CaseAssetFileVersionCreateNestedOneWithoutStoredFileInputObjectSchema } from './CaseAssetFileVersionCreateNestedOneWithoutStoredFileInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  provider: StoredFileProviderSchema,
  providerObjectKey: z.string(),
  purpose: StoredFilePurposeSchema,
  detectedMimeType: z.string().max(255),
  sizeBytes: z.bigint(),
  checksumAlgorithm: z.string().max(32).optional().nullable(),
  checksumValue: z.string().max(256).optional().nullable(),
  uploaderMemberIdSnapshot: z.string(),
  createdAt: z.coerce.date().optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutStoredFilesInputObjectSchema),
  sourceGrant: z.lazy(() => FileUploadGrantCreateNestedOneWithoutStoredFileInputObjectSchema),
  uploaderMember: z.lazy(() => MemberCreateNestedOneWithoutUploadedStoredFilesInputObjectSchema).optional(),
  caseVersion: z.lazy(() => CaseAssetFileVersionCreateNestedOneWithoutStoredFileInputObjectSchema).optional()
}).strict();
export const StoredFileCreateWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.StoredFileCreateWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileCreateWithoutOrganizationInput>;
export const StoredFileCreateWithoutOrganizationInputObjectZodSchema = makeSchema();

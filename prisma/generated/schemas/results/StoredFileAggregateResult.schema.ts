import * as z from 'zod';
export const StoredFileAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    organizationId: z.number(),
    labId: z.number(),
    sourceUploadGrantId: z.number(),
    provider: z.number(),
    providerObjectKey: z.number(),
    purpose: z.number(),
    detectedMimeType: z.number(),
    sizeBytes: z.number(),
    checksumAlgorithm: z.number(),
    checksumValue: z.number(),
    uploaderMemberId: z.number(),
    uploaderMemberIdSnapshot: z.number(),
    createdAt: z.number(),
    organization: z.number(),
    lab: z.number(),
    sourceGrant: z.number(),
    uploaderMember: z.number(),
    caseVersion: z.number()
  }).optional(),
  _sum: z.object({
    sizeBytes: z.bigint().nullable()
  }).nullable().optional(),
  _avg: z.object({
    sizeBytes: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    organizationId: z.string().nullable(),
    labId: z.string().nullable(),
    sourceUploadGrantId: z.string().nullable(),
    providerObjectKey: z.string().nullable(),
    detectedMimeType: z.string().nullable(),
    sizeBytes: z.bigint().nullable(),
    checksumAlgorithm: z.string().nullable(),
    checksumValue: z.string().nullable(),
    uploaderMemberId: z.string().nullable(),
    uploaderMemberIdSnapshot: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    organizationId: z.string().nullable(),
    labId: z.string().nullable(),
    sourceUploadGrantId: z.string().nullable(),
    providerObjectKey: z.string().nullable(),
    detectedMimeType: z.string().nullable(),
    sizeBytes: z.bigint().nullable(),
    checksumAlgorithm: z.string().nullable(),
    checksumValue: z.string().nullable(),
    uploaderMemberId: z.string().nullable(),
    uploaderMemberIdSnapshot: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()});
import * as z from 'zod';
export const CaseAssetFileVersionAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    caseAssetFileId: z.number(),
    organizationId: z.number(),
    labId: z.number(),
    storedFileId: z.number(),
    versionNumber: z.number(),
    createdByMemberId: z.number(),
    createdByMemberIdSnapshot: z.number(),
    createdAt: z.number(),
    asset: z.number(),
    storedFile: z.number(),
    createdByMember: z.number(),
    currentForAsset: z.number()
  }).optional(),
  _sum: z.object({
    versionNumber: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    versionNumber: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    caseAssetFileId: z.string().nullable(),
    organizationId: z.string().nullable(),
    labId: z.string().nullable(),
    storedFileId: z.string().nullable(),
    versionNumber: z.number().int().nullable(),
    createdByMemberId: z.string().nullable(),
    createdByMemberIdSnapshot: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    caseAssetFileId: z.string().nullable(),
    organizationId: z.string().nullable(),
    labId: z.string().nullable(),
    storedFileId: z.string().nullable(),
    versionNumber: z.number().int().nullable(),
    createdByMemberId: z.string().nullable(),
    createdByMemberIdSnapshot: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()});
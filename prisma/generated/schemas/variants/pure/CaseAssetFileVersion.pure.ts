import * as z from 'zod';
// prettier-ignore
export const CaseAssetFileVersionModelSchema = z.object({
    id: z.string(),
    caseAssetFileId: z.string(),
    organizationId: z.string(),
    labId: z.string(),
    storedFileId: z.string(),
    versionNumber: z.number().int(),
    createdByMemberId: z.string().nullable(),
    createdByMemberIdSnapshot: z.string(),
    createdAt: z.date(),
    asset: z.unknown(),
    storedFile: z.unknown(),
    createdByMember: z.unknown().nullable(),
    currentForAsset: z.unknown().nullable()
}).strict();

export type CaseAssetFileVersionPureType = z.infer<typeof CaseAssetFileVersionModelSchema>;

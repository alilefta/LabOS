import * as z from 'zod';
// prettier-ignore
export const CaseAssetFileVersionInputSchema = z.object({
    id: z.string(),
    caseAssetFileId: z.string(),
    organizationId: z.string(),
    labId: z.string(),
    storedFileId: z.string(),
    versionNumber: z.number().int(),
    createdByMemberId: z.string().optional().nullable(),
    createdByMemberIdSnapshot: z.string(),
    createdAt: z.date(),
    asset: z.unknown(),
    storedFile: z.unknown(),
    createdByMember: z.unknown().optional().nullable(),
    currentForAsset: z.unknown().optional().nullable()
}).strict();

export type CaseAssetFileVersionInputType = z.infer<typeof CaseAssetFileVersionInputSchema>;

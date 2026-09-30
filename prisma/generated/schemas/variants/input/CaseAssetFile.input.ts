import * as z from 'zod';
import { AssetFileTypeSchema } from '../../enums/AssetFileType.schema';
import { CaseAssetStorageModeSchema } from '../../enums/CaseAssetStorageMode.schema';
import { CaseClinicalPurposeSchema } from '../../enums/CaseClinicalPurpose.schema';
// prettier-ignore
export const CaseAssetFileInputSchema = z.object({
    id: z.string(),
    dentalCaseId: z.string(),
    dentalCase: z.unknown(),
    title: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    documentUrl: z.string().optional().nullable(),
    assetFileType: AssetFileTypeSchema,
    fileExtension: z.string().optional().nullable(),
    labId: z.string(),
    lab: z.unknown(),
    storageMode: CaseAssetStorageModeSchema,
    clinicalPurpose: CaseClinicalPurposeSchema.optional().nullable(),
    currentVersionId: z.string().optional().nullable(),
    versions: z.array(z.unknown()),
    currentVersion: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CaseAssetFileInputType = z.infer<typeof CaseAssetFileInputSchema>;

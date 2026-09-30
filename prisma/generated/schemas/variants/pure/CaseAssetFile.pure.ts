import * as z from 'zod';
import { AssetFileTypeSchema } from '../../enums/AssetFileType.schema';
import { CaseAssetStorageModeSchema } from '../../enums/CaseAssetStorageMode.schema';
import { CaseClinicalPurposeSchema } from '../../enums/CaseClinicalPurpose.schema';
// prettier-ignore
export const CaseAssetFileModelSchema = z.object({
    id: z.string(),
    dentalCaseId: z.string(),
    dentalCase: z.unknown(),
    title: z.string().nullable(),
    description: z.string().nullable(),
    documentUrl: z.string().nullable(),
    assetFileType: AssetFileTypeSchema,
    fileExtension: z.string().nullable(),
    labId: z.string(),
    lab: z.unknown(),
    storageMode: CaseAssetStorageModeSchema,
    clinicalPurpose: CaseClinicalPurposeSchema.nullable(),
    currentVersionId: z.string().nullable(),
    versions: z.array(z.unknown()),
    currentVersion: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CaseAssetFilePureType = z.infer<typeof CaseAssetFileModelSchema>;

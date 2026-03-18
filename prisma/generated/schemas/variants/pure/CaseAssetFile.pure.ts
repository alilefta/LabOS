import * as z from 'zod';
import { AssetFileTypeSchema } from '../../enums/AssetFileType.schema';
// prettier-ignore
export const CaseAssetFileModelSchema = z.object({
    id: z.string(),
    caseId: z.string(),
    case: z.unknown(),
    title: z.string(),
    description: z.string(),
    documentUrl: z.string(),
    assetFileType: AssetFileTypeSchema,
    labId: z.string(),
    Lab: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CaseAssetFilePureType = z.infer<typeof CaseAssetFileModelSchema>;

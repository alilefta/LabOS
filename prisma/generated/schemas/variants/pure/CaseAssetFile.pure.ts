import * as z from 'zod';
import { AssetFileTypeSchema } from '../../enums/AssetFileType.schema';
// prettier-ignore
export const CaseAssetFileModelSchema = z.object({
    id: z.string(),
    dentalCaseId: z.string(),
    dentalCase: z.unknown(),
    title: z.string().nullable(),
    description: z.string().nullable(),
    documentUrl: z.string(),
    assetFileType: AssetFileTypeSchema,
    fileExtension: z.string(),
    labId: z.string(),
    lab: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CaseAssetFilePureType = z.infer<typeof CaseAssetFileModelSchema>;

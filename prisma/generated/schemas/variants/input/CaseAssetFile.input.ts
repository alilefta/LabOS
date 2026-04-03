import * as z from 'zod';
import { AssetFileTypeSchema } from '../../enums/AssetFileType.schema';
// prettier-ignore
export const CaseAssetFileInputSchema = z.object({
    id: z.string(),
    dentalCaseId: z.string(),
    dentalCase: z.unknown(),
    title: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    documentUrl: z.string(),
    assetFileType: AssetFileTypeSchema,
    fileExtension: z.string(),
    labId: z.string(),
    lab: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CaseAssetFileInputType = z.infer<typeof CaseAssetFileInputSchema>;

import * as z from 'zod';
import { AssetFileTypeSchema } from '../../enums/AssetFileType.schema';
// prettier-ignore
export const CaseAssetFileInputSchema = z.object({
    id: z.string(),
    caseId: z.string(),
    case: z.unknown(),
    title: z.string(),
    description: z.string(),
    documentUrl: z.string(),
    assetFileType: AssetFileTypeSchema,
    labId: z.string(),
    lab: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CaseAssetFileInputType = z.infer<typeof CaseAssetFileInputSchema>;

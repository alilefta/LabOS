import * as z from 'zod';
import { AssetFileTypeSchema } from '../../enums/AssetFileType.schema';
// prettier-ignore
export const CaseAssetFileResultSchema = z.object({
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

export type CaseAssetFileResultType = z.infer<typeof CaseAssetFileResultSchema>;

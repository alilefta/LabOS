import * as z from 'zod';

export const AssetFileTypeSchema = z.enum(['IMAGE', 'VIDEO', 'SCANNERFILE'])

export type AssetFileType = z.infer<typeof AssetFileTypeSchema>;
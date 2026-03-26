import * as z from "zod";
import { AssetFileTypeSchema } from "./asset-file-type.base";
export const CaseAssetFileBaseSchema = z.object({
	id: z.string(),
	dentalCaseId: z.string(),
	title: z.string(),
	description: z.string(),
	documentUrl: z.string(),
	assetFileType: AssetFileTypeSchema,
	labId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type CaseAssetFileBase = z.infer<typeof CaseAssetFileBaseSchema>;

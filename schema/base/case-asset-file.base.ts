import * as z from "zod";
import { AssetFileTypeSchema } from "./enums.base";

export const CaseAssetFileBaseSchema = z.object({
	id: z.string(),
	dentalCaseId: z.string(),
	title: z.string().nullable(),
	description: z.string().nullable(),
	documentUrl: z.string(),
	assetFileType: AssetFileTypeSchema,
	fileExtension: z.string(),

	labId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type CaseAssetFileBase = z.infer<typeof CaseAssetFileBaseSchema>;

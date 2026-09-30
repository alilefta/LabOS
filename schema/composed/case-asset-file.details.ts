import * as z from "zod";
import { CaseAssetFileBaseSchema } from "../base/case-asset-file.base";
import { CaseBaseSchema } from "../base/case.base";
import { LabBaseSchema } from "../base/lab.base";
import { AssetFileTypeSchema } from "../base/enums.base";
import { emptyToUndefinedTransformer } from "../base/utils.base";
export const CaseAssetFileDetailsSchema = CaseAssetFileBaseSchema.extend({
	dentalCase: CaseBaseSchema,
	lab: LabBaseSchema,
});

export type CaseAssetFileDetails = z.infer<typeof CaseAssetFileDetailsSchema>;

export const CaseAssetFileDetailsUISchema = CaseAssetFileBaseSchema.extend({
	dentalCase: CaseBaseSchema.optional(),
	lab: LabBaseSchema.optional(),
});

export type CaseAssetFileDetailsUI = z.infer<typeof CaseAssetFileDetailsUISchema>;

const CaseAssetSummaryFieldsSchema = CaseAssetFileBaseSchema.pick({
	id: true,
	title: true,
	description: true,
	assetFileType: true,
});

export const CaseAssetSummarySchema = z.discriminatedUnion('storageMode', [
	CaseAssetFileBaseSchema.extend({
		storageMode: z.literal('LEGACY_URL_UNVERIFIED'),
		documentUrl: z.string().min(1),
		fileExtension: z.string().min(1),
	}),
	CaseAssetSummaryFieldsSchema.extend({
		storageMode: z.literal('MANAGED_PRIVATE'),
	}),
]);

export type CaseAssetSummary = z.infer<typeof CaseAssetSummarySchema>;

export const CreateCaseAssetFilesInputSchema = z.object({
	title: z.string().trim().min(1, "Case's asset name is required"),
	description: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
	documentUrl: z.url("Please enter a valid asset URL"),
	fileExtension: z.string(),
	assetFileType: AssetFileTypeSchema,
});

export type CreateCaseAssetFilesInput = z.infer<typeof CreateCaseAssetFilesInputSchema>;

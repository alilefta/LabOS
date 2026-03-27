import * as z from "zod";
import { CaseAssetFileBaseSchema } from "../base/case-asset-file.base";
import { CaseBaseSchema } from "../base/case.base";
import { LabBaseSchema } from "../base/lab.base";
export const CaseAssetFileDetailsSchema = CaseAssetFileBaseSchema.extend({
	dentalCase: CaseBaseSchema,
	lab: LabBaseSchema,
});

export type CaseAssetFileDetails = z.infer<typeof CaseAssetFileDetailsSchema>;

export const CaseAssetFileDetailsUISchema = CaseAssetFileBaseSchema.extend({
	dentalCase: CaseBaseSchema.nullable(),
	lab: LabBaseSchema.nullable(),
});

export type CaseAssetFileDetailsUI = z.infer<typeof CaseAssetFileDetailsUISchema>;

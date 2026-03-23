import * as z from "zod";
import { CaseAssetFileBaseSchema } from "../base/case-asset-file.base";
import { CaseBaseSchema } from "../base/case.base";
import { LabBaseSchema } from "../base/lab.base";
export const CaseAssetFileDetailsSchema = CaseAssetFileBaseSchema.extend({
	case: CaseBaseSchema,
	lab: LabBaseSchema,
});

export type CaseAssetFileDetails = z.infer<typeof CaseAssetFileDetailsSchema>;

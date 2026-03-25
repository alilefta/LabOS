import * as z from "zod";
import { SelectedToothBaseSchema } from "../base/selected-tooth.base";
import { CaseWorkItemBaseSchema } from "../base/case-work-item.base";
import { LabBaseSchema } from "../base/lab.base";

export const SelectedToothDetailsSchema = SelectedToothBaseSchema.extend({
	caseWorkItem: CaseWorkItemBaseSchema,
	lab: LabBaseSchema,
});

export type SelectedToothDetails = z.infer<typeof SelectedToothDetailsSchema>;

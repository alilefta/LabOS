import * as z from "zod";
import { SelectedToothBaseSchema } from "../base/selected-tooth.base";
import { CaseWorkItemBaseSchema } from "../base/case-work-item.base";
import { LabBaseSchema } from "../base/lab.base";
import { ToothPositionSchema } from "../base/tooth-position.base";

export const SelectedToothDetailsSchema = SelectedToothBaseSchema.extend({
	caseWorkItem: CaseWorkItemBaseSchema,
	lab: LabBaseSchema,
});

export type SelectedToothDetails = z.infer<typeof SelectedToothDetailsSchema>;

export const CreateSelectedToothInputSchema = z.object({
	toothPosition: ToothPositionSchema,
});

export type CreateSelectedToothInput = z.infer<typeof CreateSelectedToothInputSchema>;

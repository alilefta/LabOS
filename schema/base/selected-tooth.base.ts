import * as z from "zod";
import { ToothPositionSchema } from "./tooth-position.base";

export const SelectedToothBaseSchema = z.object({
	id: z.string(),
	toothPosition: ToothPositionSchema,
	caseWorkItemId: z.string(),
	labId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type SelectedToothBase = z.infer<typeof SelectedToothBaseSchema>;

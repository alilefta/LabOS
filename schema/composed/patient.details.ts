import * as z from "zod";
import { PatientBaseSchema } from "../base/patient.base";
import { CaseBaseSchema } from "../base/case.base";
import { LabBaseSchema } from "../base/lab.base";

export const PatientDetailsSchema = PatientBaseSchema.extend({
	case: z.array(CaseBaseSchema),
	lab: LabBaseSchema,
});

export type PatientDetails = z.infer<typeof PatientDetailsSchema>;

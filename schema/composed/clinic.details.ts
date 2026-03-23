import * as z from "zod";
import { ClinicBaseSchema } from "../base/clinic.base";
import { LabBaseSchema } from "../base/lab.base";
import { CaseBaseSchema } from "../base/case.base";

export const ClinicDetailsSchema = ClinicBaseSchema.extend({
	lab: LabBaseSchema,
	cases: z.array(CaseBaseSchema),
});

export type ClinicDetails = z.infer<typeof ClinicDetailsSchema>;

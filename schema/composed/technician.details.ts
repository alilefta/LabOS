import { z } from "zod";
import { TechnicianBaseSchema } from "../base/technician.base";
import { LabBaseSchema } from "../base/lab.base";
import { CaseBaseSchema } from "../base/case.base";

export const TechnicianDetailsSchema = TechnicianBaseSchema.extend({
	lab: LabBaseSchema,
	cases: z.array(CaseBaseSchema),
});

export type TechnicianDetails = z.infer<typeof TechnicianDetailsSchema>;

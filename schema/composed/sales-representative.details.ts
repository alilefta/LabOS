import * as z from "zod";
import { SalesRepresentativeBaseSchema } from "../base/sales-representative.base";
import { LabBaseSchema } from "../base/lab.base";
import { CaseBaseSchema } from "../base/case.base";
export const SalesRepresentativeDetailsSchema = SalesRepresentativeBaseSchema.extend({
	lab: LabBaseSchema,
	cases: z.array(CaseBaseSchema),
});

export type SalesRepresentativeDetails = z.infer<typeof SalesRepresentativeDetailsSchema>;

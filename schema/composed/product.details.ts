import * as z from "zod";
import { ProductBaseSchema } from "../base/product.base";
import { LabBaseSchema } from "../base/lab.base";
import { CaseWorkItemBaseSchema } from "../base/case-work-item.base";
import { WorkTypeBaseSchema } from "../base/worktype.base";

export const ProductDetailsSchema = ProductBaseSchema.extend({
	lab: LabBaseSchema,
	caseWorkItems: z.array(CaseWorkItemBaseSchema),
	workType: WorkTypeBaseSchema,
});

export type ProductDetails = z.infer<typeof ProductDetailsSchema>;

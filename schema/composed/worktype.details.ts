import { z } from "zod";
import { WorkTypeBaseSchema } from "../base/worktype.base";
import { ProductBaseSchema } from "../base/product.base";
import { LabBaseSchema } from "../base/lab.base";
import { CaseCategoryBaseSchema } from "../base/case-category.base";
import { CaseWorkItemBaseSchema } from "../base/case-work-item.base";

export const WorktypeDetailsSchema = WorkTypeBaseSchema.extend({
	product: z.array(ProductBaseSchema),
	lab: LabBaseSchema,
	caseCategory: CaseCategoryBaseSchema,
	caseWorkItems: z.array(CaseWorkItemBaseSchema),
});

export type WorktypeBase = z.infer<typeof WorkTypeBaseSchema>;

import { z } from "zod";
import { WorkTypeBaseSchema } from "../base/worktype.base";
import { ProductBaseSchema } from "../base/product.base";
import { LabBaseSchema } from "../base/lab.base";
import { CaseCategoryBaseSchema } from "../base/case-category.base";

export const WorktypeDetailsSchema = WorkTypeBaseSchema.extend({
	product: z.array(ProductBaseSchema),
	lab: LabBaseSchema,
	caseCategory: CaseCategoryBaseSchema,
});

export type WorktypeBase = z.infer<typeof WorkTypeBaseSchema>;

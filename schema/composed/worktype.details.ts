import { z } from "zod";
import { WorkTypeBaseSchema } from "../base/worktype.base";
import { ProductBaseSchema } from "../base/product.base";
import { LabBaseSchema } from "../base/lab.base";
import { CaseCategoryBaseSchema } from "../base/case-category.base";
import { CaseWorkItemBaseSchema } from "../base/case-work-item.base";
import { emptyToUndefinedTransformer } from "../base/utils.base";
import { CreateProductInputSchema } from "./product.details";

export const WorktypeDetailsSchema = WorkTypeBaseSchema.extend({
	product: z.array(ProductBaseSchema),
	lab: LabBaseSchema,
	caseCategory: CaseCategoryBaseSchema,
	caseWorkItems: z.array(CaseWorkItemBaseSchema),
});

export type WorktypeDetails = z.infer<typeof WorktypeDetailsSchema>;

export const WorktypeDetailsUISchema = WorkTypeBaseSchema.extend({
	products: z.array(ProductBaseSchema).optional(),
	lab: LabBaseSchema.optional(),
	caseCategory: CaseCategoryBaseSchema.optional(),
	caseWorkItems: z.array(CaseWorkItemBaseSchema).optional(),
});

export type WorktypeDetailsUI = z.infer<typeof WorktypeDetailsUISchema>;

export const CreateWorkTypeInputSchema = z.object({
	name: z.string().trim().min(1, "Work type name is required"),
	description: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
	imageUrl: z.url().optional(),
	requireTeethSelection: z.boolean().default(true).optional(),
	caseCategoryId: z.string(),
	product: CreateProductInputSchema,
});

export type CreateWorkTypeInput = z.infer<typeof CreateWorkTypeInputSchema>;

export const GetProductsByWorkTypeInputSchema = z.object({
	workTypeId: z.string(),
	limit: z.number().default(10),
});

export type GetProductsByWorkTypeInput = z.infer<typeof GetProductsByWorkTypeInputSchema>;

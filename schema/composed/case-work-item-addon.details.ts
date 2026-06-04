import z from 'zod'
import { CaseWorkItemAddonBaseSchema } from '../base/case-work-item-addon.base'
import { CaseWorkItemBaseSchema } from '../base/case-work-item.base'
import { LabBaseSchema } from '../base/lab.base'
import { ProductAddonBaseSchema } from '../base/product-addon.base'

export const CaseWorkItemAddonDetailsSchema =
	CaseWorkItemAddonBaseSchema.extend({
		caseWorkItem: CaseWorkItemBaseSchema,
		addon: ProductAddonBaseSchema,
		lab: LabBaseSchema,
	})

export type CaseWorkItemAddonDetails = z.infer<
	typeof CaseWorkItemAddonDetailsSchema
>

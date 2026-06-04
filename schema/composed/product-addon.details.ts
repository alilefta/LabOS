import z from 'zod'
import { ProductAddonBaseSchema } from '../base/product-addon.base'
import { CaseWorkItemAddonBaseSchema } from '../base/case-work-item-addon.base'
import { ProductBaseSchema } from '../base/product.base'
import { LabBaseSchema } from '../base/lab.base'

export const ProductAddonDetailsSchema = ProductAddonBaseSchema.extend({
	product: ProductBaseSchema,
	lab: LabBaseSchema,
	caseWorkItemAddons: z.array(CaseWorkItemAddonBaseSchema),
})

export type ProductAddonDetails = z.infer<typeof ProductAddonDetailsSchema>

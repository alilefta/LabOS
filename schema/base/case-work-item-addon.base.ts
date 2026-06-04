import z from 'zod'

export const CaseWorkItemAddonBaseSchema = z.object({
	id: z.string(),
	caseWorkItemId: z.string(),
	addonId: z.string(),
	priceSnapshot: z.number(),
	labId: z.string(),
	createdAt: z.date(),
})

export type CaseWorkItemAddonBase = z.infer<typeof CaseWorkItemAddonBaseSchema>

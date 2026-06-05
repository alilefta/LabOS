import z from 'zod'
import { LabBaseSchema } from '../base/lab.base'

export const LabSettingsDetailsSchema = z.object({
	lab: LabBaseSchema,
})

export type LabSettingsDetails = z.infer<typeof LabSettingsDetailsSchema>

import { z } from 'zod'

export const ToggleArchiveEntityInputSchema = z.object({
	id: z.string().uuid('Invalid entity ID'),
	isArchived: z.boolean({ error: 'Target archive state is required' }),
})

export type ToggleArchiveEntityInput = z.infer<
	typeof ToggleArchiveEntityInputSchema
>

export interface WorktypeDetailsDTO {
	id: string
	name: string
	description: string | null
	imageUrl: string | null
	caseCategoryId: string
	requireTeethSelection: boolean
}

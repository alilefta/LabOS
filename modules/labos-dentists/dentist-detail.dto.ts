/** Minimal Dentist fields required by the existing edit form. */
export type DentistEditDTO = Readonly<{
	id: string
	name: string
	email: string | null
	phoneNumber: string | null
	isOwner: boolean
	isDefault: boolean
	notes: string | null
	avatarUrl: string | null
	specialty: string | null
	licenseNumber: string | null
}>

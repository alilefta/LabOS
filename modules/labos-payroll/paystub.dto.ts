import type { PayoutStatus, StaffRoleCategory } from '@/schema/base/enums.base'

/** Minimal payroll receipt DTO. Patient identity and Lab revenue are excluded. */
export type StaffPaystubDTO = Readonly<{
	payoutNumber: string
	payoutDate: Date
	status: PayoutStatus
	staff: Readonly<{
		id: string
		name: string
		jobTitle: string | null
		roleCategory: StaffRoleCategory
	}>
	lab: Readonly<{
		title: string
		subtitle: string | null
	}>
	cases: readonly Readonly<{
		caseNumber: string
		assignmentRole: StaffRoleCategory
		commissionTotal: number
		productName: string
		teethCount: number
	}>[]
	totalDisbursed: number
}>

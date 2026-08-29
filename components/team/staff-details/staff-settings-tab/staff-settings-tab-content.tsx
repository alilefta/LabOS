// components/team/team-details/settings-tab/staff-settings-tab-content.tsx

'use client'

import { useQuery } from '@tanstack/react-query'
import { LabRole } from '@/schema/base/enums.base'

// Import your 4 highly optimized setting cards
import { StaffIdentityCard } from './staff-identity-card'
import { StaffScheduleCard } from './staff-schedule-card'
import { StaffSecurityCard } from './staff-security-card'
import { usePermissions } from '@/providers/permissions-provider'

// Data Access
import { handleSafeActionError } from '@/lib/safe-action-helpers'
import { getStaffDataDossierAction } from '@/actions/team/get-staff-dossier-action'
import { StaffCompensationCard } from './staff-compensation-card'

interface Props {
	staffId: string
	currentUserRole: LabRole
}
// const StaffCompensationCard = dynamic(
// 	() =>
// 		import('./staff-compensation-card').then((cm) => cm.StaffCompensationCard),
// 	{ ssr: false, loading: () => <p>Loading </p> },
// )
export function StaffSettingsTabContent({ staffId, currentUserRole }: Props) {
	const { canManageStaff } = usePermissions()

	// ── 1. HIGH-PERFORMANCE DATA FETCH (SUSPENDED) ────────────────────

	const { data: staff } = useQuery({
		queryKey: ['staff-details', staffId],
		queryFn: async () => {
			const res = await getStaffDataDossierAction({ staffId })

			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({
					serverError: res.serverError,
					validationErrors: res.validationErrors,
				})
			}
			return res.data?.staff || null
		},
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		staleTime: Infinity, // Settings data should only refresh when explicitly mutated/invalidated
	})

	if (!staff) return null

	// ── 2. MAP DATA TO SPECIFIC CARD SCHEMAS ────────────────────────────
	const identityData = {
		staffId: staff.id,
		firstName: staff.firstName,
		lastName: staff.lastName,
		phoneNumber: staff.phoneNumber ?? "",
		jobTitle: staff.jobTitle,
		specialization: staff.specialization,
		roleCategory: staff.roleCategory,
	}

	const compensationData = staff.compensation
		? { staffId: staff.id, ...staff.compensation }
		: null
	const accessData = staff.access
		? { staffId: staff.id, ...staff.access }
		: null

	const workingDays = staff.workingDays || [
		'MONDAY',
		'TUESDAY',
		'WEDNESDAY',
		'THURSDAY',
		'FRIDAY',
	]
	return (
		// strictly aligned to your 2000px layout grids
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ">
			{/* ── COLUMN 1: THE OPERATIONAL WORKER (Left) ── */}
			<div className="flex flex-col gap-6 h-fit ">
				<StaffIdentityCard
					initialData={identityData}
					isReadOnly={!canManageStaff}
				/>
				<StaffScheduleCard
					staffId={staff.id}
					initialWorkingDays={workingDays}
					isReadOnly={!canManageStaff}
				/>
			</div>

			{/* ── COLUMN 2: THE SYSTEM & FINANCE (Right) ── */}
			<div className="flex flex-col gap-6 h-fit">
				{/* The IT software license manager */}

				{/* 
                🚨 CRITICAL FIX: THE DYNAMIC KEY
                Assigning key={staff.id} guarantees that the security form resets 
                and destroys its dirty state whenever the manager switches users [1].
            */}
				{accessData && (
					<StaffSecurityCard
						key={staff.id}
						initialData={accessData}
						currentUserRole={currentUserRole}
					/>
				)}

				{compensationData && (
					<StaffCompensationCard
						initialData={compensationData}
						isReadOnly={currentUserRole === 'ADMIN'}
					/>
				)}
			</div>
		</div>
	)
}

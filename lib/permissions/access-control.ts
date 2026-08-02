import { LabRole, StaffRoleCategory } from '@/schema/base/enums.base'
import { ERRORS } from '../errors'

// 1. Define what parts of the system we are protecting
export enum Resource {
	CASE_DETAILS = 'CASE_DETAILS',
	FINANCIALS = 'FINANCIALS', // Prices, Grand Totals, Invoices
	COMMISSIONS = 'COMMISSIONS', // How much staff earned
	STAFF_MANAGEMENT = 'STAFF_MANAGEMENT', // Invite/Delete members
	CLINICAL_EDIT = 'CLINICAL_EDIT', // Changing teeth/materials
	BILLING_SETTINGS = 'BILLING_SETTINGS', // Lab subscription/Stripe
}

// 2. Define a clean interface for the user context
export interface UserContext {
	role: LabRole
	staffCategory?: StaffRoleCategory | null
	staffId?: string | null
	labId?: string | null
}

export function getPermissions(user: UserContext) {
	const { role, staffCategory, staffId, labId } = user

	// V1 uses only two authorization categories. StaffRoleCategory remains
	// operational metadata and must not grant additional application access.
	const isOwner = role === 'OWNER'
	const isManagement = ['OWNER', 'MANAGER', 'ADMIN'].includes(role)
	const isStaff = role === 'STAFF'

	// Record-level checks remain the responsibility of the caller. For example,
	// Staff may update a case only after the action verifies their assignment.
	const canUpdateAssignedCaseStatus = isManagement || isStaff

	return {
		// V1 matrix: management-only capabilities.
		canViewManagementDashboard: isManagement,
		canCreateCases: isManagement,
		canEditCaseOrder: isManagement,
		canAssignCaseStaff: isManagement,
		canManageClinics: isManagement,
		canManageCatalog: isManagement,
		canViewFinancials: isManagement,
		canManageFinancials: isManagement,
		canManageTeam: isManagement,
		canManageLabSettings: isManagement,
		canManageBilling: isOwner,
		canArchiveCase: isManagement,
		canArchivePatient: isManagement,

		// V1 matrix: assigned-work capability. The associated action must still
		// verify the current user is assigned to the specific case.
		canViewAssignedWork: true,
		canUpdateAssignedCaseStatus,

		// Existing names retained while callers migrate to the V1 matrix.
		canViewCommissions: isManagement,
		canEditClinical: isManagement,
		canViewDetailedFinancials: isManagement,
		canManageStaff: isManagement,
		canAdvanceStatus: canUpdateAssignedCaseStatus,

		// V1 never hard-deletes cases. Use canArchiveCase for the audited,
		// isArchived-based record-retention flow.
		canDeleteCase: false,

		isManagement,
		isStaff,

		// --- NEW: Pass these through so any component can access the user's raw identity ---
		staffId: staffId || null,
		labId,

		role,
		staffCategory: staffCategory || null,
	}
}

export const authorize = (user: UserContext) => {
	const p = getPermissions(user)

	return {
		throwIfCannot: (action: keyof ReturnType<typeof getPermissions>) => {
			if (!p[action]) {
				// You can import your standard ERRORS.FORBIDDEN here
				throw ERRORS.FORBIDDEN
			}
		},
		...p,
	}
}

// =====================
// How to use this in a Server Action
// This is why we built the "Option 3" linked identity. Your server actions become incredibly readable and secure.
// code
// TypeScript
// // app/actions/cases/update-case.ts
// export const updateCasePriceAction = actionClientWithLab
//   .action(async ({ parsedInput, ctx }) => {
//     const { labUser } = ctx; // ctx now includes the LabUser + linked LabStaff

//     // 1. Initialize the Gatekeeper
//     const gate = authorize({
//       role: labUser.role,
//       staffCategory: labUser.labStaff?.roleCategory
//     });

//     // 2. Perform the check
//     gate.throwIfCannot("canViewFinancials");

//     // 3. Logic proceeds only if authorized...
//     // await prisma.case.update(...)
//   });

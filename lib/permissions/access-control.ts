import { LabRole, StaffRoleCategory } from "@/schema/base/enums.base";
import { ERRORS } from "../errors";

// 1. Define what parts of the system we are protecting
export enum Resource {
	CASE_DETAILS = "CASE_DETAILS",
	FINANCIALS = "FINANCIALS", // Prices, Grand Totals, Invoices
	COMMISSIONS = "COMMISSIONS", // How much staff earned
	STAFF_MANAGEMENT = "STAFF_MANAGEMENT", // Invite/Delete members
	CLINICAL_EDIT = "CLINICAL_EDIT", // Changing teeth/materials
	BILLING_SETTINGS = "BILLING_SETTINGS", // Lab subscription/Stripe
}

// 2. Define a clean interface for the user context
export interface UserContext {
	role: LabRole;
	staffCategory?: StaffRoleCategory | null;
	staffId?: string | null;
}

export function getPermissions(user: UserContext) {
	const { role, staffCategory, staffId } = user;

	// --- HELPER GROUPS ---
	const isOwner = role === "OWNER";
	const isManagement = ["OWNER", "MANAGER", "ADMIN"].includes(role);
	const isOffice = ["OWNER", "MANAGER", "ADMIN"].includes(role);

	// Operational specific checks
	const isAccountant = staffCategory === "ACCOUNTANT";
	const isSalesRep = staffCategory === "SALES_REP" || staffCategory === "ACCOUNT_MANAGER";
	const isReception = staffCategory === "RECEPTIONIST";

	return {
		// 1. Who can see the money?
		canViewFinancials: isOffice || isAccountant || isSalesRep || isReception,
		// 2. Who can see specific commission breakdowns?
		canViewCommissions: isManagement || isAccountant,

		// 3. Who can edit clinical work (Teeth/Materials)?
		// Usually Office (Receptionists) and Management. Technicians only see, they don't change.
		canEditClinical: isOffice || isManagement,

		// Who can see the STRATEGY and the MATH? (Financial roles only)
		canViewDetailedFinancials: isOffice || isAccountant,

		// 4. Who can manage the team?
		canManageStaff: isManagement,

		// 5. Who can change the Lab's own subscription/Stripe?
		canManageBilling: isOwner,

		// 6. Who can delete a case? (Very dangerous)
		canDeleteCase: isOwner || (isManagement && role === "MANAGER"),

		// 7. Who can advance a case status?
		canAdvanceStatus: isOffice || isManagement || !!staffCategory, // Techs can advance their own

		isManagement,

		// --- NEW: Pass these through so any component can access the user's raw identity ---
		staffId: staffId || null,
		role,
		staffCategory: staffCategory || null,
	};
}

export const authorize = (user: UserContext) => {
	const p = getPermissions(user);

	return {
		throwIfCannot: (action: keyof ReturnType<typeof getPermissions>) => {
			if (!p[action]) {
				// You can import your standard ERRORS.FORBIDDEN here
				throw ERRORS.FORBIDDEN;
			}
		},
		...p,
	};
};

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

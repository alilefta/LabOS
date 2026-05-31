// actions/team/grant-staff-access.ts
"use server";

import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { addDays } from "date-fns";
import crypto from "crypto";
import { GrantStaffSystemAccessInputSchema } from "@/schema/composed/team/staff-settings.schema";

export const grantStaffSystemAccessAction = actionClientWithLab
	.metadata({
		actionName: "Grant-Staff-System-Access",
		requiredLabRole: "MANAGER", // Scopes via middleware to OWNER/MANAGER minimum [1]
	})
	.inputSchema(GrantStaffSystemAccessInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { staffId, email, roleToGrant } = parsedInput;
		const { labId, labUser } = ctx; // Destructured safely from your requireLabMiddleware

		try {
			const prisma = await tenantPrisma(labId);

			// ── 2. DEFENSE IN DEPTH: ROLE VERIFICATION ──────────────────────────
			// Double check the database-level role of the actor
			if (labUser.role !== "OWNER" && labUser.role !== "MANAGER") {
				throw new Error("Unauthorized. Only Lab Owners or Managers can grant software credentials.");
			}

			// ── 3. ATOMIC VERIFICATION & GENERATION TRANSACTION ───────────────
			const result = await prisma.$transaction(async (tx) => {
				// A. Verify target employee exists and belongs to this lab tenant
				const staff = await tx.labStaff.findUnique({
					where: { id: staffId, labId },
					select: { id: true, firstName: true, lastName: true, labUser: { select: { id: true } } },
				});

				if (!staff) {
					throw new Error("The specified employee could not be found in this laboratory.");
				}

				// B. Prevent Double-Seat Creation: Do they already have a login?
				if (staff.labUser) {
					throw new Error(`${staff.firstName} already has an active, linked LabOS account.`);
				}

				// C. IDEMPOTENCY: Invalidate any old, outstanding invitations for this staff member
				await tx.labInvitation.deleteMany({
					where: { labStaffId: staffId, labId },
				});

				// D. Calculate expiration (Exactly 48 Hours from now)
				const expiresAt = addDays(new Date(), 2);
				const token = crypto.randomUUID(); // Highly secure 36-char string [1]

				// E. Create the new secure invitation
				const invitation = await tx.labInvitation.create({
					data: {
						labId,
						labStaffId: staffId,
						email,
						token,
						roleToGrant,
						expiresAt,
					},
				});

				return { invitation, staff };
			});

			// ── 4. ASYNCHRONOUS EMAIL DISPATCH (STUB) ─────────────────────────
			// In production, trigger your Resend / Mailgun service here on the server:
			// await sendOnboardingEmail({
			//    to: email,
			//    staffName: `${result.staff.firstName} ${result.staff.lastName}`,
			//    inviteLink: `${process.env.NEXT_PUBLIC_APP_URL}/invite/${result.invitation.token}`
			// });
			console.log(`[Onboarding] Invite link generated: /invite/${result.invitation.token}`);

			return {
				success: true,
				invite: {
					email: result.invitation.email,
					token: result.invitation.token,
					expiresAt: result.invitation.expiresAt,
				},
			};
		} catch (error: any) {
			console.error("[Grant-Staff-System-Access-Action] Error:", error.message);
			if (error instanceof Error) throw error;
			throw ERRORS.OPERATION_NOT_ALLOWED;
		}
	});

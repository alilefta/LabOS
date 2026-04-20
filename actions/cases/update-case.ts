"use server";

// actions/cases/update-case.ts
// ─────────────────────────────────────────────────────────────────────────────
// All quick-update actions for the case details page.
// Every mutation writes a CaseActivityLog entry in the same transaction.
//
// Security model:
//   - labId always comes from ctx (server-side middleware), never client input
//   - caseId ownership is verified: case must belong to ctx.labId
//   - staffId ownership is verified: staff must belong to ctx.labId
//   - fileId ownership is verified: file must belong to the case AND ctx.labId
//   - Role requirements are enforced per action via requiredLabRole metadata
// ─────────────────────────────────────────────────────────────────────────────

import z from "zod/v4";
import { actionClientWithLab } from "@/lib/safe-action";
import { ActionError, ERRORS } from "@/lib/errors";
import { tenantPrisma } from "@/lib/prisma";
import { StaffRoleCategorySchema, CommissionTypeSchema, CaseStatusSchema, AssetFileTypeSchema, CaseStatus, StaffRoleCategory, CommissionType } from "@/schema/base/enums.base";
import { APIError } from "better-auth";
import { CaseActivityLogCreateManyInput } from "@/generated/prisma/models";

// ─────────────────────────────────────────────────────────────────────────────
// Shared helpers
// ─────────────────────────────────────────────────────────────────────────────

// Valid status transitions — enforced server-side, not just in the UI
const VALID_TRANSITIONS: Record<CaseStatus, CaseStatus[]> = {
	DRAFT: ["NEW"],
	NEW: ["ASSIGNED", "PROCESSING", "FAILED"],
	ASSIGNED: ["PROCESSING", "FAILED"],
	PROCESSING: ["COMPLETED", "FAILED"],
	COMPLETED: ["DELIVERED"],
	DELIVERED: [],
	FAILED: [],
};

// Verify a case exists and belongs to this lab.
// Returns the case or throws — never returns null.
async function requireCase(prisma: Awaited<ReturnType<typeof tenantPrisma>>, caseId: string, labId: string) {
	const dentalCase = await prisma.case.findUnique({
		where: { id: caseId, labId },
		select: { id: true, status: true, labId: true },
	});

	if (!dentalCase) throw ERRORS.CASE_NOT_FOUND;
	// Belt-and-suspenders: tenantPrisma injects labId in the where clause,
	// but we double-check here explicitly for auditability.
	if (dentalCase.labId !== labId) throw ERRORS.FORBIDDEN;

	return dentalCase;
}

// Build a log entry object — used inside every transaction
function buildLogEntry({ caseId, labId, actorId, actorName, type, summary, payload }: CaseActivityLogCreateManyInput) {
	return {
		caseId,
		labId,
		actorId,
		actorName,
		type,
		summary,
		payload: payload,
	};
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. updateCaseDeadlineAction
// ─────────────────────────────────────────────────────────────────────────────

const UpdateCaseDeadlineSchema = z.object({
	caseId: z.string().min(1),
	deadline: z.date(),
});

export const updateCaseDeadlineAction = actionClientWithLab
	.metadata({ actionName: "Update-Case-Deadline-Action", requiredLabRole: "ADMIN" })
	.inputSchema(UpdateCaseDeadlineSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { labId, labUser } = ctx;
		const { caseId, deadline } = parsedInput;

		const prisma = await tenantPrisma(labId);
		const dentalCase = await requireCase(prisma, caseId, labId);

		// Completed or delivered cases should not have deadlines shifted
		if (dentalCase.status === "COMPLETED" || dentalCase.status === "DELIVERED") {
			throw ERRORS.CASE_ALREADY_COMPLETED;
		}

		const [updatedCase] = await prisma.$transaction([
			prisma.case.update({
				where: { id: caseId, labId },
				data: { deadline },
				select: { id: true, caseNumber: true, deadline: true, status: true },
			}),
			prisma.caseActivityLog.create({
				data: buildLogEntry({
					caseId,
					labId,
					actorId: labUser.id,
					actorName: labUser.role, // replaced with real name below — see note
					type: "DEADLINE_CHANGED",
					summary: `Deadline updated to ${deadline.toDateString()}`,
					payload: { from: null, to: deadline.toISOString() },
				}),
			}),
		]);

		return { updatedCase };
	});

// ─────────────────────────────────────────────────────────────────────────────
// 2. updateCaseStatusAction
// ─────────────────────────────────────────────────────────────────────────────

const UpdateCaseStatusSchema = z.object({
	caseId: z.string().min(1),
	newStatus: CaseStatusSchema,
});

export const updateCaseStatusAction = actionClientWithLab
	.metadata({ actionName: "updateCaseStatus", requiredLabRole: "STAFF" }) // all active members
	.inputSchema(UpdateCaseStatusSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { labId, labUser } = ctx;
		const { caseId, newStatus } = parsedInput;

		const prisma = await tenantPrisma(labId);
		const dentalCase = await requireCase(prisma, caseId, labId);

		const currentStatus = dentalCase.status as CaseStatus;
		const allowedNext = VALID_TRANSITIONS[currentStatus];

		if (!allowedNext.includes(newStatus)) {
			throw new ActionError(`Cannot transition from ${currentStatus} to ${newStatus}`, "INVALID_CASE_STATUS_TRANSITION", 400);
		}

		// Fetch actor name for the log — labUser.role is not a name,
		// so we pull the LabUser record for the display name
		const actor = await prisma.labUser.findUnique({
			where: { id: labUser.id },
			select: { name: true },
		});

		const actorName = actor?.name ?? "Unknown";

		const [updatedCase] = await prisma.$transaction([
			prisma.case.update({
				where: { id: caseId, labId },
				data: { status: newStatus },
				select: { id: true, caseNumber: true, status: true },
			}),
			prisma.caseActivityLog.create({
				data: buildLogEntry({
					caseId,
					labId,
					actorId: labUser.id,
					actorName,
					type: "STATUS_CHANGED",
					summary: `Status changed from ${currentStatus} to ${newStatus}`,
					payload: { from: currentStatus, to: newStatus },
				}),
			}),
		]);

		return { updatedCase };
	});

// ─────────────────────────────────────────────────────────────────────────────
// 3. assignCaseStaffAction
// ─────────────────────────────────────────────────────────────────────────────

const AssignCaseStaffSchema = z.object({
	caseId: z.string().min(1),
	staffId: z.string().min(1),
	roleCategory: StaffRoleCategorySchema,
	commissionType: CommissionTypeSchema,
	commissionValue: z.number().min(0),
});

export const assignCaseStaffAction = actionClientWithLab
	.metadata({ actionName: "assignCaseStaff", requiredLabRole: "ADMIN" })
	.inputSchema(AssignCaseStaffSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { labId, labUser } = ctx;
		const { caseId, staffId, roleCategory, commissionType, commissionValue } = parsedInput;

		const prisma = await tenantPrisma(labId);

		// Verify case ownership
		const dentalCase = await requireCase(prisma, caseId, labId);

		if (dentalCase.status === "COMPLETED" || dentalCase.status === "DELIVERED" || dentalCase.status === "FAILED") {
			throw new ActionError("Cannot assign staff to a case that is completed, delivered, or failed", "OPERATION_NOT_ALLOWED", 400);
		}

		// Verify staff belongs to this lab — critical security check
		// tenantPrisma injects labId but we verify explicitly for auditability
		const staff = await prisma.labStaff.findUnique({
			where: { id: staffId, labId },
			select: { id: true, firstName: true, lastName: true, labId: true, isActive: true },
		});

		if (!staff) throw ERRORS.NOT_FOUND;
		if (staff.labId !== labId) throw ERRORS.FORBIDDEN;
		if (!staff.isActive) {
			throw new ActionError("Cannot assign an inactive staff member", "OPERATION_NOT_ALLOWED", 400);
		}

		// Check for duplicate assignment (same staff, same role on same case)
		const existing = await prisma.caseStaffAssignment.findUnique({
			where: { caseId_staffId: { caseId, staffId } },
			select: { id: true },
		});

		if (existing) {
			throw new ActionError("This staff member is already assigned to this case", "DUPLICATE_ENTRY", 409);
		}

		// Fetch actor name for the log
		const actor = await prisma.labUser.findUnique({
			where: { id: labUser.id },
			select: { name: true },
		});
		const actorName = actor?.name ?? "Unknown";

		// Determine next status: if assigning a technician and case is NEW → ASSIGNED
		const shouldAutoAssign = dentalCase.status === "NEW" && (roleCategory === "TECHNICIAN" || roleCategory === "SENIOR_TECHNICIAN");

		const [assignment] = await prisma.$transaction([
			prisma.caseStaffAssignment.create({
				data: {
					caseId,
					staffId,
					labId,
					roleCategory: roleCategory as StaffRoleCategory,
					commissionType: commissionType as CommissionType,
					commissionValue,
					commissionTotal: 0, // computed on case completion
				},
				select: {
					id: true,
					roleCategory: true,
					staff: { select: { id: true, firstName: true, lastName: true } },
				},
			}),

			// Auto-advance status to ASSIGNED when first technician is assigned
			...(shouldAutoAssign
				? [
						prisma.case.update({
							where: { id: caseId, labId },
							data: { status: "ASSIGNED" },
						}),
					]
				: []),

			prisma.caseActivityLog.create({
				data: buildLogEntry({
					caseId,
					labId,
					actorId: labUser.id,
					actorName,
					type: "STAFF_ASSIGNED",
					summary: `${staff.firstName} ${staff.lastName} assigned as ${roleCategory.toLowerCase().replace(/_/g, " ")}`,
					payload: {
						staffId: staff.id,
						staffName: `${staff.firstName} ${staff.lastName}`,
						roleCategory,
						...(shouldAutoAssign && { autoStatusChange: "NEW → ASSIGNED" }),
					},
				}),
			}),
		]);

		return { assignment };
	});

// ─────────────────────────────────────────────────────────────────────────────
// 4. removeCaseStaffAction
// ─────────────────────────────────────────────────────────────────────────────

const RemoveCaseStaffSchema = z.object({
	caseId: z.string().min(1),
	staffId: z.string().min(1),
});

export const removeCaseStaffAction = actionClientWithLab
	.metadata({ actionName: "removeCaseStaff", requiredLabRole: "ADMIN" })
	.inputSchema(RemoveCaseStaffSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { labId, labUser } = ctx;
		const { caseId, staffId } = parsedInput;

		const prisma = await tenantPrisma(labId);
		const dentalCase = await requireCase(prisma, caseId, labId);

		// Cannot remove staff from terminal cases
		if (dentalCase.status === "COMPLETED" || dentalCase.status === "DELIVERED" || dentalCase.status === "FAILED") {
			throw new ActionError("Cannot modify staff on a completed, delivered, or failed case", "OPERATION_NOT_ALLOWED", 400);
		}

		// Verify the assignment exists and belongs to this lab
		const assignment = await prisma.caseStaffAssignment.findUnique({
			where: { caseId_staffId: { caseId, staffId } },
			select: {
				id: true,
				roleCategory: true,
				labId: true,
				staff: { select: { firstName: true, lastName: true } },
			},
		});

		if (!assignment) throw ERRORS.NOT_FOUND;
		if (assignment.labId !== labId) throw ERRORS.FORBIDDEN;

		const actor = await prisma.labUser.findUnique({
			where: { id: labUser.id },
			select: { name: true },
		});
		const actorName = actor?.name ?? "Unknown";

		// After removal, check if any technician remains — if not, revert to NEW
		const remainingTechCount = await prisma.caseStaffAssignment.count({
			where: {
				caseId,
				staffId: { not: staffId }, // exclude the one we're removing
				roleCategory: { in: ["TECHNICIAN", "SENIOR_TECHNICIAN"] },
			},
		});

		const shouldRevertToNew = dentalCase.status === "ASSIGNED" && (assignment.roleCategory === "TECHNICIAN" || assignment.roleCategory === "SENIOR_TECHNICIAN") && remainingTechCount === 0;

		await prisma.$transaction([
			prisma.caseStaffAssignment.delete({
				where: { caseId_staffId: { caseId, staffId } },
			}),

			// Revert to NEW if no technicians remain
			...(shouldRevertToNew
				? [
						prisma.case.update({
							where: { id: caseId, labId },
							data: { status: "NEW" },
						}),
					]
				: []),

			prisma.caseActivityLog.create({
				data: buildLogEntry({
					caseId,
					labId,
					actorId: labUser.id,
					actorName,
					type: "STAFF_REMOVED",
					summary: `${assignment.staff.firstName} ${assignment.staff.lastName} removed from case`,
					payload: {
						staffId,
						staffName: `${assignment.staff.firstName} ${assignment.staff.lastName}`,
						roleCategory: assignment.roleCategory,
						...(shouldRevertToNew && { autoStatusChange: "ASSIGNED → NEW" }),
					},
				}),
			}),
		]);

		return { removed: true };
	});

// ─────────────────────────────────────────────────────────────────────────────
// 5. addCaseAssetFilesAction
// ─────────────────────────────────────────────────────────────────────────────

const AddCaseAssetFilesSchema = z.object({
	caseId: z.string().min(1),
	files: z
		.array(
			z.object({
				title: z.string().trim().optional(),
				description: z.string().trim().optional(),
				documentUrl: z.string().url(),
				assetFileType: AssetFileTypeSchema,
				fileExtension: z.string().min(1),
			}),
		)
		.min(1, "At least one file is required")
		.max(20, "Cannot upload more than 20 files at once"),
});

export const addCaseAssetFilesAction = actionClientWithLab
	.metadata({ actionName: "Add-Case-Asset-Files-Action", requiredLabRole: "STAFF" })
	.inputSchema(AddCaseAssetFilesSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { labId, labUser } = ctx;
		const { caseId, files } = parsedInput;

		try {
			const prisma = await tenantPrisma(labId);
			await requireCase(prisma, caseId, labId);

			const actor = await prisma.labUser.findUnique({
				where: { id: labUser.id },
				select: { name: true },
			});
			const actorName = actor?.name ?? "Unknown";
			const [createdFiles] = await prisma.$transaction([
				prisma.caseAssetFile.createManyAndReturn({
					data: files.map((f) => ({
						caseId, // tenantPrisma will inject labId automatically
						labId,
						dentalCaseId: caseId,
						title: f.title,
						description: f.description,
						documentUrl: f.documentUrl,
						assetFileType: f.assetFileType,
						fileExtension: f.fileExtension,
					})),
					select: { id: true, documentUrl: true, assetFileType: true, title: true },
				}),

				prisma.caseActivityLog.create({
					data: buildLogEntry({
						caseId,
						labId,
						actorId: labUser.id,
						actorName,
						type: "FILE_UPLOADED",
						summary: `${files.length} file${files.length > 1 ? "s" : ""} uploaded`,
						payload: {
							count: files.length,
							files: files.map((f) => ({
								fileName: f.title ?? f.fileExtension,
								assetFileType: f.assetFileType,
							})),
						},
					}),
				}),
			]);

			return { createdFiles };
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Add-Case-Asset-Files-Action] Error", e.message);
			}
			throw e;
		}
	});

// ─────────────────────────────────────────────────────────────────────────────
// 6. deleteCaseAssetFileAction
// ─────────────────────────────────────────────────────────────────────────────

const DeleteCaseAssetFileSchema = z.object({
	caseId: z.string().min(1),
	fileId: z.string().min(1),
});

export const deleteCaseAssetFileAction = actionClientWithLab
	.metadata({ actionName: "Delete-Case-Asset-Files-Action", requiredLabRole: "ADMIN" })
	.inputSchema(DeleteCaseAssetFileSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { labId, labUser } = ctx;
		const { caseId, fileId } = parsedInput;

		try {
			const prisma = await tenantPrisma(labId);
			await requireCase(prisma, caseId, labId);

			// Verify the file belongs to this case AND this lab
			// This is the critical ownership check — prevents deleting another lab's files
			const file = await prisma.caseAssetFile.findUnique({
				where: { id: fileId },
				select: { id: true, labId: true, dentalCaseId: true, title: true, assetFileType: true },
			});

			if (!file) throw ERRORS.FILE_NOT_FOUND;
			if (file.labId !== labId) throw ERRORS.FORBIDDEN;
			if (file.dentalCaseId !== caseId) {
				// File exists but belongs to a different case — possible IDOR attempt
				console.error("[Security] File-case mismatch on delete", {
					fileId,
					fileCaseId: file.dentalCaseId,
					requestedCaseId: caseId,
					labId,
				});
				throw ERRORS.FORBIDDEN;
			}

			const actor = await prisma.labUser.findUnique({
				where: { id: labUser.id },
				select: { name: true },
			});
			const actorName = actor?.name ?? "Unknown";

			await prisma.$transaction([
				prisma.caseAssetFile.delete({
					where: { id: fileId },
				}),

				prisma.caseActivityLog.create({
					data: buildLogEntry({
						caseId,
						labId,
						actorId: labUser.id,
						actorName,
						type: "FILE_DELETED",
						summary: `File "${file.title ?? file.assetFileType}" deleted`,
						payload: {
							fileId,
							fileName: file.title ?? null,
							assetFileType: file.assetFileType,
						},
					}),
				}),
			]);

			return { deleted: true };
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Delete-Case-Asset-Files-Action] Error", e.message);
			}
			throw e;
		}
	});

// ─────────────────────────────────────────────────────────────────────────────
// 7. updateCaseNotesAction
// ─────────────────────────────────────────────────────────────────────────────

const UpdateCaseNotesSchema = z.object({
	caseId: z.string().min(1),
	notes: z.string().max(2000, "Notes cannot exceed 2000 characters").nullable(),
});

export const updateCaseNotesAction = actionClientWithLab
	.metadata({ actionName: "Update-Case-Notes-Action", requiredLabRole: "STAFF" })
	.inputSchema(UpdateCaseNotesSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { labId, labUser } = ctx;
		const { caseId, notes } = parsedInput;

		try {
			const prisma = await tenantPrisma(labId);
			await requireCase(prisma, caseId, labId);

			const actor = await prisma.labUser.findUnique({
				where: { id: labUser.id },
				select: { name: true },
			});
			const actorName = actor?.name ?? "Unknown";

			const [updatedCase] = await prisma.$transaction([
				prisma.case.update({
					where: { id: caseId, labId },
					data: { notes },
					select: { id: true, notes: true },
				}),

				prisma.caseActivityLog.create({
					data: buildLogEntry({
						caseId,
						labId,
						actorId: labUser.id,
						actorName,
						type: "NOTE_ADDED",
						summary: notes ? "Clinical notes updated" : "Clinical notes cleared",
						payload: {
							// Don't store the full note content in the payload —
							// notes can be long and are already on the Case record.
							// Store a truncated preview only.
							preview: notes ? notes.slice(0, 100) + (notes.length > 100 ? "…" : "") : null,
						},
					}),
				}),
			]);

			return { updatedCase };
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Delete-Case-Asset-Files-Action] Error", e.message);
			}
			throw e;
		}
	});

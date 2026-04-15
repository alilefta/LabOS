"use server";

import { ERRORS } from "@/lib/errors";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { PatientGender } from "@/schema/base/enums.base";
import { CaseSummaryMetadata } from "@/schema/composed/case.details";
import { APIError } from "better-auth";
import z from "zod";

const draftCaseMetadataInputSchema = z.object({
	draftCaseId: z.string().min(2).optional(),
	pricingPlansIDs: z.array(z.string().min(2)),
	clinicId: z.string().min(2),
	patientId: z.string().min(2),
	courierId: z.string().min(2).optional(),
	technicianId: z.string().min(2).optional(),
});

export const getDraftCaseMetadataAction = actionClientWithLab
	.metadata({
		actionName: "Get-Draft-Case-Metadata-Action",
		requiredLabRole: null,
	})
	.inputSchema(draftCaseMetadataInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		try {
			const { labId } = ctx;
			const { draftCaseId, pricingPlansIDs, clinicId, patientId, courierId, technicianId } = parsedInput;
			const prisma = await tenantPrisma(labId);

			const [draftCase, clinic, patient, courier, technician] = await Promise.all([
				// Draft Case
				draftCaseId
					? prisma.case.findUnique({
							where: {
								id: draftCaseId,
								labId,
								status: "DRAFT",
							},
							select: {
								caseNumber: true,
							},
						})
					: Promise.resolve(null),
				// Clinic
				prisma.clinic.findUnique({
					where: { id: clinicId, labId },
					select: {
						id: true,
						name: true,
						dentists: {
							select: {
								id: true,
								name: true,
								isOwner: true,
								isDefault: true,
							},
						},
					},
				}),
				// Patient
				prisma.patient.findUnique({
					where: { id: patientId, labId },
					select: {
						id: true,
						age: true,
						name: true,
						gender: true,
						description: true,
						cases: {
							select: {
								id: true,
							},
						},
					},
				}),
				// Courier
				courierId
					? prisma.labStaff.findUnique({
							where: { id: courierId, isActive: true, labId },
							select: { firstName: true, lastName: true, id: true },
						})
					: Promise.resolve(null),
				// Technician
				technicianId
					? prisma.labStaff.findUnique({
							where: { id: technicianId, isActive: true, labId },
							select: { firstName: true, lastName: true, id: true },
						})
					: Promise.resolve(null),
			]);

			let caseNumber = "";
			if (draftCase === null) {
				const lab = await prisma.lab.findUnique({
					where: {
						id: labId,
					},
					select: {
						nextCaseNumber: true,
					},
				});

				if (!lab) {
					throw ERRORS.LAB_NOT_FOUND;
				}

				caseNumber = `LAB-${lab.nextCaseNumber.toString().padStart(4, "0")}`;
			} else {
				caseNumber = draftCase.caseNumber;
			}

			const pricingPlanIDsNormalized = [...new Set(pricingPlansIDs)];

			const products = await prisma.casePricingPlan.findMany({
				where: {
					labId,

					id: {
						in: pricingPlanIDsNormalized,
					},
				},

				select: {
					name: true,
					clinicId: true,
					product: {
						select: {
							name: true,
							id: true,
							workType: {
								select: {
									id: true,
									name: true,
									caseCategory: {
										select: {
											name: true,
											id: true,
										},
									},
								},
							},
						},
					},
				},
			});

			return {
				caseNumber,
				clinicInfo: clinic,
				courier,
				patientInfo: patient,
				technicalDetails: products,
				technician,
			} as CaseSummaryMetadata;
		} catch (error) {
			console.error("[Get-Draft-Case-Metadata-Action] Error", error);
			if (error instanceof Error || error instanceof APIError) {
				throw ERRORS.INTERNAL_SERVER_ERROR;
			}
			throw error;
		}
	});

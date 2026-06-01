// data/team/get-staff-paystub.ts

import { generalPrisma, tenantPrisma } from '@/lib/prisma'
import { ERRORS } from '@/lib/errors'
import {
	daError,
	daSuccess,
	toDAError,
	DAResult,
} from '@/lib/data-access-errors'
import z from 'zod'
import { PayoutStatus } from '@/schema/base/enums.base'

const InputSchema = z.object({
	staffId: z.string().uuid('Invalid Staff ID format'),
	payoutId: z.string().uuid('Invalid Payout ID format'),
})

export interface StaffPaystubDTO {
	payoutNumber: string
	payoutDate: Date
	status: PayoutStatus
	staff: {
		id: string
		name: string
		jobTitle: string | null
		roleCategory: string
	}
	lab: {
		title: string
		subtitle: string | null
	}
	cases: {
		caseNumber: string
		patientName: string
		caseTotal: number
		commissionTotal: number
		productName: string // Added for auditing [3]
		teethCount: number // Added for auditing [3]
	}[]
	totalDisbursed: number
}

export async function getStaffPaystubData(
	staffId: string,
	payoutId: string,
): Promise<DAResult<StaffPaystubDTO>> {
	try {
		// --- GUARD 1: INPUT SANITIZATION ---
		const parsed = InputSchema.safeParse({ staffId, payoutId })
		if (!parsed.success) {
			return daError(ERRORS.INVALID_INPUT.toJSON())
		}

		// Public/Unauthenticated access: we resolve via global Prisma
		const prisma = generalPrisma

		// ── 2. THE SINGLE-JOIN DATABASE QUERY (N+1 Proof) ───────────────────
		// Collapses 3 separate queries from your old code into exactly ONE database read [2]
		const payout = await prisma.staffPayout.findFirst({
			where: {
				id: parsed.data.payoutId,
				staffId: parsed.data.staffId,
				// GUARD 2: Only show finalized/processing paychecks. Never show Drafts (PENDING_APPROVAL)
				status: { in: ['SETTLED', 'PROCESSING'] },
			},
			include: {
				lab: {
					select: { title: true, subtitle: true },
				},
				staff: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						jobTitle: true,
						roleCategory: true,
					},
				},
				caseAssignments: {
					include: {
						dentalCase: {
							select: {
								caseNumber: true,
								grandTotal: true,
								patient: { select: { name: true } },
								// Grab the product and teeth details for the itemized backlog [3]
								caseItems: {
									select: {
										product: { select: { name: true } },
										_count: { select: { selectedTeeth: true } },
									},
								},
							},
						},
					},
				},
			},
		})

		// GUARD 3: OBFUSCATE EXPIRED/VOIDED RECORDS
		// If the paycheck is voided or doesn't exist, return a flat 404
		if (!payout) {
			return daError(ERRORS.NOT_FOUND.toJSON())
		}

		// ── 3. MAP TO SANITIZED DTO ─────────────────────────────────────────
		const sanitizedPaystub: StaffPaystubDTO = {
			payoutNumber: payout.payoutNumber,
			payoutDate: payout.paidAt || payout.createdAt,
			status: payout.status,

			staff: {
				id: payout.staff.id,
				name: `${payout.staff.firstName} ${payout.staff.lastName}`,
				jobTitle: payout.staff.jobTitle,
				roleCategory: payout.staff.roleCategory,
			},

			lab: {
				title: payout.lab.title,
				subtitle: payout.lab.subtitle,
			},

			// Map and flatten case assignments into auditable line items [3]
			cases: payout.caseAssignments.map((ca) => {
				const c = ca.dentalCase
				const firstItem = c.caseItems[0]

				return {
					caseNumber: c.caseNumber,
					patientName: c.patient.name,
					caseTotal: Number(c.grandTotal ?? 0),
					commissionTotal: Number(ca.commissionTotal), // The frozen historical rate!
					productName: firstItem?.product?.name ?? 'Custom Restoration', // [3]
					teethCount: firstItem?._count.selectedTeeth ?? 0, // [3]
				}
			}),

			totalDisbursed: Number(payout.amount),
		}

		return daSuccess(sanitizedPaystub)
	} catch (e) {
		return toDAError(e)
	}
}

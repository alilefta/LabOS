// actions/team/finanical-ledger/issue-payout.ts
'use server'

import { z } from 'zod'
import { actionClientWithLab } from '@/lib/safe-action'
import { tenantPrisma } from '@/lib/prisma'
import { ERRORS } from '@/lib/errors'
import { RecordPayoutInputSchema } from '@/schema/composed/team/record-payout.schema' // Import our updated form schema
import { startOfDay } from 'date-fns'
import { computeCommission } from './helpers'
import { CommissionType, PayoutStatus } from '@/schema/base/enums.base'

export const issueStaffPayoutAction = actionClientWithLab
	.metadata({
		actionName: 'Issue-Staff-Payout-Action',
		// Security Guard: Only Managers or Owners can authorize payroll payouts [1]
		requiredLabRole: 'MANAGER',
	})
	.inputSchema(RecordPayoutInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx
		const { staffId, assignmentIds, method, reference, notes, paidAt } =
			parsedInput

		try {
			const prisma = await tenantPrisma(labId)

			// A. Security Check: Verify staff belongs to this lab tenant [2]
			const staffExists = await prisma.labStaff.findUnique({
				where: { id: staffId, labId },
				select: { id: true },
			})

			if (!staffExists) {
				throw ERRORS.NOT_FOUND
			}

			// ── B. THE ATOMIC HANDSHAKE TRANSACTION ─────────────────────────
			const transactionResult = await prisma.$transaction(
				async (tx) => {
					// 1. Fetch and verify the assignments are CURRENTLY UNPAID [2]
					const unpaidAssignments = await tx.caseStaffAssignment.findMany({
						where: {
							id: { in: assignmentIds },
							staffId,
							labId,
							isPaid: false, // Must be unpaid
						},
						select: {
							id: true,
							commissionType: true,
							commissionValue: true,
							dentalCase: {
								select: { grandTotal: true },
							},
						},
					})

					// 2. CONCURRENCY GUARD: Double-Spending Prevention [2]
					if (unpaidAssignments.length !== assignmentIds.length) {
						throw new Error(
							'One or more selected cases have already been paid or are invalid.',
						)
					}

					// 3. JIT COMMISSION COMPUTATION
					// We map the active data and calculate the total payout value [3]
					let totalDisbursedAmount = 0
					const calculatedAssignments = unpaidAssignments.map((assignment) => {
						const caseTotal = Number(assignment.dentalCase.grandTotal ?? 0)
						const commValue = Number(assignment.commissionValue ?? 0)

						const commissionTotal = computeCommission(
							assignment.commissionType as CommissionType,
							commValue,
							caseTotal,
						)

						totalDisbursedAmount += commissionTotal

						return {
							id: assignment.id,
							commissionTotal,
						}
					})

					// 4. SEQUENTIAL PAYCHECK NUMBER GENERATION (Locks the Lab row)
					const updatedLab = await tx.lab.update({
						where: { id: labId },
						data: { nextPayoutNumber: { increment: 1 } },
						select: { nextPayoutNumber: true },
					})

					const today = startOfDay(new Date())
					const year = today.getFullYear().toString().slice(-2)
					const month = (today.getMonth() + 1).toString().padStart(2, '0')
					const sequence = updatedLab.nextPayoutNumber
						.toString()
						.padStart(4, '0')
					const payoutNumber = `PAY-${year}${month}-${sequence}`

					// 5. CREATE THE PARENT STAFF PAYOUT (The Paystub) [1]
					const staffPayout = await tx.staffPayout.create({
						data: {
							labId,
							staffId,
							payoutNumber,
							amount: totalDisbursedAmount,
							method,
							status: 'SETTLED' as PayoutStatus, // Instantly settled on creation [4]
							reference: reference || null,
							notes: notes || null,
							paidAt,
						},
					})

					// 6. UPDATE AND FREEZE THE CASE ASSIGNMENTS [3]
					// We loop and update each assignment individually because each has a different calculated total.
					// For typical payroll sizes (< 50 cases), this loop runs in milliseconds inside Postgres.
					await Promise.all(
						calculatedAssignments.map((assignment) =>
							tx.caseStaffAssignment.update({
								where: { id: assignment.id },
								data: {
									isPaid: true,
									paidAt,
									payoutId: staffPayout.id, // Link to the new paystub!
									commissionTotal: assignment.commissionTotal, // 🔥 FREEZE: Lock the calculated value in DB forever! [3]
								},
							}),
						),
					)

					return {
						payoutNumber,
						totalDisbursed: totalDisbursedAmount,
						count: unpaidAssignments.length,
					}
				},
				{
					maxWait: 5000,
					timeout: 15000, // 15s to complete the heavy writes
				},
			)

			return {
				success: true,
				payoutNumber: transactionResult.payoutNumber,
				totalDisbursed: transactionResult.totalDisbursed,
				count: transactionResult.count,
			}
		} catch (error) {
			console.error('[Issue-Staff-Payout-Action] Error:', error)
			if (error instanceof Error) throw error
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})

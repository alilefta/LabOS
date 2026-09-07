import { beforeEach, describe, expect, it, vi } from 'vitest'

const prisma = vi.hoisted(() => ({
	staffPayout: { findFirst: vi.fn() },
}))

vi.mock('@/lib/prisma', () => ({
	tenantPrisma: vi.fn().mockResolvedValue(prisma),
}))

import {
	prismaPaystubRepository,
	STAFF_PAYSTUB_SELECT,
} from '@/data/team/paystub.repository'

describe('paystub repository', () => {
	beforeEach(() => vi.clearAllMocks())

	it('uses a tenant-scoped explicit projection and returns a minimized plain DTO', async () => {
		prisma.staffPayout.findFirst.mockResolvedValue({
			payoutNumber: 'PAY-001',
			paidAt: new Date('2026-09-01T00:00:00Z'),
			createdAt: new Date('2026-08-31T00:00:00Z'),
			status: 'SETTLED',
			amount: { toString: () => '45.00' },
			lab: { title: 'Lab A', subtitle: null },
			staff: {
				id: 'staff-a',
				firstName: 'Ahmed',
				lastName: 'Tech',
				jobTitle: 'Ceramist',
				roleCategory: 'CERAMIST',
			},
			caseAssignments: [
				{
					roleCategory: 'CERAMIST',
					commissionTotal: { toString: () => '45.00' },
					dentalCase: {
						caseNumber: 'CASE-1',
						caseItems: [
							{
								product: { name: 'Zirconia Crown' },
								_count: { selectedTeeth: 1 },
							},
						],
					},
				},
			],
		})

		const result = await prismaPaystubRepository.findPaystub({
			labId: 'lab-a',
			staffId: 'staff-a',
			payoutId: 'payout-a',
		})

		expect(prisma.staffPayout.findFirst).toHaveBeenCalledWith({
			where: {
				id: 'payout-a',
				labId: 'lab-a',
				staffId: 'staff-a',
				status: { in: ['SETTLED', 'PROCESSING'] },
			},
			select: STAFF_PAYSTUB_SELECT,
		})
		expect(result).toMatchObject({
			staff: { id: 'staff-a', name: 'Ahmed Tech' },
			cases: [
				{
					caseNumber: 'CASE-1',
					assignmentRole: 'CERAMIST',
					commissionTotal: 45,
					productName: 'Zirconia Crown',
				},
			],
			totalDisbursed: 45,
		})
		const serialized = JSON.stringify(result)
		expect(serialized).not.toContain('patient')
		expect(serialized).not.toContain('caseTotal')
		expect(serialized).not.toContain('notes')
		expect(serialized).not.toContain('reference')
	})
})

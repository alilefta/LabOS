import { describe, expect, it } from 'vitest'

import { normalizeCase } from '@/lib/mappers'

const decimalLike = (value: number) => ({
	toString: () => String(value),
	valueOf: () => value,
})

describe('Case DTO mapper', () => {
	it('converts Decimal fields and drops Prisma relation fields', () => {
		const rawCase = {
			id: 'case-1',
			patientId: 'patient-1',
			caseNumber: 'C-0001',
			labId: 'lab-1',
			caseCategoryId: null,
			status: 'NEW',
			grandTotal: decimalLike(125),
			manualDiscountAmount: decimalLike(12.5),
			manualDiscountReason: null,
			isWarranty: false,
			clinicId: null,
			dentistId: null,
			notes: null,
			deadline: null,
			createdAt: new Date('2026-09-02T10:00:00.000Z'),
			updatedAt: new Date('2026-09-02T10:00:00.000Z'),
			isRemake: false,
			originalCaseId: null,
			failureReason: null,
			failureFault: null,
			completedAt: null,
			deliveredAt: null,
			clinic: { phoneNumber: 'must-not-cross-boundary' },
		} as unknown as Parameters<typeof normalizeCase>[0]

		const dto = normalizeCase(rawCase)

		expect(dto.grandTotal).toBe(125)
		expect(dto.manualDiscountAmount).toBe(12.5)
		expect(dto).not.toHaveProperty('clinic')
		expect(JSON.stringify(dto)).not.toContain('must-not-cross-boundary')
	})
})

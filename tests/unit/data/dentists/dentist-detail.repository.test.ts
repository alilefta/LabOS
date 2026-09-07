import { beforeEach, describe, expect, it, vi } from 'vitest'

const prisma = vi.hoisted(() => ({ dentist: { findUnique: vi.fn() } }))

vi.mock('@/lib/prisma', () => ({
	tenantPrisma: vi.fn().mockResolvedValue(prisma),
}))

import {
	DENTIST_EDIT_SELECT,
	prismaDentistDetailRepository,
} from '@/data/dentists/dentist-detail.repository'

describe('Dentist detail repository', () => {
	beforeEach(() => vi.clearAllMocks())

	it('uses canonical tenant constraints and returns only the edit DTO projection', async () => {
		prisma.dentist.findUnique.mockResolvedValue({
			id: 'dentist-a',
			name: 'Dr Ahmed',
			email: null,
			phoneNumber: null,
			isOwner: false,
			isDefault: true,
			notes: null,
			avatarUrl: null,
			specialty: 'Prosthodontics',
			licenseNumber: 'L-1',
		})

		const result = await prismaDentistDetailRepository.findDentistDetail({
			labId: 'lab-a',
			clinicId: 'clinic-a',
			dentistId: 'dentist-a',
		})

		expect(prisma.dentist.findUnique).toHaveBeenCalledWith({
			where: { id: 'dentist-a', clinicId: 'clinic-a', labId: 'lab-a' },
			select: DENTIST_EDIT_SELECT,
		})
		expect(result).toEqual({
			id: 'dentist-a',
			name: 'Dr Ahmed',
			email: null,
			phoneNumber: null,
			isOwner: false,
			isDefault: true,
			notes: null,
			avatarUrl: null,
			specialty: 'Prosthodontics',
			licenseNumber: 'L-1',
		})
		expect(JSON.stringify(result)).not.toMatch(/labId|clinicId|createdAt|updatedAt/)
	})
})

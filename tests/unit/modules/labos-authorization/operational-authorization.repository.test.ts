import { beforeEach, describe, expect, it, vi } from 'vitest'

const prisma = vi.hoisted(() => ({
	dentist: { findUnique: vi.fn(), findFirst: vi.fn() },
}))

vi.mock('@/lib/prisma', () => ({ generalPrisma: prisma }))

import {
	DENTIST_ORGANIZATION_BOUNDARY_SELECT,
	DENTIST_READ_FACTS_SELECT,
	prismaDentistOrganizationBoundaryLookup,
	prismaDentistReadFactRepository,
} from '@/modules/labos-authorization/adapters/prisma/operational-authorization.repository'

describe('Prisma operational authorization repository', () => {
	beforeEach(() => vi.clearAllMocks())

	it('resolves Dentist tenant ownership with a minimal target lookup', async () => {
		prisma.dentist.findUnique.mockResolvedValue({
			lab: { organizationId: 'organization-a' },
		})

		await expect(
			prismaDentistOrganizationBoundaryLookup.findOrganizationBoundary(
				'dentist-a',
			),
		).resolves.toEqual({ organizationId: 'organization-a' })
		expect(prisma.dentist.findUnique).toHaveBeenCalledWith({
			where: { id: 'dentist-a' },
			select: DENTIST_ORGANIZATION_BOUNDARY_SELECT,
		})
	})

	it('loads tenant-scoped Dentist-to-Clinic relationship facts', async () => {
		prisma.dentist.findFirst.mockResolvedValue({
			id: 'dentist-a',
			labId: 'lab-a',
			clinicId: 'clinic-a',
			lab: { organizationId: 'organization-a' },
			clinic: { labId: 'lab-a' },
		})

		await expect(
			prismaDentistReadFactRepository.findDentistReadFacts({
				organizationId: 'organization-a',
				dentistId: 'dentist-a',
			}),
		).resolves.toEqual({
			dentistId: 'dentist-a',
			labId: 'lab-a',
			clinicId: 'clinic-a',
			organizationId: 'organization-a',
			relationshipsConsistent: true,
		})
		expect(prisma.dentist.findFirst).toHaveBeenCalledWith({
			where: {
				id: 'dentist-a',
				lab: { organizationId: 'organization-a' },
			},
			select: DENTIST_READ_FACTS_SELECT,
		})
	})
})

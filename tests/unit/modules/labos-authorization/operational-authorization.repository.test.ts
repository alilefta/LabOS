import { beforeEach, describe, expect, it, vi } from 'vitest'

const prisma = vi.hoisted(() => ({
	dentist: { findUnique: vi.fn(), findFirst: vi.fn() },
	workType: { findUnique: vi.fn() },
	product: { findUnique: vi.fn() },
}))

vi.mock('@/lib/prisma', () => ({ generalPrisma: prisma }))

import {
	DENTIST_ORGANIZATION_BOUNDARY_SELECT,
	DENTIST_READ_FACTS_SELECT,
	WORK_TYPE_ORGANIZATION_BOUNDARY_SELECT,
	PRODUCT_ORGANIZATION_BOUNDARY_SELECT,
	prismaDentistOrganizationBoundaryLookup,
	prismaDentistReadFactRepository,
	prismaWorkTypeOrganizationBoundaryLookup,
	prismaProductOrganizationBoundaryLookup,
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

	it('resolves WorkType tenant ownership with an authoritative identifier lookup', async () => {
		prisma.workType.findUnique.mockResolvedValue({
			lab: { id: 'lab-a', organizationId: 'organization-a' },
		})
		await expect(
			prismaWorkTypeOrganizationBoundaryLookup.findOrganizationBoundary('worktype-a'),
		).resolves.toEqual({ organizationId: 'organization-a' })
		expect(prisma.workType.findUnique).toHaveBeenCalledWith({
			where: { id: 'worktype-a' },
			select: WORK_TYPE_ORGANIZATION_BOUNDARY_SELECT,
		})
	})

	it('resolves Product tenant ownership with an authoritative identifier lookup', async () => {
		prisma.product.findUnique.mockResolvedValue({
			lab: { id: 'lab-a', organizationId: 'organization-a' },
		})
		await expect(
			prismaProductOrganizationBoundaryLookup.findOrganizationBoundary('product-a'),
		).resolves.toEqual({ organizationId: 'organization-a' })
		expect(prisma.product.findUnique).toHaveBeenCalledWith({
			where: { id: 'product-a' },
			select: PRODUCT_ORGANIZATION_BOUNDARY_SELECT,
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

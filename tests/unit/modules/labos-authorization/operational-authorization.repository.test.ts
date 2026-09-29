import { beforeEach, describe, expect, it, vi } from 'vitest'

const prisma = vi.hoisted(() => ({
	case: { findUnique: vi.fn(), findFirst: vi.fn() },
	dentist: { findUnique: vi.fn(), findFirst: vi.fn() },
	workType: { findUnique: vi.fn() },
	product: { findUnique: vi.fn() },
}))

vi.mock('@/lib/prisma', () => ({ generalPrisma: prisma }))

import {
	CASE_ORGANIZATION_BOUNDARY_SELECT,
	CASE_READ_FACTS_SELECT,
	DENTIST_ORGANIZATION_BOUNDARY_SELECT,
	DENTIST_READ_FACTS_SELECT,
	WORK_TYPE_ORGANIZATION_BOUNDARY_SELECT,
	PRODUCT_ORGANIZATION_BOUNDARY_SELECT,
	prismaCaseOrganizationBoundaryLookup,
	prismaCaseReadFactRepository,
	prismaDentistOrganizationBoundaryLookup,
	prismaDentistReadFactRepository,
	prismaWorkTypeOrganizationBoundaryLookup,
	prismaProductOrganizationBoundaryLookup,
} from '@/modules/labos-authorization/adapters/prisma/operational-authorization.repository'

describe('Prisma operational authorization repository', () => {
	beforeEach(() => vi.clearAllMocks())

	it('resolves Dentist tenant ownership with a minimal target lookup', async () => {
		prisma.dentist.findUnique.mockResolvedValue({
			lab: { id: 'lab-a', organizationId: 'organization-a' },
			clinic: { labId: 'lab-a' },
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

	it('resolves Case tenant ownership with a minimal target lookup', async () => {
		prisma.case.findUnique.mockResolvedValue({
			labId: 'lab-a', lab: { id: 'lab-a', organizationId: 'organization-a' },
		})

		await expect(
			prismaCaseOrganizationBoundaryLookup.findOrganizationBoundary('case-a'),
		).resolves.toEqual({ organizationId: 'organization-a' })
		expect(prisma.case.findUnique).toHaveBeenCalledWith({
			where: { id: 'case-a' },
			select: CASE_ORGANIZATION_BOUNDARY_SELECT,
		})
	})

	it.each([
		['missing Case', null],
		['Lab without an Organization link', { lab: { organizationId: null } }],
		['Case/Lab mismatch', { labId: 'lab-a', lab: { id: 'lab-b', organizationId: 'organization-a' } }],
	])('fails closed for a %s', async (_description, result) => {
		prisma.case.findUnique.mockResolvedValue(result)

		await expect(
			prismaCaseOrganizationBoundaryLookup.findOrganizationBoundary('case-a'),
		).resolves.toBeNull()
	})

	it('propagates Case/Lab lookup failure for the authorization kernel to deny', async () => {
		prisma.case.findUnique.mockRejectedValue(new Error('database unavailable'))

		await expect(
			prismaCaseOrganizationBoundaryLookup.findOrganizationBoundary('case-a'),
		).rejects.toThrow('database unavailable')
	})

	it('fails closed when the Dentist Clinic is not linked to the Dentist Lab', async () => {
		prisma.dentist.findUnique.mockResolvedValue({
			lab: { id: 'lab-a', organizationId: 'organization-a' },
			clinic: { labId: 'lab-b' },
		})

		await expect(
			prismaDentistOrganizationBoundaryLookup.findOrganizationBoundary('dentist-a'),
		).resolves.toBeNull()
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

	it('loads only authoritative Case assignment facts for the active Member', async () => {
		prisma.case.findFirst.mockResolvedValue({
			id: 'case-a',
			labId: 'lab-a',
			lab: { id: 'lab-a', organizationId: 'organization-a' },
			staffAssignments: [
				{
					caseId: 'case-a',
					labId: 'lab-a',
					staffId: 'staff-a',
					staff: {
						labId: 'lab-a',
						isActive: true,
						memberId: 'member-a',
						member: { id: 'member-a', organizationId: 'organization-a' },
					},
				},
			],
		})

		await expect(
			prismaCaseReadFactRepository.findCaseReadFacts({
				organizationId: 'organization-a',
				caseId: 'case-a',
				memberId: 'member-a',
			}),
		).resolves.toEqual({
			caseId: 'case-a',
			labId: 'lab-a',
			organizationId: 'organization-a',
			relationshipsConsistent: true,
			hasActiveMemberAssignment: true,
		})
		expect(prisma.case.findFirst).toHaveBeenCalledWith({
			where: { id: 'case-a', lab: { organizationId: 'organization-a' } },
			select: {
				...CASE_READ_FACTS_SELECT,
				staffAssignments: {
					where: { staff: { memberId: 'member-a' } },
					select: CASE_READ_FACTS_SELECT.staffAssignments.select,
				},
			},
		})
	})

	it('rejects inactive, unlinked, and mismatched Case assignment facts', async () => {
		prisma.case.findFirst.mockResolvedValue({
			id: 'case-a',
			labId: 'lab-a',
			lab: { id: 'lab-a', organizationId: 'organization-a' },
			staffAssignments: [
				{
					caseId: 'case-a',
					labId: 'lab-b',
					staffId: 'staff-a',
					staff: {
						labId: 'lab-a',
						isActive: false,
						memberId: 'member-b',
						member: { id: 'member-b', organizationId: 'organization-b' },
					},
				},
			],
		})

		await expect(
			prismaCaseReadFactRepository.findCaseReadFacts({
				organizationId: 'organization-a',
				caseId: 'case-a',
				memberId: 'member-a',
			}),
		).resolves.toMatchObject({ hasActiveMemberAssignment: false })
	})

	it('marks an inconsistent Case-to-Lab relationship untrusted', async () => {
		prisma.case.findFirst.mockResolvedValue({
			id: 'case-a', labId: 'lab-a',
			lab: { id: 'lab-b', organizationId: 'organization-a' },
			staffAssignments: [],
		})
		await expect(prismaCaseReadFactRepository.findCaseReadFacts({
			organizationId: 'organization-a', caseId: 'case-a', memberId: 'member-a',
		})).resolves.toMatchObject({ relationshipsConsistent: false })
	})
})

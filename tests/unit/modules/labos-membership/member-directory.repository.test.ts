import { beforeEach, describe, expect, it, vi } from 'vitest'

const prisma = vi.hoisted(() => ({
	member: { findMany: vi.fn() },
}))

vi.mock('@/lib/prisma', () => ({ generalPrisma: prisma }))

import {
	MEMBER_DIRECTORY_ERROR_CODES,
	MemberDirectoryRepositoryError,
	ORGANIZATION_MEMBER_DIRECTORY_ACCOUNT_SELECT,
	ORGANIZATION_MEMBER_DIRECTORY_STAFF_SELECT,
	prismaOrganizationMemberDirectoryRepository,
} from '@/modules/labos-membership'

describe('Prisma Organization Member directory repository', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		prisma.member.findMany.mockResolvedValue([])
	})

	it('anchors Member and optional Staff reads to the canonical tenant', async () => {
		await prismaOrganizationMemberDirectoryRepository.listPage({
			tenant: { organizationId: 'organization-a', labId: 'lab-a' },
			offset: 10,
			pageSize: 20,
		})

		expect(prisma.member.findMany).toHaveBeenCalledWith({
			where: { organizationId: 'organization-a' },
			select: {
				id: true,
				role: true,
				createdAt: true,
				authuser: {
					select: ORGANIZATION_MEMBER_DIRECTORY_ACCOUNT_SELECT,
				},
				labStaff: {
					where: { labId: 'lab-a' },
					select: ORGANIZATION_MEMBER_DIRECTORY_STAFF_SELECT,
				},
			},
			orderBy: { id: 'asc' },
			skip: 10,
			take: 21,
		})
	})

	it('selects no legacy, global-role, credential, HR, or compensation fields', () => {
		expect(ORGANIZATION_MEMBER_DIRECTORY_ACCOUNT_SELECT).toEqual({
			name: true,
			email: true,
			emailVerified: true,
			image: true,
		})
		expect(ORGANIZATION_MEMBER_DIRECTORY_ACCOUNT_SELECT).not.toHaveProperty(
			'id',
		)
		expect(ORGANIZATION_MEMBER_DIRECTORY_ACCOUNT_SELECT).not.toHaveProperty(
			'role',
		)
		expect(ORGANIZATION_MEMBER_DIRECTORY_ACCOUNT_SELECT).not.toHaveProperty(
			'labId',
		)
		expect(ORGANIZATION_MEMBER_DIRECTORY_STAFF_SELECT).not.toHaveProperty(
			'phoneNumber',
		)
		expect(ORGANIZATION_MEMBER_DIRECTORY_STAFF_SELECT).not.toHaveProperty(
			'address1',
		)
		expect(ORGANIZATION_MEMBER_DIRECTORY_STAFF_SELECT).not.toHaveProperty(
			'commissionValue',
		)
	})

	it('keeps two Organization queries isolated with independent Staff predicates', async () => {
		await prismaOrganizationMemberDirectoryRepository.listPage({
			tenant: { organizationId: 'organization-a', labId: 'lab-a' },
		})
		await prismaOrganizationMemberDirectoryRepository.listPage({
			tenant: { organizationId: 'organization-b', labId: 'lab-b' },
		})

		expect(prisma.member.findMany.mock.calls[0][0]).toMatchObject({
			where: { organizationId: 'organization-a' },
			select: { labStaff: { where: { labId: 'lab-a' } } },
		})
		expect(prisma.member.findMany.mock.calls[1][0]).toMatchObject({
			where: { organizationId: 'organization-b' },
			select: { labStaff: { where: { labId: 'lab-b' } } },
		})
	})

	it.each([
		[
			{ organizationId: '', labId: 'lab-a' },
			undefined,
			MEMBER_DIRECTORY_ERROR_CODES.INVALID_TENANT,
		],
		[
			{ organizationId: 'organization-a', labId: '' },
			undefined,
			MEMBER_DIRECTORY_ERROR_CODES.INVALID_TENANT,
		],
		[
			{ organizationId: 'organization-a', labId: 'lab-a' },
			{ pageSize: 101 },
			MEMBER_DIRECTORY_ERROR_CODES.INVALID_PAGINATION,
		],
		[
			{ organizationId: 'organization-a', labId: 'lab-a' },
			{ offset: -1 },
			MEMBER_DIRECTORY_ERROR_CODES.INVALID_PAGINATION,
		],
	] as const)(
		'fails before querying for malformed trusted input',
		async (tenant, pagination, code) => {
			await expect(
				prismaOrganizationMemberDirectoryRepository.listPage({
					tenant,
					...pagination,
				}),
			).rejects.toMatchObject({
				name: 'MemberDirectoryRepositoryError',
				code,
				message: 'Member directory request is invalid',
			})
			expect(prisma.member.findMany).not.toHaveBeenCalled()
		},
	)

	it('uses the default bounded page and maps a Member without Staff', async () => {
		prisma.member.findMany.mockResolvedValue([
			{
				id: 'member-owner',
				role: 'owner',
				createdAt: new Date('2026-08-20T10:00:00.000Z'),
				authuser: {
					name: 'Ali Owner',
					email: 'ali@example.test',
					emailVerified: true,
					image: null,
				},
				labStaff: null,
			},
		])

		await expect(
			prismaOrganizationMemberDirectoryRepository.listPage({
				tenant: { organizationId: 'organization-a', labId: 'lab-a' },
			}),
		).resolves.toMatchObject({
			items: [
				{
					memberId: 'member-owner',
					roles: ['owner'],
					staff: null,
				},
			],
			nextOffset: null,
		})
		expect(prisma.member.findMany).toHaveBeenCalledWith(
			expect.objectContaining({ skip: 0, take: 26 }),
		)
	})

	it('uses one sanitized repository error type', () => {
		const error = new MemberDirectoryRepositoryError(
			MEMBER_DIRECTORY_ERROR_CODES.INVALID_TENANT,
		)
		expect(error.message).not.toContain('organization')
		expect(error.message).not.toContain('lab')
	})
})

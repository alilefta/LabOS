import { describe, expect, it, vi } from 'vitest'

import { executeDentistAvatarCreate, executeDentistAvatarUpdate, type DentistAvatarCommandDependencies } from '@/modules/labos-files/dentist-avatar-command'
import type { TenantContext } from '@/platform/organizations'

const tenant: TenantContext = { userId: 'user-1', memberId: 'member-1', memberRole: 'manager', staffId: null, organizationId: 'organization-1', labId: 'lab-1', lab: { id: 'lab-1', title: 'Lab', slug: 'lab' } }
const clinicId = 'a57bfc7a-ae61-4405-a329-b5a98608aa02'
const dentistId = 'b57bfc7a-ae61-4405-a329-b5a98608aa02'
const grantId = 'e3f1d028-6ea5-442f-b913-5e54a7df1361'
const dentist = { id: dentistId, clinicId, labId: tenant.labId, name: 'Dr. Ada', email: null, phoneNumber: null, specialty: null, licenseNumber: null, avatarUrl: 'https://ufs.sh/f/verified-file', isOwner: false, isDefault: false, notes: null, isActive: true, createdAt: new Date(), updatedAt: new Date() }

function fixture() {
	const transaction = { clinic: { findFirst: vi.fn().mockResolvedValue({ id: clinicId, type: 'GROUP' }) }, dentist: { updateMany: vi.fn().mockResolvedValue({ count: 1 }), create: vi.fn().mockResolvedValue(dentist), findFirst: vi.fn().mockResolvedValue(dentist) } }
	const prisma = { ...transaction, $transaction: vi.fn((mutation) => mutation(transaction)) }
	const authorizationService = { require: vi.fn().mockResolvedValue(undefined) }
	const grantConsumer = { consumeTransactionally: vi.fn(async (_request, mutation) => mutation(transaction, { providerFileKey: 'verified-file', providerFileUrl: 'https://ufs.sh/f/verified-file' })) }
	const dependencies: DentistAvatarCommandDependencies = { authorizationService, grantConsumer: grantConsumer as DentistAvatarCommandDependencies['grantConsumer'], prisma: prisma as unknown as DentistAvatarCommandDependencies['prisma'], generateCorrelationId: () => 'correlation-1' }
	return { transaction, prisma, authorizationService, grantConsumer, dependencies }
}

const fields = { clinicId, name: 'Dr. Ada', isOwner: false, isDefault: false }

describe('Dentist avatar command', () => {
	it('authorizes before clinic, Dentist, or grant work', async () => {
		const { transaction, authorizationService, grantConsumer, dependencies } = fixture()
		authorizationService.require.mockRejectedValueOnce(new Error('denied'))
		await expect(executeDentistAvatarCreate(tenant, fields, dependencies)).rejects.toThrow('denied')
		expect(transaction.clinic.findFirst).not.toHaveBeenCalled()
		expect(transaction.dentist.create).not.toHaveBeenCalled()
		expect(grantConsumer.consumeTransactionally).not.toHaveBeenCalled()
	})

	it('creates in a transaction, ignores raw URLs, and keeps a no-grant avatar null', async () => {
		const { transaction, prisma, grantConsumer, dependencies } = fixture()
		await executeDentistAvatarCreate(tenant, { ...fields, avatarUrl: 'https://attacker.example/avatar' } as never, dependencies)
		expect(prisma.$transaction).toHaveBeenCalledTimes(1)
		expect(grantConsumer.consumeTransactionally).not.toHaveBeenCalled()
		expect(transaction.dentist.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ avatarUrl: null, labId: tenant.labId }) }))
	})

	it('consumes a create grant in the Dentist creation transaction', async () => {
		const { transaction, grantConsumer, dependencies } = fixture()
		await executeDentistAvatarCreate(tenant, { ...fields, imageUploadGrantId: grantId }, dependencies)
		expect(grantConsumer.consumeTransactionally).toHaveBeenCalledWith(expect.objectContaining({ boundaryId: 'N-FILE-108', purpose: 'dentist.avatar.create.stage', target: null }), expect.any(Function))
		expect(transaction.dentist.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ avatarUrl: 'https://ufs.sh/f/verified-file' }) }))
	})

	it('preserves an existing avatar without a grant and binds update to the authoritative Dentist ID', async () => {
		const { transaction, authorizationService, grantConsumer, dependencies } = fixture()
		await executeDentistAvatarUpdate(tenant, { ...fields, dentistId, avatarUrl: 'https://attacker.example/avatar' } as never, dependencies)
		expect(grantConsumer.consumeTransactionally).not.toHaveBeenCalled()
		expect(authorizationService.require).toHaveBeenCalledWith(expect.objectContaining({ boundaryId: 'N-FILE-109', target: { type: 'dentist', id: dentistId } }))
		expect(transaction.dentist.updateMany).toHaveBeenLastCalledWith(expect.objectContaining({ where: { id: dentistId, clinicId, labId: tenant.labId }, data: expect.not.objectContaining({ avatarUrl: expect.anything() }) }))
	})

	it.each(['expired', 'wrong tenant', 'wrong member', 'wrong purpose', 'replayed'])('does no Dentist mutation when the grant is %s', async (reason) => {
		const { transaction, grantConsumer, dependencies } = fixture()
		grantConsumer.consumeTransactionally.mockRejectedValueOnce(new Error(reason))
		await expect(executeDentistAvatarUpdate(tenant, { ...fields, dentistId, imageUploadGrantId: grantId }, dependencies)).rejects.toThrow(reason)
		expect(transaction.clinic.findFirst).not.toHaveBeenCalled()
		expect(transaction.dentist.updateMany).not.toHaveBeenCalled()
	})

	it('revalidates Clinic ownership and SOLO/inactive rules inside the mutation transaction', async () => {
		const { transaction, dependencies } = fixture()
		transaction.clinic.findFirst.mockResolvedValueOnce({ id: clinicId, type: 'SOLO' })
		await expect(executeDentistAvatarCreate(tenant, fields, dependencies)).rejects.toThrow('Dentist mutation is not allowed')
		expect(transaction.dentist.create).not.toHaveBeenCalled()
	})

	it('allows an active legacy Dentist at a SOLO Clinic to update without an avatar grant', async () => {
		const { transaction, grantConsumer, dependencies } = fixture()
		transaction.clinic.findFirst.mockResolvedValueOnce({ id: clinicId, type: 'SOLO' })
		await expect(executeDentistAvatarUpdate(tenant, { ...fields, dentistId }, dependencies)).resolves.toEqual(dentist)
		expect(grantConsumer.consumeTransactionally).not.toHaveBeenCalled()
		expect(transaction.dentist.updateMany).toHaveBeenLastCalledWith(expect.objectContaining({
			where: { id: dentistId, clinicId, labId: tenant.labId },
			data: expect.not.objectContaining({ avatarUrl: expect.anything() }),
		}))
	})
})

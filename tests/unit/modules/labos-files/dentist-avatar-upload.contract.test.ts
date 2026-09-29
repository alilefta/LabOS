import { describe, expect, it, vi } from 'vitest'

import {
	DENTIST_AVATAR_MUTATION_RULES,
	authorizeDentistAvatarStage,
	projectDentistAvatarStage,
} from '@/modules/labos-files/dentist-avatar-upload.contract'
import type { TenantContext } from '@/platform/organizations'
import { labOSUploadGrantRegistry } from '@/modules/labos-files/upload-grants'

const tenant: TenantContext = { userId: 'user-1', memberId: 'member-1', memberRole: 'admin', staffId: null, organizationId: 'organization-1', labId: 'lab-1', lab: { id: 'lab-1', title: 'Lab', slug: 'lab' } }
const dentistId = 'b57bfc7a-ae61-4405-a329-b5a98608aa02'

describe('Dentist avatar stage contract', () => {
	it('projects only approved closed create and update stages', () => {
		expect(projectDentistAvatarStage({ mode: 'create' })).toEqual({ boundaryId: 'N-FILE-108', permission: 'dentist.create', purpose: 'dentist.avatar.create.stage', target: null, operation: { kind: 'dentist.avatar.create.stage' } })
		expect(projectDentistAvatarStage({ mode: 'update', dentistId })).toEqual({ boundaryId: 'N-FILE-109', permission: 'dentist.update', purpose: 'dentist.avatar.update.stage', target: { type: 'dentist', id: dentistId }, operation: { kind: 'dentist.avatar.update.stage' } })
		expect(() => projectDentistAvatarStage({ mode: 'update', dentistId, purpose: 'attacker-controlled' })).toThrow()
	})

	it('keeps replacement grant-backed and removal unavailable', () => {
		expect(DENTIST_AVATAR_MUTATION_RULES).toEqual({ unchanged: 'preserve-existing-avatar', replace: 'consume-N-FILE-109-grant', remove: 'unavailable-pending-file-delete-policy' })
	})

	it('uses the registered 15-minute Dentist grant definitions', () => {
		expect(labOSUploadGrantRegistry.resolve('N-FILE-108', 'dentist.avatar.create.stage', null)).toMatchObject({ targetType: null, ttlMs: 15 * 60_000 })
		expect(labOSUploadGrantRegistry.resolve('N-FILE-109', 'dentist.avatar.update.stage', { type: 'dentist', id: dentistId })).toMatchObject({ targetType: 'dentist', ttlMs: 15 * 60_000 })
	})

	it('authorizes before issuing an opaque target-bound grant', async () => {
		const authorizationService = { require: vi.fn().mockResolvedValue(undefined) }
		const grantIssuer = { create: vi.fn().mockResolvedValue({ uploadGrantId: 'grant_123' }) }
		await expect(authorizeDentistAvatarStage({ tenant, stage: { mode: 'update', dentistId } }, { authorizationService, grantIssuer, generateCorrelationId: () => 'correlation-1' })).resolves.toEqual({ uploadGrantId: 'grant_123' })
		expect(authorizationService.require).toHaveBeenCalledWith(expect.objectContaining({ boundaryId: 'N-FILE-109', permission: 'dentist.update', target: { type: 'dentist', id: dentistId } }))
		expect(grantIssuer.create).toHaveBeenCalledWith({ tenant, boundaryId: 'N-FILE-109', purpose: 'dentist.avatar.update.stage', target: { type: 'dentist', id: dentistId }, correlationId: 'correlation-1' })
	})

	it('does not issue a grant on authorization denial', async () => {
		const authorizationService = { require: vi.fn().mockRejectedValue(new Error('denied')) }
		const grantIssuer = { create: vi.fn() }
		await expect(authorizeDentistAvatarStage({ tenant, stage: { mode: 'create' } }, { authorizationService, grantIssuer })).rejects.toThrow('denied')
		expect(grantIssuer.create).not.toHaveBeenCalled()
	})
})

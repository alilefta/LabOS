import { describe, expect, it, vi } from 'vitest'

const seams = vi.hoisted(() => ({ enabled: false, originAllowed: true,
	issue: vi.fn(), provider: vi.fn() }))
vi.mock('@/modules/labos-files/case-object-storage-activation', () => ({
	get CASE_OBJECT_STORAGE_UPLOAD_ACTIVE() { return seams.enabled },
	isConfiguredCaseUploadOrigin: () => seams.originAllowed,
}))
vi.mock('@/modules/labos-files/case-object-storage-upload', () => ({
	createCaseObjectStorageIntent: seams.issue,
	CaseObjectStorageUploadUnavailable: class CaseObjectStorageUploadUnavailable extends Error {},
}))
vi.mock('@/modules/labos-files/object-storage/config', () => ({ createConfiguredObjectStorage: seams.provider }))

import { POST } from '@/app/api/cases/[caseId]/clinical-upload/intent/route'

const caseId = '88888888-8888-4888-8888-888888888881'
const request = () => new Request(`https://lab-os-verification-deployment.vercel.app/api/cases/${caseId}/clinical-upload/intent`, {
	method: 'POST', headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({ filename: 'photo.png' }),
})

describe('hosted Case upload route gate', () => {
	it('denies a disabled or missing-configuration gate before grant or provider work', async () => {
		seams.enabled = false
		const response = await POST(request(), { params: Promise.resolve({ caseId }) })
		expect(response.status).toBe(404)
		expect(await response.json()).toEqual({ error: 'Unavailable' })
		expect(seams.issue).not.toHaveBeenCalled()
		expect(seams.provider).not.toHaveBeenCalled()
	})
	it('denies a wrong hosted request origin before grant or provider work', async () => {
		seams.enabled = true
		seams.originAllowed = false
		const response = await POST(request(), { params: Promise.resolve({ caseId }) })
		expect(response.status).toBe(404)
		expect(seams.issue).not.toHaveBeenCalled()
		expect(seams.provider).not.toHaveBeenCalled()
	})
	it('uses the existing grant service only after both hosted gates allow the request', async () => {
		seams.enabled = true
		seams.originAllowed = true
		const provider = { adapter: 'r2' }
		seams.provider.mockReturnValueOnce(provider)
		seams.issue.mockResolvedValueOnce({ uploadGrantId: caseId, upload: {
			url: 'https://private.example/signed', method: 'PUT',
			headers: { 'If-None-Match': '*' }, expiresAt: new Date('2030-01-01T00:00:00Z'),
		} })
		const response = await POST(request(), { params: Promise.resolve({ caseId }) })
		expect(response.status).toBe(201)
		expect(seams.issue).toHaveBeenCalledWith({ caseId, filename: 'photo.png' }, provider)
	})
})

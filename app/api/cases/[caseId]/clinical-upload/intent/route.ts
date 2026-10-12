import { z } from 'zod/v4'

import { CASE_OBJECT_STORAGE_UPLOAD_ACTIVE } from '@/modules/labos-files/case-object-storage-activation'
import { createCaseObjectStorageIntent, CaseObjectStorageUploadUnavailable } from '@/modules/labos-files/case-object-storage-upload'
import { createConfiguredObjectStorage } from '@/modules/labos-files/object-storage/config'
import { isTenantContextError, TENANT_CONTEXT_ERROR_CODES } from '@/platform/organizations/tenant-context'

const inputSchema = z.object({ filename: z.string().min(1).max(255) }).strict()
const headers = { 'Cache-Control': 'private, no-store' }

export async function POST(request: Request, context: { params: Promise<{ caseId: string }> }) {
	if (!CASE_OBJECT_STORAGE_UPLOAD_ACTIVE) return Response.json({ error: 'Unavailable' }, { status: 404, headers })
	try {
		const { caseId } = await context.params
		const input = inputSchema.parse(await request.json())
		const created = await createCaseObjectStorageIntent({ caseId, filename: input.filename },
			createConfiguredObjectStorage())
		return Response.json({ uploadGrantId: created.uploadGrantId,
			upload: { url: created.upload.url, method: created.upload.method,
				headers: created.upload.headers, expiresAt: created.upload.expiresAt.toISOString() },
		}, { status: 201, headers: { ...headers, 'Referrer-Policy': 'no-referrer' } })
	} catch (error) {
		if (isTenantContextError(error)) return Response.json({ error: 'Access denied' }, {
			status: error.code === TENANT_CONTEXT_ERROR_CODES.UNAUTHENTICATED ? 401 : 403, headers,
		})
		if (error instanceof CaseObjectStorageUploadUnavailable || error instanceof z.ZodError) {
			return Response.json({ error: 'Unavailable' }, { status: 404, headers })
		}
		throw error
	}
}

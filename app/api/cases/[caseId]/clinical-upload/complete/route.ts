import { z } from 'zod/v4'

import { CASE_OBJECT_STORAGE_UPLOAD_ACTIVE } from '@/modules/labos-files/case-object-storage-activation'
import { completeCaseObjectStorageUpload } from '@/modules/labos-files/case-object-storage-completion'
import { createConfiguredObjectStorage } from '@/modules/labos-files/object-storage/config'
import { S001Unavailable } from '@/modules/labos-files/jpeg-s001/identity'
import { isTenantContextError, TENANT_CONTEXT_ERROR_CODES } from '@/platform/organizations/tenant-context'

const inputSchema = z.object({ uploadGrantId: z.uuid() }).strict()
const headers = { 'Cache-Control': 'private, no-store' }

export async function POST(request: Request, context: { params: Promise<{ caseId: string }> }) {
	if (!CASE_OBJECT_STORAGE_UPLOAD_ACTIVE) return Response.json({ error: 'Unavailable' }, { status: 404, headers })
	try {
		const { caseId } = await context.params
		const input = inputSchema.parse(await request.json())
		// The path is only a scoped selector. Completion resolves canonical Case
		// identity from the grant and denies a mismatched path before retrieval.
		const completed = await completeCaseObjectStorageUpload(input.uploadGrantId,
			createConfiguredObjectStorage(), undefined, caseId)
		return Response.json(completed, { headers })
	} catch (error) {
		if (isTenantContextError(error)) return Response.json({ error: 'Access denied' }, {
			status: error.code === TENANT_CONTEXT_ERROR_CODES.UNAUTHENTICATED ? 401 : 403, headers,
		})
		if (error instanceof S001Unavailable || error instanceof z.ZodError) {
			return Response.json({ error: 'Unavailable' }, { status: 404, headers })
		}
		throw error
	}
}

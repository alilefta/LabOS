import { z } from 'zod/v4'

import { CASE_OBJECT_STORAGE_UPLOAD_ACTIVE, isConfiguredCaseUploadOrigin } from '@/modules/labos-files/case-object-storage-activation'
import { createCaseClinicalFirstAttachment, CaseClinicalAttachmentUnavailable } from '@/modules/labos-files/case-clinical-first-attachment'
import { createConfiguredObjectStorage } from '@/modules/labos-files/object-storage/config'
import { generalPrisma } from '@/lib/prisma'
import { requireTenantContext } from '@/platform/organizations'
import { isTenantContextError, TENANT_CONTEXT_ERROR_CODES } from '@/platform/organizations/tenant-context'

const schema = z.object({ uploadGrantId: z.uuid() }).strict()
const headers = { 'Cache-Control': 'private, no-store' }
const attach = createCaseClinicalFirstAttachment(generalPrisma, undefined, createConfiguredObjectStorage)

export async function POST(request: Request, context: { params: Promise<{ caseId: string }> }) {
	if (!CASE_OBJECT_STORAGE_UPLOAD_ACTIVE || !isConfiguredCaseUploadOrigin(request)) {
		return Response.json({ error: 'Unavailable' }, { status: 404, headers })
	}
	try {
		const { caseId } = await context.params
		const { uploadGrantId } = schema.parse(await request.json())
		const tenant = await requireTenantContext()
		await attach(uploadGrantId, { tenant, caseId })
		return Response.json({ attached: true }, { headers })
	} catch (error) {
		if (isTenantContextError(error)) return Response.json({ error: 'Access denied' }, {
			status: error.code === TENANT_CONTEXT_ERROR_CODES.UNAUTHENTICATED ? 401 : 403, headers })
		if (error instanceof CaseClinicalAttachmentUnavailable || error instanceof z.ZodError) {
			return Response.json({ error: 'Unavailable' }, { status: 404, headers })
		}
		return Response.json({ error: 'Unavailable' }, { status: 503, headers })
	}
}

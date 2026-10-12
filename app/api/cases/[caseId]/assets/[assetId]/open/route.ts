import { createCasePublicOpen, CasePublicOpenUnavailableError } from '@/modules/labos-files/case-public-open'
import { createConfiguredObjectStorage } from '@/modules/labos-files/object-storage/config'
import { isTenantContextError, TENANT_CONTEXT_ERROR_CODES } from '@/platform/organizations/tenant-context'

const openCaseAsset = createCasePublicOpen({ objectStorage: createConfiguredObjectStorage })

export async function GET(request: Request, context: { params: Promise<{ caseId: string; assetId: string }> }) {
	try {
		const { caseId, assetId } = await context.params
		const url = await openCaseAsset({
			caseId,
			assetId,
			...(new URL(request.url).search ? { unsupportedQuery: true } : {}),
		})
		return new Response(null, {
			status: 302,
			headers: {
				Location: url,
				'Cache-Control': 'private, no-store',
				'Referrer-Policy': 'no-referrer',
				'X-Content-Type-Options': 'nosniff',
			},
		})
	} catch (error) {
		if (isTenantContextError(error)) {
			const status = error.code === TENANT_CONTEXT_ERROR_CODES.UNAUTHENTICATED ? 401 : 403
			return Response.json({ error: 'Access denied' }, { status, headers: { 'Cache-Control': 'private, no-store' } })
		}
		if (error instanceof CasePublicOpenUnavailableError) {
			return Response.json({ error: 'Case asset unavailable' }, { status: 404, headers: { 'Cache-Control': 'private, no-store' } })
		}
		throw error
	}
}

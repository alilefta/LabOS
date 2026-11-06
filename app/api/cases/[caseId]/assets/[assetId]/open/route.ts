import { createCasePublicOpen, CasePublicOpenUnavailableError } from '@/modules/labos-files/case-public-open'
import { createConfiguredObjectStorage } from '@/modules/labos-files/object-storage/config'
import { isTenantContextError, TENANT_CONTEXT_ERROR_CODES } from '@/platform/organizations/tenant-context'
import { CASE_OBJECT_STORAGE_LOCAL_ACTIVE, CASE_OBJECT_STORAGE_MODE, isConfiguredCaseLocalOrigin, isConfiguredCaseReadOrigin } from '@/modules/labos-files/case-object-storage-activation'

const openCaseAsset = createCasePublicOpen({ objectStorage: createConfiguredObjectStorage })

export async function GET(request: Request, context: { params: Promise<{ caseId: string; assetId: string }> }) {
	if (CASE_OBJECT_STORAGE_MODE === 'HOSTED_VERIFICATION' && !isConfiguredCaseReadOrigin(request)) {
		return Response.json({ error: 'Case asset unavailable' }, { status: 404,
			headers: { 'Cache-Control': 'private, no-store' } })
	}
	try {
		const { caseId, assetId } = await context.params
		const url = await openCaseAsset({
			caseId,
			assetId,
			...(new URL(request.url).search ? { unsupportedQuery: true } : {}),
		})
		const destination = new URL(url)
		let localCookie: string | null = null
		const localOrigin = process.env.LABOS_LOCAL_OBJECT_ORIGIN
		if (CASE_OBJECT_STORAGE_LOCAL_ACTIVE &&
			localOrigin && destination.origin === new URL(localOrigin).origin &&
			destination.protocol === 'http:') {
			if (!isConfiguredCaseLocalOrigin(request)) throw new CasePublicOpenUnavailableError()
			const match = /^\/api\/local-case-objects\/([0-9a-f]{64})$/.exec(destination.pathname)
			const token = destination.hash.slice(1)
			if (!match || !/^[A-Za-z0-9_-]{1,512}\.[A-Za-z0-9_-]{43}$/.test(token)) {
				throw new CasePublicOpenUnavailableError()
			}
			localCookie = `labos_local_read_${match[1]}=${token}; Path=${destination.pathname}; Max-Age=120; HttpOnly; SameSite=Strict`
			destination.hash = ''
		}
		return new Response(null, {
			status: 302,
			headers: {
				Location: destination.toString(),
				...(localCookie ? { 'Set-Cookie': localCookie } : {}),
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
		return Response.json({ error: 'Case asset unavailable' }, { status: 503,
			headers: { 'Cache-Control': 'private, no-store' } })
	}
}

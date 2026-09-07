import {
	isTenantContextError,
	TENANT_CONTEXT_ERROR_CODES,
} from '@/platform/organizations'
import {
	LabOSNonActionBoundaryError,
} from '@/modules/labos-authorization/non-action-boundaries'
import {
	createNApi002DentistDetailLoader,
	NApi002DentistAuthorizationError,
} from '@/modules/labos-dentists/dentist-detail.loader'
import { prismaDentistDetailRepository } from '@/data/dentists/dentist-detail.repository'

const loadDentistDetail = createNApi002DentistDetailLoader({
	repository: prismaDentistDetailRepository,
})

export async function GET(
	request: Request,
	context: { params: Promise<{ dentistId: string }> },
) {
	try {
		const { dentistId } = await context.params
		const clinicId = new URL(request.url).searchParams.get('clinicId') ?? ''
		const dentist = await loadDentistDetail({ dentistId, clinicId })

		if (!dentist) {
			return Response.json({ error: 'Dentist not found' }, { status: 404 })
		}

		return Response.json({ dentist })
	} catch (error) {
		if (error instanceof LabOSNonActionBoundaryError) {
			return Response.json({ error: 'Invalid request' }, { status: 400 })
		}

		if (isTenantContextError(error)) {
			const status =
				error.code === TENANT_CONTEXT_ERROR_CODES.UNAUTHENTICATED ? 401 : 403
			return Response.json({ error: 'Access denied' }, { status })
		}

		if (error instanceof NApi002DentistAuthorizationError) {
			// Resource denials deliberately match not-found responses to avoid
			// disclosing whether a Dentist identifier exists in another tenant.
			return Response.json({ error: 'Dentist not found' }, { status: 404 })
		}

		throw error
	}
}

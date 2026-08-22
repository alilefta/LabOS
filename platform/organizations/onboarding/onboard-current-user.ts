import 'server-only'

import { headers } from 'next/headers'

import { getPlatformSession } from '@/platform/auth/session'

import { onboardOrganizationAndLab } from './organization-onboarding.service'
import {
	ORGANIZATION_ONBOARDING_ERROR_CODES,
	OrganizationOnboardingError,
	type OrganizationOnboardingRequest,
	type OrganizationOnboardingResult,
} from './organization-onboarding.types'

/**
 * Secure request-facing entry point for Organization + Lab onboarding.
 *
 * Identity and request headers are always derived from the authenticated
 * server request. They are intentionally absent from the public input so a
 * client cannot provision an Organization on behalf of another AuthUser or
 * select an active Organization in another session.
 */
export async function onboardCurrentUserOrganizationAndLab(
	request: OrganizationOnboardingRequest,
): Promise<OrganizationOnboardingResult> {
	const session = await getPlatformSession()

	if (!session) {
		throw new OrganizationOnboardingError(
			ORGANIZATION_ONBOARDING_ERROR_CODES.UNAUTHENTICATED,
			'An authenticated session is required for onboarding',
		)
	}

	return onboardOrganizationAndLab({
		...request,
		userId: session.user.id,
		requestHeaders: await headers(),
	})
}

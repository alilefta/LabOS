'use server'

import { ERRORS } from '@/lib/errors'
import { actionClientWithSession } from '@/lib/safe-action'
import {
	onboardCurrentUserOrganizationAndLab,
	ORGANIZATION_ONBOARDING_ERROR_CODES,
	OrganizationOnboardingError,
} from '@/platform/organizations'
import { CreateLabWorkspaceInputSchema } from '@/schema/composed/lab.details'

function mapOnboardingError(error: OrganizationOnboardingError): never {
	switch (error.code) {
		case ORGANIZATION_ONBOARDING_ERROR_CODES.UNAUTHENTICATED:
			throw ERRORS.UNAUTHORIZED
		case ORGANIZATION_ONBOARDING_ERROR_CODES.SLUG_CONFLICT:
			throw ERRORS.LAB_SLUG_TAKEN
		default:
			// Provider/database causes remain server-side. Safe actions return a
			// stable generic failure instead of leaking provisioning internals.
			throw ERRORS.INTERNAL_SERVER_ERROR
	}
}

/**
 * Creates or resumes the current user's Organization-backed LabOS workspace.
 *
 * New onboarding intentionally creates no legacy LabUser/LabStaff record and
 * never writes AuthUser.labId. Better Auth creates the owner Member, while the
 * platform service creates the linked Lab and default LabSettings, selects the
 * active Organization, and handles idempotent retries.
 */
export const createLabWorkspace = actionClientWithSession
	.metadata({
		actionName: 'Create-Lab-Workspace',
		requiredLabRole: null,
	})
	.inputSchema(CreateLabWorkspaceInputSchema)
	.action(async ({ parsedInput }) => {
		try {
			const result = await onboardCurrentUserOrganizationAndLab({
				organization: {
					name: parsedInput.lab.title,
					slug: parsedInput.lab.slug,
					logo: parsedInput.lab.brandAvatarUrl,
				},
				lab: {
					title: parsedInput.lab.title,
					slug: parsedInput.lab.slug,
					brandAvatarUrl: parsedInput.lab.brandAvatarUrl,
					subtitle: parsedInput.lab.subtitle,
				},
			})

			return {
				alreadyExists: result.status === 'existing',
				status: result.status,
				organizationId: result.organization.id,
				lab: result.lab,
			}
		} catch (error) {
			if (error instanceof OrganizationOnboardingError) {
				mapOnboardingError(error)
			}

			throw error
		}
	})

/**
 * @deprecated Use `createLabWorkspace`. Kept temporarily so external callers
 * do not break while the onboarding name is migrated.
 */
export const createLabAndLabUser = createLabWorkspace

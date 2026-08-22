export {
	getTenantContext,
	requireTenantContext,
	resolveTenantContext,
	isTenantContextError,
	TenantContextError,
	TENANT_CONTEXT_ERROR_CODES,
	type TenantContext,
	type TenantContextErrorCode,
} from './tenant-context'

export {
	organizationService,
	type OrganizationMembership,
	type OrganizationService,
	type ResolvedOrganizationTenant,
	type TenantLab,
	type TenantOrganization,
} from './organization.service'

export {
	resolveTenantActorCompatibility,
	type TenantActorContext,
} from './legacy-actor-compatibility'
export { toLegacyLabRole } from './legacy-role-compatibility'

export {
	onboardCurrentUserOrganizationAndLab,
	ORGANIZATION_ONBOARDING_ERROR_CODES,
	OrganizationOnboardingError,
	type OrganizationOnboardingErrorCode,
	type OrganizationOnboardingRequest,
	type OrganizationOnboardingResult,
} from './onboarding'

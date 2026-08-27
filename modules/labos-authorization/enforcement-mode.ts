/**
 * Runtime authorization modes. Shadow is the fail-safe default; V1 must be
 * enabled explicitly at process startup after the rollout gate is approved.
 */
export const LABOS_AUTHORIZATION_MODES = Object.freeze([
	'shadow',
	'v1',
	'legacy-rollback',
] as const)

export type LabOSAuthorizationMode =
	(typeof LABOS_AUTHORIZATION_MODES)[number]

/**
 * Reads the deployment-owned mode without accepting request input. Unknown
 * values deliberately fall back to shadow so a malformed deployment cannot
 * accidentally enforce an unverified path or bypass the V1 comparison.
 */
export function getLabOSAuthorizationMode(
	environment: Record<string, string | undefined> = process.env,
): LabOSAuthorizationMode {
	const configured = environment.LABOS_AUTHORIZATION_MODE?.trim().toLowerCase()
	if (
		configured === 'v1' ||
		configured === 'shadow' ||
		configured === 'legacy-rollback'
	) {
		return configured
	}
	return 'shadow'
}

export function isLabOSAuthorizationV1Enforced(
	environment: Record<string, string | undefined> = process.env,
): boolean {
	return getLabOSAuthorizationMode(environment) === 'v1'
}

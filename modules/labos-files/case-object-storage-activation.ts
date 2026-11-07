import 'server-only'

/** These identities belong only to the protected LabOS verification deployment. */
const VERIFICATION = Object.freeze({
	projectId: 'prj_wJiC2MYXpqpE9W4JIgxQnf8QfhqA',
	origin: 'https://lab-os-verification-deployment.vercel.app',
	supabaseRef: 'rvtubjrczuxdxfuazjmr',
	r2AccountId: '81491884397e7a318bb3fd334fd51496',
	r2Bucket: 'labos-r2-verification',
})

export type CaseObjectStorageMode = 'LOCAL' | 'HOSTED_VERIFICATION' | 'DISABLED'
type Environment = Readonly<Record<string, string | undefined>>
type Runtime = Readonly<{ platform: string; arch: string; node: string; napi: string | undefined }>

function verificationDatabase(url: string | undefined): boolean {
	if (!url) return false
	try {
		const parsed = new URL(url)
		if (!['postgres:', 'postgresql:'].includes(parsed.protocol) ||
			parsed.pathname !== '/postgres' || parsed.password === '') return false
		const direct = parsed.hostname === `db.${VERIFICATION.supabaseRef}.supabase.co` &&
			parsed.username === 'labos_verification_app'
		const pooled = /^aws-\d+-eu-central-1\.pooler\.supabase\.com$/.test(parsed.hostname) &&
			parsed.username === `labos_verification_app.${VERIFICATION.supabaseRef}`
		return direct || pooled
	} catch { return false }
}

/** Vercel system variables must be platform-exposed and target-attested. */
export function resolveCaseObjectStorageMode(
	env: Environment = process.env,
	runtime: Runtime = { platform: process.platform, arch: process.arch,
		node: process.versions.node, napi: process.versions.napi },
): CaseObjectStorageMode {
	if (env.NODE_ENV === 'development' && env.VERCEL !== '1' &&
		env.LABOS_CASE_IMAGE_LOCAL_ENABLED === '1') return 'LOCAL'
	if (env.NODE_ENV !== 'production' ||
		env.VERCEL !== '1' || env.VERCEL_PROJECT_ID !== VERIFICATION.projectId ||
		env.VERCEL_ENV !== 'production' || env.VERCEL_TARGET_ENV !== 'production' ||
		env.VERCEL_PROJECT_PRODUCTION_URL !== new URL(VERIFICATION.origin).hostname ||
		!/^dpl_[A-Za-z0-9]+$/.test(env.VERCEL_DEPLOYMENT_ID ?? '') ||
		env.BETTER_AUTH_URL !== VERIFICATION.origin ||
		!verificationDatabase(env.DATABASE_URL) || !env.LABOS_DATABASE_CA_CERT ||
		env.LABOS_R2_ACCOUNT_ID !== VERIFICATION.r2AccountId ||
		env.LABOS_R2_BUCKET !== VERIFICATION.r2Bucket ||
		!env.LABOS_R2_ACCESS_KEY_ID?.trim() || !env.LABOS_R2_SECRET_ACCESS_KEY?.trim() ||
		runtime.platform !== 'linux' || runtime.arch !== 'x64' ||
		!/^24\./.test(runtime.node) || runtime.napi !== '10') return 'DISABLED'
	return 'HOSTED_VERIFICATION'
}

export const CASE_OBJECT_STORAGE_MODE = resolveCaseObjectStorageMode()
export const CASE_OBJECT_STORAGE_LOCAL_ACTIVE = CASE_OBJECT_STORAGE_MODE === 'LOCAL'
export function isCaseObjectStorageUploadEnabled(mode: CaseObjectStorageMode, env: Environment = process.env): boolean {
	return mode === 'LOCAL' ||
		(mode === 'HOSTED_VERIFICATION' && env.LABOS_CASE_IMAGE_HOSTED_VERIFICATION_ENABLED === '1')
}
export const CASE_OBJECT_STORAGE_UPLOAD_ACTIVE = isCaseObjectStorageUploadEnabled(CASE_OBJECT_STORAGE_MODE)

/** Request Host is a secondary scope guard; it never establishes deployment identity. */
export function isCaseUploadOriginAllowed(request: Request, mode: CaseObjectStorageMode,
	uploadEnabled: boolean, env: Environment = process.env): boolean {
	if (!uploadEnabled) return false
	try {
		const url = new URL(request.url)
		const host = request.headers.get('host') ?? url.host
		if (mode === 'HOSTED_VERIFICATION') {
			const origin = request.headers.get('origin')
			return host === new URL(VERIFICATION.origin).host &&
				origin === VERIFICATION.origin
		}
		if (mode !== 'LOCAL') return false
		return `${url.protocol}//${host}` === new URL(env.LABOS_LOCAL_OBJECT_ORIGIN ?? '').origin
	} catch { return false }
}
export function isConfiguredCaseUploadOrigin(request: Request): boolean {
	return isCaseUploadOriginAllowed(request, CASE_OBJECT_STORAGE_MODE, CASE_OBJECT_STORAGE_UPLOAD_ACTIVE)
}

/** Read issuance survives an upload switch-off for already CONSUMED files. */
export function isConfiguredCaseReadOrigin(request: Request): boolean {
	if (CASE_OBJECT_STORAGE_MODE === 'DISABLED') return false
	if (CASE_OBJECT_STORAGE_LOCAL_ACTIVE) return isConfiguredCaseLocalOrigin(request)
	return request.headers.get('host') === new URL(VERIFICATION.origin).host
}

/** Historical local read guard retained for already accepted local private opens. */
export function isConfiguredCaseLocalOrigin(request: Request): boolean {
	return CASE_OBJECT_STORAGE_LOCAL_ACTIVE && isConfiguredCaseUploadOrigin(request)
}

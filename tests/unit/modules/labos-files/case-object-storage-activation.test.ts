import { describe, expect, it } from 'vitest'

import { isCaseObjectStorageUploadEnabled, isCaseUploadOriginAllowed, resolveCaseObjectStorageMode } from
	'@/modules/labos-files/case-object-storage-activation'

const runtime = { platform: 'linux', arch: 'x64', node: '24.11.0', napi: '10' }
const hosted = {
	NODE_ENV: 'production', VERCEL: '1',
	VERCEL_PROJECT_ID: 'prj_wJiC2MYXpqpE9W4JIgxQnf8QfhqA',
	VERCEL_ENV: 'production', VERCEL_TARGET_ENV: 'production',
	VERCEL_PROJECT_PRODUCTION_URL: 'lab-os-verification-deployment.vercel.app',
	VERCEL_DEPLOYMENT_ID: 'dpl_123abc',
	BETTER_AUTH_URL: 'https://lab-os-verification-deployment.vercel.app',
	DATABASE_URL: 'postgresql://labos_verification_app.rvtubjrczuxdxfuazjmr:synthetic@aws-0-eu-central-1.pooler.supabase.com:6543/postgres',
	LABOS_DATABASE_CA_CERT: 'synthetic-test-ca',
	LABOS_R2_ACCOUNT_ID: '81491884397e7a318bb3fd334fd51496',
	LABOS_R2_BUCKET: 'labos-r2-verification',
	LABOS_R2_ACCESS_KEY_ID: 'synthetic-test-key', LABOS_R2_SECRET_ACCESS_KEY: 'synthetic-test-secret',
	LABOS_CASE_IMAGE_HOSTED_VERIFICATION_ENABLED: '1',
}

describe('Case object storage activation boundary', () => {
	it('selects the hosted R2 provider only with the exact pinned identity and compatible runtime', () => {
		expect(resolveCaseObjectStorageMode(hosted, runtime)).toBe('HOSTED_VERIFICATION')
		expect(isCaseObjectStorageUploadEnabled('HOSTED_VERIFICATION', hosted)).toBe(true)
	})
	it.each([
		['NODE_ENV', 'development'], ['VERCEL', '0'], ['VERCEL_PROJECT_ID', 'prj_customer'],
		['VERCEL_ENV', 'preview'], ['VERCEL_TARGET_ENV', 'preview'],
		['VERCEL_PROJECT_PRODUCTION_URL', 'customer.example'], ['VERCEL_DEPLOYMENT_ID', 'wrong'],
		['BETTER_AUTH_URL', 'https://customer.example'],
		['DATABASE_URL', 'postgresql://labos_verification_app.other:synthetic@aws-0-eu-central-1.pooler.supabase.com:6543/postgres'],
		['LABOS_DATABASE_CA_CERT', ''], ['LABOS_R2_ACCOUNT_ID', 'other'],
		['LABOS_R2_BUCKET', 'customer-bucket'], ['LABOS_R2_ACCESS_KEY_ID', ''],
		['LABOS_R2_SECRET_ACCESS_KEY', ''],
	] as const)('fails closed on %s mismatch', (key, value) => {
		expect(resolveCaseObjectStorageMode({ ...hosted, [key]: value }, runtime)).toBe('DISABLED')
	})
	it.each([
		{ ...runtime, platform: 'win32' }, { ...runtime, arch: 'arm64' },
		{ ...runtime, node: '22.0.0' }, { ...runtime, napi: '9' },
	])('fails closed on runtime mismatch %#', (mismatch) => {
		expect(resolveCaseObjectStorageMode(hosted, mismatch)).toBe('DISABLED')
	})
	it('keeps existing reads bound to hosted R2 if the hosted upload flag is off', () => {
		const disabledUpload = { ...hosted, LABOS_CASE_IMAGE_HOSTED_VERIFICATION_ENABLED: '0' }
		expect(resolveCaseObjectStorageMode(disabledUpload, runtime)).toBe('HOSTED_VERIFICATION')
		expect(isCaseObjectStorageUploadEnabled('HOSTED_VERIFICATION', disabledUpload)).toBe(false)
		expect(isCaseObjectStorageUploadEnabled('HOSTED_VERIFICATION',
			{ ...hosted, LABOS_CASE_IMAGE_HOSTED_VERIFICATION_ENABLED: undefined })).toBe(false)
	})
	it('requires the canonical hosted Host and browser Origin on upload requests', () => {
		const url = 'https://lab-os-verification-deployment.vercel.app/api/cases/id/clinical-upload/intent'
		const request = (host: string, origin?: string) => new Request(url, { method: 'POST',
			headers: { Host: host, ...(origin ? { Origin: origin } : {}) } })
		const canonicalHost = 'lab-os-verification-deployment.vercel.app'
		expect(isCaseUploadOriginAllowed(request(canonicalHost, hosted.BETTER_AUTH_URL),
			'HOSTED_VERIFICATION', true)).toBe(true)
		expect(isCaseUploadOriginAllowed(request('customer.example', hosted.BETTER_AUTH_URL),
			'HOSTED_VERIFICATION', true)).toBe(false)
		expect(isCaseUploadOriginAllowed(request(canonicalHost, 'https://customer.example'),
			'HOSTED_VERIFICATION', true)).toBe(false)
		expect(isCaseUploadOriginAllowed(request(canonicalHost), 'HOSTED_VERIFICATION', true)).toBe(false)
		expect(isCaseUploadOriginAllowed(request(canonicalHost, hosted.BETTER_AUTH_URL),
			'HOSTED_VERIFICATION', false)).toBe(false)
	})
	it('allows the local adapter only in explicitly enabled local development', () => {
		const local = { NODE_ENV: 'development', LABOS_CASE_IMAGE_LOCAL_ENABLED: '1' }
		expect(resolveCaseObjectStorageMode(local, runtime)).toBe('LOCAL')
		expect(isCaseObjectStorageUploadEnabled('LOCAL', local)).toBe(true)
		expect(resolveCaseObjectStorageMode({ ...local, VERCEL: '1' }, runtime)).toBe('DISABLED')
		expect(resolveCaseObjectStorageMode({ ...local, NODE_ENV: 'production' }, runtime)).toBe('DISABLED')
		expect(isCaseObjectStorageUploadEnabled('DISABLED', hosted)).toBe(false)
	})
})

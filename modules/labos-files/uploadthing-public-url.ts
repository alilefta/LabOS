import 'server-only'

import { UTApi } from 'uploadthing/server'

/** Provider-specific, server-only lookup; this permanent public URL is never a private capability. */
export async function resolveUploadThingPublicUrl(providerObjectKey: string): Promise<string> {
	const result = await new UTApi().getFileUrls(providerObjectKey)
	if (result.data.length !== 1 || result.data[0].key !== providerObjectKey) {
		throw new Error('Case asset unavailable')
	}
	const url = new URL(result.data[0].url)
	if (url.protocol !== 'https:' || url.username || url.password) {
		throw new Error('Case asset unavailable')
	}
	return url.toString()
}

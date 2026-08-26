import { PostAuthContinuation } from '@/components/auth/post-auth-continuation'
import { safeRelativeCallbackUrl } from '@/lib/urls'

export default async function PostAuthContinuationPage({
	searchParams,
}: {
	searchParams: Promise<{ callbackUrl?: string }>
}) {
	const callbackUrl =
		safeRelativeCallbackUrl((await searchParams).callbackUrl) ?? '/dashboard'

	return <PostAuthContinuation callbackUrl={callbackUrl} />
}

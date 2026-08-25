import { OrganizationSelector } from '@/components/auth/organization-selector'
import { safeRelativeCallbackUrl } from '@/lib/urls'

export default async function SelectOrganizationPage({
	searchParams,
}: {
	searchParams: Promise<{ callbackUrl?: string }>
}) {
	const callbackUrl =
		safeRelativeCallbackUrl((await searchParams).callbackUrl) ?? '/dashboard'

	return <OrganizationSelector callbackUrl={callbackUrl} />
}

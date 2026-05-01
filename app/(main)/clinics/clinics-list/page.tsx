import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/get-session";
import { PermissionsProvider } from "@/providers/permissions-provider";
import { getCurrentLabUserRoleByAuthUserId } from "@/data/lab";
import { ClinicsClientWrapper } from "@/components/clinics/clinics-list/clinics-client-wrapper-page";

export default async function ClinicsListPage() {
	const session = await getServerSession();
	if (!session) redirect("/sign-in");

	const user = await getCurrentLabUserRoleByAuthUserId();
	if (!user) redirect("/onboarding");

	return (
		<PermissionsProvider
			userContext={{
				role: user.role,
				staffCategory: user.labStaff?.roleCategory,
				staffId: user.labStaff?.id,
			}}
		>
			<ClinicsClientWrapper labId={user.labId} />
		</PermissionsProvider>
	);
}

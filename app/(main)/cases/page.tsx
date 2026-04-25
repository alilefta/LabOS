import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/get-session";
import CasesClientWrapperPage from "@/components/cases/cases-client-wrapper-page";
import { PermissionsProvider } from "@/providers/permissions-provider";
import { getCurrentLabUserRoleByAuthUserId } from "@/data/lab";

export default async function Page() {
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
			<CasesClientWrapperPage labId={user.labId} />
		</PermissionsProvider>
	);
}

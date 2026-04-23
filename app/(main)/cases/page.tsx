import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/get-session";
import CasesClientWrapperPage from "@/components/cases/cases-client-wrapper-page";
import { getLabUserRoleByAuthUserId } from "@/data/lab";

export default async function Page() {
	const session = await getServerSession();

	if (!session) redirect("/sign-in");

	const labUser = await getLabUserRoleByAuthUserId(session.user.id);

	if (!labUser) redirect("/onboarding");

	return <CasesClientWrapperPage labId={labUser.labId} role={labUser.role} />;
}

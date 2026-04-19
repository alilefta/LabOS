import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/get-session";
import { generalPrisma } from "@/lib/prisma";
import CasesClientWrapperPage from "@/components/cases/cases-client-wrapper-page";

export default async function Page() {
	const session = await getServerSession();

	if (!session) redirect("/sign-in");

	const labUser = await generalPrisma.labUser.findUnique({
		where: { authUserId: session.user.id },
		select: { labId: true, role: true },
	});

	if (!labUser) redirect("/onboarding");

	return <CasesClientWrapperPage labId={labUser.labId} role={labUser.role} />;
}

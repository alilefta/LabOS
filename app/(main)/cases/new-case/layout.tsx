import { createLabOSAuthorizationActor } from "@/modules/labos-authorization/actor";
import { labosAuthorizationService } from "@/modules/labos-authorization/service";
import { requireTenantContext } from "@/platform/organizations";
import { redirect } from "next/navigation";

export const metadata = {
	title: "Create New Case | LabOS",
};
export default async function NewCaseLayout({ children }: { children: React.ReactNode }) {
	const tenant = await requireTenantContext();
	const decision = await labosAuthorizationService.can({
		actor: createLabOSAuthorizationActor(tenant),
		permission: "case.create",
	});

	if (!decision.allowed) redirect("/cases");

	return <>{children}</>;
}

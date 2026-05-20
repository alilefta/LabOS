import { getClinicSelectiveFieldById } from "@/data/clinics/get-clinic";
import { DentistRosterShell } from "./dentist-roaster-shell";
import { ClinicType } from "@/schema/base/enums.base";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getClinicDentistPersonasAction } from "@/actions/clinics/dentists/get-dentists";
import { QueryHydrationBoundary } from "@/providers/query-hydration-boundary";
import { getQueryClient } from "@/providers/get-query-client";
import { DentistPersonaDTO } from "@/schema/composed/clinics/clinic-dentists.dtos";

export async function ClinicRosterTab({ clinicId }: { clinicId: string }) {
	const results = await getClinicSelectiveFieldById(clinicId, { type: true });
	if (!results.success) return null;
	const { type } = results.data as { type: ClinicType };

	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["clinic-dentists", clinicId],
		queryFn: async () => {
			const res = await getClinicDentistPersonasAction({ clinicId });

			return (res?.data?.personas as DentistPersonaDTO[]) ?? [];
		},
	});

	return (
		<QueryHydrationBoundary state={dehydrate(queryClient)}>
			<DentistRosterShell currentClinicType={type} clinicId={clinicId} />
		</QueryHydrationBoundary>
	);
}

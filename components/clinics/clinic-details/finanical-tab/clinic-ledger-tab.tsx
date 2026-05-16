import { getQueryClient } from "@/providers/get-query-client";
import { ClinicInvoiceHistory } from "./clinic-invoice-history";
import { CustomPricingPlanList } from "./custom-pricing-plans-list";
import { QueryHydrationBoundary } from "@/providers/query-hydration-boundary";
import { dehydrate } from "@tanstack/react-query";

export async function ClinicLedgerTab({ clinicId }: { clinicId: string }) {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["pricing-plans", clinicId],
	});

	await queryClient.prefetchQuery({
		queryKey: ["invoices", clinicId],
	});

	return (
		<div className="flex flex-col gap-6 w-full h-full min-h-0">
			<QueryHydrationBoundary state={dehydrate(queryClient)}>
				<CustomPricingPlanList clinicId={clinicId} />
			</QueryHydrationBoundary>

			<QueryHydrationBoundary state={dehydrate(queryClient)}>
				<ClinicInvoiceHistory clinicId={clinicId} />
			</QueryHydrationBoundary>
		</div>
	);
}

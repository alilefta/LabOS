import { getQueryClient } from "@/providers/get-query-client";
import { ClinicInvoiceHistory } from "./clinic-invoice-history";
import { CustomPricingPlanList } from "./custom-pricing-plans-list";
import { QueryHydrationBoundary } from "@/providers/query-hydration-boundary";
import { dehydrate } from "@tanstack/react-query";
import { getClinicPricingPlansAction } from "@/actions/clinics/get-pricings";
import { DEFAULT_INVOICE_FILTERS } from "@/schema/composed/invoices/invoice-filters";
import { getClinicInvoicesAction } from "@/actions/clinics/invoices/get-invoices";
import { requireTenantContext } from "@/platform/organizations";
import { createLabOSAuthorizationActor } from "@/modules/labos-authorization/actor";
import { labosAuthorizationService } from "@/modules/labos-authorization/service";

export async function ClinicLedgerTab({ clinicId }: { clinicId: string }) {
	const queryClient = getQueryClient();
	const tenant = await requireTenantContext();
	const pricingDecision = await labosAuthorizationService.can({
		actor: createLabOSAuthorizationActor(tenant),
		permission: "clinic.financials.read",
		target: { type: "clinic", id: clinicId },
	});

	if (pricingDecision.allowed) {
		await queryClient.prefetchQuery({
			queryKey: ["clinic-pricing", clinicId],
			queryFn: async () => {
				const res = await getClinicPricingPlansAction({ clinicId });
				return res?.data?.plans ?? [];
			},
		});
	}

	await queryClient.prefetchInfiniteQuery({
		queryKey: ["clinic-invoices", clinicId, "", DEFAULT_INVOICE_FILTERS],
		queryFn: async ({ pageParam }) => {
			const res = await getClinicInvoicesAction({
				clinicId,
				cursor: pageParam as string | undefined,
				search: "",
				filters: DEFAULT_INVOICE_FILTERS,
				take: 20,
			});

			return res?.data ?? { invoices: [], nextCursor: null, totalCount: 0 };
		},
		initialPageParam: undefined as string | undefined,
	});

	return (
		<div className="flex flex-col gap-6 w-full h-full min-h-0">
			{pricingDecision.allowed && (
				<QueryHydrationBoundary state={dehydrate(queryClient)}>
					<CustomPricingPlanList clinicId={clinicId} />
				</QueryHydrationBoundary>
			)}

			<QueryHydrationBoundary state={dehydrate(queryClient)}>
				<ClinicInvoiceHistory clinicId={clinicId} />
			</QueryHydrationBoundary>
		</div>
	);
}

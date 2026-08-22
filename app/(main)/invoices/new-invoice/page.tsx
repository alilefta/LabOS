import { notFound, redirect } from "next/navigation";
import { getNewInvoiceOnboardingData } from "@/data/invoices/get-new-invoice-data";
import { NewInvoiceClient } from "@/components/invoices/new-invoice/new-invoice-client";
import z from "zod";
import { Metadata } from "next";
import { getQueryClient } from "@/providers/get-query-client";
import { getBaseClinicsBySearchQueryAction } from "@/actions/clinics/get-clinics";
import { ClinicDetailsUI } from "@/schema/composed/clinic.details";
import { QueryHydrationBoundary } from "@/providers/query-hydration-boundary";
import { dehydrate } from "@tanstack/react-query";
import { requireTenantContext } from "@/platform/organizations/tenant-context";

const QueryParamSchema = z.object({
	clinicId: z.uuid().optional(),
});

export const metadata: Metadata = {
	title: "New Account Receivable | LabOS",
};

export default async function NewInvoicePage({ searchParams }: { searchParams: Promise<{ clinicId?: string }> }) {
	// 1. Resolve URL Params safely
	const params = await searchParams;
	const parsedParams = QueryParamSchema.safeParse(params);
	const clinicId = parsedParams.success ? parsedParams.data.clinicId : undefined;

	const { labId } = await requireTenantContext();

	// 2. Execute Secure Data Access Function
	const result = await getNewInvoiceOnboardingData(clinicId);

	// 3. Security & Validation Checks
	if (!result.success) {
		if (result.error?.code === "UNAUTHORIZED") {
			redirect("/sign-in");
		}
		if (result.error?.code === "LAB_NOT_FOUND") {
			redirect("/onboarding");
		}
		// If clinicId was passed but not found/unauthorized
		notFound();
	}

	const onboardingData = result.data;
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["clinics-selection", "search", ""],
		queryFn: async () => {
			const res = await getBaseClinicsBySearchQueryAction({ searchQuery: "", limit: 10 });

			return (res.data?.clinics as ClinicDetailsUI[]) || [];
		},
		staleTime: 1000 * 60 * 5,
	});

	return (
		<div className="flex flex-col h-full bg-background relative">
			<QueryHydrationBoundary state={dehydrate(queryClient)}>
				<NewInvoiceClient initialClinicId={clinicId} onboardingData={onboardingData} labId={labId} />
			</QueryHydrationBoundary>
		</div>
	);
}

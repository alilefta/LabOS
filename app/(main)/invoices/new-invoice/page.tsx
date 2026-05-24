import { notFound, redirect } from "next/navigation";
import { getNewInvoiceOnboardingData } from "@/data/invoices/get-new-invoice-data";
import { NewInvoiceClient } from "@/components/invoices/new-invoice/new-invoice-client";
import z from "zod";
import { getServerSession } from "@/lib/get-session";

const QueryParamSchema = z.object({
	clinicId: z.uuid().optional(),
});

export default async function NewInvoicePage({ searchParams }: { searchParams: Promise<{ clinicId?: string }> }) {
	// 1. Resolve URL Params safely
	const params = await searchParams;
	const parsedParams = QueryParamSchema.safeParse(params);
	const clinicId = parsedParams.success ? parsedParams.data.clinicId : undefined;

	const session = await getServerSession();
	if (!session) redirect("/sign-in");

	const labId = session.user.labId;
	if (!labId) redirect("/onboarding");

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

	return (
		<div className="flex flex-col h-full bg-background relative">
			<NewInvoiceClient initialClinicId={clinicId} onboardingData={onboardingData} labId={labId} />
		</div>
	);
}

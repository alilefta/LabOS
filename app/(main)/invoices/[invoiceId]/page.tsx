// app/(main)/invoices/[invoiceId]/page.tsx

import { notFound, redirect } from "next/navigation";
import { getInvoiceDossierData } from "@/data/invoices/get-invoice-dossier"; // Import our new separated function
import { InvoiceDossierClient } from "@/components/invoices/invoice-details/invoice-dossier-client";
import { requireTenantContext } from "@/platform/organizations/tenant-context";
import { createLabOSAuthorizationActor } from "@/modules/labos-authorization/actor";
import { labosAuthorizationService } from "@/modules/labos-authorization/service";

interface Props {
	params: Promise<{ invoiceId: string }>;
	searchParams: Promise<{ action?: string }>;
}

export default async function InvoiceDetailPage({ params, searchParams }: Props) {
	const { invoiceId } = await params;
	const { action } = await searchParams;
	const tenant = await requireTenantContext();
	const readDecision = await labosAuthorizationService.can({
		actor: createLabOSAuthorizationActor(tenant),
		permission: "invoice.read",
		target: { type: "invoice", id: invoiceId },
	});
	if (!readDecision.allowed) redirect("/invoices");

	// 1. Fetch the secure, pre-validated and formatted source of truth [1]
	const result = await getInvoiceDossierData(invoiceId);

	// 2. Handle security redirects and error states [1]
	if (!result.success) {
		if (result.error?.code === "UNAUTHORIZED") {
			redirect("/sign-in");
		}
		if (result.error?.code === "LAB_NOT_FOUND") {
			redirect("/onboarding");
		}
		notFound();
	}

	const invoiceData = result.data;
	return (
		<div className="flex flex-col h-full bg-background">
			{/* Pass the pristine DTO straight to the Client Component */}
			<InvoiceDossierClient initialData={invoiceData} labId={tenant.labId} initialAction={action} />
		</div>
	);
}

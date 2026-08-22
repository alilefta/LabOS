// app/(main)/invoices/[invoiceId]/page.tsx

import { notFound, redirect } from "next/navigation";
import { getInvoiceDossierData } from "@/data/invoices/get-invoice-dossier"; // Import our new separated function
import { InvoiceDossierClient } from "@/components/invoices/invoice-details/invoice-dossier-client";
import { requireTenantContext } from "@/platform/organizations/tenant-context";

interface Props {
	params: Promise<{ invoiceId: string }>;
	searchParams: Promise<{ action?: string }>;
}

export default async function InvoiceDetailPage({ params, searchParams }: Props) {
	const { invoiceId } = await params;
	const { action } = await searchParams;

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
	const tenant = await requireTenantContext();

	return (
		<div className="flex flex-col h-full bg-background">
			{/* Pass the pristine DTO straight to the Client Component */}
			<InvoiceDossierClient initialData={invoiceData} labId={tenant.labId} initialAction={action} />
		</div>
	);
}

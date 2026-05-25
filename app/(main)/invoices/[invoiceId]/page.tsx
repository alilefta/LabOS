// app/(main)/invoices/[invoiceId]/page.tsx

import { notFound, redirect } from "next/navigation";
import { getInvoiceDossierData } from "@/data/invoices/get-invoice-dossier"; // Import our new separated function
import { getServerSession } from "@/lib/get-session";
import { InvoiceDossierClient } from "@/components/invoices/invoice-details/left-pane/invoice-dossier-client";

interface Props {
	params: Promise<{ invoiceId: string }>;
}

export default async function InvoiceDetailPage({ params }: Props) {
	const { invoiceId } = await params;

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
	const session = await getServerSession(); // Optional, if needed for passing labId down -- could be removed.

	return (
		<div className="flex flex-col h-full bg-background">
			{/* Pass the pristine DTO straight to the Client Component */}
			<InvoiceDossierClient initialData={invoiceData} labId={session?.user.labId ?? ""} />
		</div>
	);
}

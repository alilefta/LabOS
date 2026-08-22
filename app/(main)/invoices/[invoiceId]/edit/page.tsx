// app/(main)/invoices/[invoiceId]/edit/page.tsx

import { notFound, redirect } from "next/navigation";
import { getDraftInvoiceForEdit } from "@/data/invoices/get-draft-invoice";
import { DraftInvoiceHydrationDTO } from "@/schema/composed/invoices/draft-invoice.dtos";
import { EditInvoiceClient } from "@/components/invoices/edit-invoice/edit-invoice-client";
import { Metadata } from "next";
import { requireTenantContext } from "@/platform/organizations/tenant-context";

interface Props {
	params: Promise<{ invoiceId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { invoiceId } = await params;
	const { labId } = await requireTenantContext();
	// fetch post information
	const result = await getDraftInvoiceForEdit(invoiceId, labId);

	if (!result.success) {
		return {
			title: "Edit Account Receivable | LabOS",
		};
	}

	const invoice = result.data;

	return {
		title: `Edit ${invoice.invoiceNumber} | LabOS`,
	};
}
export default async function EditInvoicePage({ params }: Props) {
	const { invoiceId } = await params;

	const { labId } = await requireTenantContext();

	const result = await getDraftInvoiceForEdit(invoiceId, labId);

	if (!result.success) {
		if (result.error?.code === "INVOICE_NOT_FOUND") notFound();
		redirect("/invoices");
	}

	const invoice = result.data;

	// SECURITY GUARD: Graceful Redirect
	if (invoice.status !== "DRAFT") {
		redirect(`/invoices/${invoiceId}?action=adjust`);
	}

	// Strictly Typed Mapping
	const initialData: DraftInvoiceHydrationDTO = {
		id: invoice.id,
		clinicId: invoice.clinic.id,
		discountPercentage: invoice.appliedDiscountPercentage ?? 0,
		discountReason: invoice.discountReason || "",
		notes: invoice.notes || "",
		customDueDate: invoice.dueDate ?? undefined,
		billingTerms: invoice.dueDate ? "CUSTOM" : "RECEIPT",
		caseIds: invoice.cases.map((c) => c.caseId),
		clinicPhoneNumber: invoice.clinic.phoneNumber,
	};

	return (
		<div className="flex flex-col h-full bg-background relative overflow-hidden">
			<EditInvoiceClient labId={labId} initialData={initialData} clinicName={invoice.clinic.name} invoiceNumber={invoice.invoiceNumber} />
		</div>
	);
}

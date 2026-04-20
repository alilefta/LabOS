import { getDentalCaseById } from "@/data/cases/get-case";
import { CaseDetailsUI } from "@/schema/composed/case.details";
import { notFound } from "next/navigation";

export async function EditCasePage({ params }: { params: Promise<{ caseId: string }> }) {
	const { caseId } = await params;

	const results = await getDentalCaseById(caseId);

	if (!results.success) {
		notFound();
	}

	const dentalCase = results.data as CaseDetailsUI;

	if (dentalCase.status === "COMPLETED" || dentalCase.status === "DELIVERED") {
		// we should tell the user something
		// then redirect
	}

	return <div>Edit Case Client Form Component Goes here</div>;
}

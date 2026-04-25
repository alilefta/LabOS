import { notFound, redirect } from "next/navigation";
import { mapCaseToUpdateFormValues } from "@/lib/case-helpers";
import { getDentalCaseById } from "@/data/cases/get-case";
import { CaseDetailsUI } from "@/schema/composed/case.details";

interface Props {
	params: Promise<{ caseId: string }>;
}

export default async function EditCasePage({ params }: Props) {
	const { caseId } = await params;

	// 1. Fetch the absolute source of truth
	const result = await getDentalCaseById(caseId);

	if (!result.success || !result.data) {
		notFound();
	}

	const dentalCase = result.data as CaseDetailsUI;

	// 2. SECURITY GUARD: Status Lockout
	// You cannot use the "General Edit" form for terminal cases.
	if (["COMPLETED", "DELIVERED", "FAILED"].includes(dentalCase.status)) {
		redirect(`/cases/${caseId}?error=locked`);
	}

	// 3. Transform data for the form
	const initialData = mapCaseToUpdateFormValues(dentalCase);

	return (
		<div className="flex flex-col h-full">
			{/* 
                We pass the pre-mapped initialData to the client.
                We also pass the Case Number and Patient Name as "Display Only" props
                since they are immutable in the form.
            */}
			<EditCaseClient initialData={initialData} caseNumber={dentalCase.caseNumber} patientName={dentalCase.patient.name} />
		</div>
	);
}

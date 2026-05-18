import { notFound } from "next/navigation";
import { mapClinicToUpdateFormValues } from "@/lib/mappers/clinics/clinic-helpers";
import { getClinicById } from "@/data/clinics/get-clinic";
import { ClinicBase } from "@/schema/base/clinic.base";
import { EditClinicClient } from "@/components/clinics/edit-clinic/edit-clinic-client";

interface Props {
	params: Promise<{ clinicId: string }>;
}

export default async function EditClinicPage({ params }: Props) {
	const { clinicId } = await params;

	// 2. Fetch the absolute source of truth
	const result = await getClinicById(clinicId);

	if (!result.success || !result.data) {
		notFound();
	}

	const clinic = result.data as ClinicBase;

	// 3. Transform data for the interactive form
	const initialData = mapClinicToUpdateFormValues(clinic);

	return (
		<div className="flex flex-col h-full bg-background">
			{/* 
                We pass the pre-mapped initialData to the client.
                We also pass immutable/display-only props that the AI Auditor or Header might need.
            */}
			<EditClinicClient initialData={initialData} clinicId={clinic.id} clinicName={clinic.name} currentBalance={Number(clinic.currentBalance)} />
		</div>
	);
}

"use client";

import { memo, useCallback, useState } from "react";
import { DentistRosterGrid } from "./dentist-roaster-grid";
import { ClinicType } from "@/schema/base/enums.base";
import dynamic from "next/dynamic";
import { getDentistByIdAction } from "@/actions/dentists/get-dentist";
import { DentistBase } from "@/schema/base/dentist.base";
import { useQuery } from "@tanstack/react-query";
// import { parseAsString, useQueryState } from "nuqs";

const DentistEditorSheet = dynamic(() => import("../../../modals/dentists/dentist-editor-sheet").then((m) => m.DentistEditorSheet), {
	loading: () => <p>Loading Dentist Editor</p>,
	ssr: false,
});

interface Props {
	clinicId: string;
	currentClinicType: ClinicType;
}

export const DentistRosterShell = memo(function DentistRosterShell({ clinicId, currentClinicType }: Props) {
	// 1. URL State (Driven by nuqs)
	// shallow: true ensures we don't trigger a server-side navigation cascade!
	// const [urlDentistId, setUrlDentistId] = useQueryState("dId", parseAsString.withOptions({ shallow: true, history: "push" }));

	// 2. Local Visual State (For smooth animations)
	// This holds the ID while the sheet is sliding closed, even after the URL is cleared.
	const [sheetDentistId, setSheetDentistId] = useState<string | null>(null);
	const [isSheetOpen, setIsSheetOpen] = useState(false);

	const { data: initialData, isFetching: isFetchingEditData } = useQuery({
		queryKey: ["dentist-details", sheetDentistId],
		queryFn: async () => {
			if (!sheetDentistId) return null;
			const res = await getDentistByIdAction({ clinicId, dentistId: sheetDentistId });
			return res.data?.dentist as DentistBase;
		},
		enabled: !!sheetDentistId && sheetDentistId !== "new",
		staleTime: Infinity,
	});

	console.log("DentistRosterShell - rendered");

	// // Sync URL to Local State
	// useEffect(() => {
	// 	if (urlDentistId) {
	// 		setSheetDentistId(urlDentistId);
	// 	}
	// }, [urlDentistId]);

	// 3. The Handlers
	const handleEdit = useCallback(
		(id: string) => {
			setSheetDentistId(id); // Updates URL, opens sheet
			setIsSheetOpen(true);
		},
		[setSheetDentistId],
	);

	const handleClose = useCallback(() => {
		setIsSheetOpen(false);
		setTimeout(() => {
			setSheetDentistId(null); // clear ID only after animation
		}, 300);
	}, []);

	return (
		<>
			{/* The Grid stays pure and unaware of routing */}
			<DentistRosterGrid clinicId={clinicId} currentClinicType={currentClinicType} onEdit={handleEdit} />

			{/* The Sheet reads from the stabilized local state */}
			<DentistEditorSheet
				isOpen={isSheetOpen}
				isEdit={!!sheetDentistId && sheetDentistId !== "new"}
				onClose={handleClose}
				clinicId={clinicId}
				dentistIdToEdit={sheetDentistId && sheetDentistId !== "new" ? sheetDentistId : null}
				initialData={initialData}
				isFetchingEditData={isFetchingEditData}
			/>
		</>
	);
});

"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { DentistRosterGrid } from "./dentist-roaster-grid";
import { ClinicType } from "@/schema/base/enums.base";
import dynamic from "next/dynamic";

const preloadEditorSheet = () => import("../../../modals/dentists/dentist-editor-sheet");
const DentistEditorSheet = dynamic(() => import("../../../modals/dentists/dentist-editor-sheet").then((m) => m.DentistEditorSheet), { ssr: false });

interface Props {
	clinicId: string;
	currentClinicType: ClinicType;
}

export const DentistRosterShell = memo(function DentistRosterShell({ clinicId, currentClinicType }: Props) {
	const [sheetDentistId, setSheetDentistId] = useState<string | null>(null);
	const [isSheetOpen, setIsSheetOpen] = useState(false);

	// Prefetch the sheet bundle as soon as the roster tab mounts
	useEffect(() => {
		preloadEditorSheet();
	}, []);

	const handleEdit = useCallback((id: string) => {
		setSheetDentistId(id);
		setIsSheetOpen(true);
	}, []);

	const handleClose = useCallback(() => {
		setIsSheetOpen(false);
		setTimeout(() => {
			setSheetDentistId(null);
		}, 300);
	}, []);

	const dentistIdToEdit = sheetDentistId && sheetDentistId !== "new" ? sheetDentistId : null;

	return (
		<>
			<DentistRosterGrid clinicId={clinicId} currentClinicType={currentClinicType} onEdit={handleEdit} />
			<DentistEditorSheet
				key={sheetDentistId ?? "new"} // ← remounts when switching between dentists
				isOpen={isSheetOpen}
				isEdit={!!dentistIdToEdit}
				onClose={handleClose}
				clinicId={clinicId}
				dentistIdToEdit={dentistIdToEdit}
			/>
		</>
	);
});

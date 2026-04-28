"use client";

import Link from "next/link";
import { PencilLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePermissions } from "@/providers/permissions-provider";
import { CaseStatus } from "@/schema/base/enums.base";
import { NON_EDITABLE_STATUSES } from "@/lib/permissions/cases/clinical-status-rules";

interface EditCaseButtonProps {
	caseId: string;
	status: CaseStatus;
}

export function EditCaseButton({ caseId, status }: EditCaseButtonProps) {
	const { canEditClinical } = usePermissions();

	// 1. Hard Guard: Only authorized roles can even see the button
	if (!canEditClinical) return null;

	// 2. Hard Guard: Terminal cases cannot be edited via the general form
	const isTerminal = NON_EDITABLE_STATUSES.includes(status);
	if (isTerminal) return null;

	return (
		<Button
			variant="outline"
			asChild
			className="flex-1 md:flex-none rounded-xl font-semibold border-border bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 h-10 px-3 sm:px-4 transition-all group"
		>
			<Link href={`/cases/${caseId}/edit`}>
				<PencilLine className="w-4 h-4 sm:mr-2 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
				<span className="hidden sm:inline truncate">Edit Case</span>
			</Link>
		</Button>
	);
}

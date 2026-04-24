"use client";

import { CaseDetailsUI } from "@/schema/composed/case.details";
import { memo } from "react";
import { ProductionTeamCard } from "./team-card/production-team-card";
import { CaseFinancialCard } from "./finanical-card/case-financial-card";
import { DeadlineAndOriginCard } from "./deadline-and-origin-card/deadline-and-origin-card";

interface Props {
	dentalCase: CaseDetailsUI;
	userRole?: string;
}

export const CaseDetailsSidebar = memo(function CaseDetailsSidebar({ dentalCase }: Props) {
	return (
		<div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
			{/* CARD 1: Deadline & Origin */}
			<DeadlineAndOriginCard dentalCase={dentalCase} />
			{/* CARD 2: Production Team & Routing */}
			<ProductionTeamCard dentalCase={dentalCase} />
			{/* CARD 3: Financial Summary (Role Protected) */}
			<CaseFinancialCard dentalCase={dentalCase} />
		</div>
	);
});

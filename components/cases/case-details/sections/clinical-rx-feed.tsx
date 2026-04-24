"use client";

import { CaseWorkItemDetailsUI } from "@/schema/composed/case-work-item.details";
import { usePermissions } from "@/providers/permissions-provider";
import { WorkItemDossierCard } from "./work-item-dossier-card";

interface Props {
	workItems: CaseWorkItemDetailsUI[];
}

export function ClinicalRxFeed({ workItems }: Props) {
	const { canViewFinancials, canViewDetailedFinancials } = usePermissions();

	if (!workItems || workItems.length === 0) return null;

	return (
		<section className="space-y-6 animate-in fade-in duration-700 delay-300">
			<div className="flex items-center gap-3 mb-6">
				<div className="w-1.5 h-6 bg-primary rounded-full" />
				<h2 className="text-xl font-bold tracking-tight text-foreground">Clinical Prescription</h2>
				<span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-border text-[10px] font-mono font-bold text-muted-foreground">{workItems.length} ITEMS</span>
			</div>

			<div className="space-y-8">
				{workItems.map((item, index) => (
					<WorkItemDossierCard key={item.id || index} item={item} index={index} canViewFinancials={canViewFinancials} canViewDetailedFinancials={canViewDetailedFinancials} />
				))}
			</div>
		</section>
	);
}

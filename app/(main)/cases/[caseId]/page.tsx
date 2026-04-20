import { notFound } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Printer, ArrowRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaseDetailsSidebar } from "@/components/cases/case-details/case-details-sidebar";
import { CaseDetailsUI } from "@/schema/composed/case.details";
import { ProductionPipelineStepper } from "@/components/cases/case-details/sections/production-pipeline-stepper";
import { NeuralAuditorCard } from "@/components/cases/case-details/sections/neural-auditor-card";
import { ClinicalRxFeed } from "@/components/cases/case-details/sections/clinical-rx-feed";
import { getDentalCaseById } from "@/data/cases/get-case";
import { DigitalAssetVault } from "@/components/cases/case-details/sections/digital-asset-vault";
import { AuditTrailLog } from "@/components/cases/case-details/sections/audit-trail-log";

export const metadata = {
	title: "Case Dossier | LabOS",
};

export default async function CaseDossierPage({ params }: { params: Promise<{ caseId: string }> }) {
	// 1. SERVER-SIDE DATA FETCHING
	const { caseId } = await params;

	const results = await getDentalCaseById(caseId);

	if (!results.success) {
		notFound();
	}

	const dentalCase = results.data as CaseDetailsUI;

	return (
		<div className="flex flex-col h-full animate-in fade-in duration-700 bg-background">
			{/* --- STICKY COMMAND HEADER --- */}
			<header className="shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 sticky top-0 z-30 bg-background/80 backdrop-blur-xl pt-4 pb-4 px-4 sm:px-8 border-b border-border shadow-sm">
				<div className="flex items-start sm:items-center gap-3 sm:gap-4">
					<Link href="/cases" className="shrink-0 mt-0.5 sm:mt-0">
						<Button
							variant="outline"
							size="icon"
							className="rounded-xl border-border bg-white dark:bg-white/5 shadow-sm hover:bg-slate-50 dark:hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10 transition-colors"
						>
							<ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-zinc-400" />
						</Button>
					</Link>
					<div className="flex flex-col min-w-0">
						<div className="flex items-center gap-3">
							<h1 className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-foreground line-clamp-1">#{dentalCase.caseNumber}</h1>
							<span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
								<ShieldCheck className="w-3 h-3" /> AI Audited
							</span>
						</div>
						<p className="text-xs sm:text-sm text-muted-foreground mt-0.5 line-clamp-1">
							Created on {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(dentalCase.createdAt)}
						</p>
					</div>
				</div>

				<div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto mt-1 md:mt-0">
					<Button
						variant="outline"
						className="flex-1 md:flex-none rounded-xl font-semibold border-border bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 h-10 px-3 sm:px-4 transition-all"
					>
						<Printer className="w-4 h-4 sm:mr-2 shrink-0" />
						<span className="hidden sm:inline truncate">Work Ticket</span>
					</Button>

					{/* DYNAMIC STATUS BUTTON */}
					<Button className="flex-[2] md:flex-none rounded-xl bg-primary text-primary-foreground h-10 px-4 sm:px-6 font-bold shadow-premium hover:bg-primary/90 transition-all">
						{dentalCase.status === "NEW" ? "Start Processing" : "Advance Status"}
						<ArrowRight className="w-4 h-4 ml-1.5 sm:ml-2 shrink-0" />
					</Button>
				</div>
			</header>

			{/* --- MAIN 70/30 BENTO BOX LAYOUT --- */}
			<div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-8 relative z-10">
				{/* Subtle Ambient Glow for Dark Mode */}
				<div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10 dark:block hidden"></div>

				<div className="w-full max-w-[1800px] mx-auto flex flex-col xl:flex-row gap-8">
					{/* LEFT PANE: CLINICAL FEED (70%) */}
					<div className="flex-1 space-y-8 min-w-0">
						<NeuralAuditorCard />
						<ProductionPipelineStepper currentStatus={dentalCase.status} />
						<ClinicalRxFeed workItems={dentalCase.caseItems} />
						<DigitalAssetVault assets={dentalCase.caseAssetFiles ?? []} />
						<AuditTrailLog logs={dentalCase?.caseActivityLogs?.map((cal) => ({ ...cal, dentalCase: null, lab: null })) ?? []} />

						{/* Placeholder to keep layout height visible during dev */}
						<div className="h-96 rounded-[24px] border-2 border-dashed border-border flex items-center justify-center bg-slate-50/50 dark:bg-white/[0.02]">
							<p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Clinical Feed (Component 1/5)</p>
						</div>
					</div>

					{/* RIGHT PANE: LOGISTICS & META (30%) */}
					<aside className="w-full xl:w-[400px] shrink-0">
						{/* Wrapping in sticky so it stays visible while scrolling the long clinical feed */}
						<div className="sticky top-8 space-y-6 flex flex-col">
							<CaseDetailsSidebar dentalCase={dentalCase} />
						</div>
					</aside>
				</div>
			</div>
		</div>
	);
}

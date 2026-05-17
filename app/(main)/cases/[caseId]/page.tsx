import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Printer, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaseDetailsSidebar } from "@/components/cases/case-details/sidebar/case-details-sidebar";
import { CaseDetailsUI } from "@/schema/composed/case.details";
import { ProductionPipelineStepper } from "@/components/cases/case-details/sections/production-pipeline-stepper";
import { NeuralAuditorCard } from "@/components/cases/case-details/sections/neural-auditor-card";
import { ClinicalRxFeed } from "@/components/cases/case-details/sections/clinical-rx-feed";
import { getDentalCaseById } from "@/data/cases/get-case";
import { DigitalAssetVault } from "@/components/cases/case-details/sections/digital-asset-vault";
import { AuditTrailLog } from "@/components/cases/case-details/sections/audit-trail-log";
import { AdvanceStatusButton } from "@/components/cases/case-details/advance-case-status/advance-status-button";
import { getServerSession } from "@/lib/get-session";
import { getCurrentLabUserRoleByAuthUserId } from "@/data/lab";
import { EditCaseButton } from "@/components/cases/case-details/edit-case-button/edit-case-button";
import { Metadata } from "next";

interface PageProps {
	params: Promise<{ caseId: string }>;
}

// Dynamically generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const id = (await params).caseId;

	const results = await getDentalCaseById(id);

	if (!results.success)
		return {
			title: `Case ${id} | LabOS`,
		};

	const { patient } = results.data as CaseDetailsUI;

	return {
		title: `Case ${patient?.name ?? "N/A"} Dossier | LabOS`,
	};
}

export default async function CaseDossierPage({ params }: { params: Promise<{ caseId: string }> }) {
	const { caseId } = await params;
	console.log("Case Details page re-rendered");
	const session = await getServerSession();
	if (!session) redirect("/sign-in");

	const labUser = await getCurrentLabUserRoleByAuthUserId();
	if (!labUser) redirect("/onboarding");

	const results = await getDentalCaseById(caseId);
	if (!results.success) notFound();

	const dentalCase = results.data as CaseDetailsUI;

	return (
		<div className="flex flex-col h-full animate-in fade-in duration-700 bg-background relative overflow-hidden">
			{/* --- STICKY COMMAND HEADER --- */}
			<header className="shrink-0 sticky top-0 z-30 bg-background/80  border-b border-border">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 pb-4 px-4 sm:px-6 lg:px-8 max-w-500 mx-auto w-full">
					{/* LEFT: Identity */}
					<div className="flex items-start sm:items-center gap-3 sm:gap-4">
						<Link href="/cases" className="shrink-0">
							<Button
								variant="outline"
								size="icon"
								className="rounded-xl border-border bg-white dark:bg-white/5 shadow-sm hover:border-primary/30 transition-all h-9 w-9 sm:h-10 sm:w-10"
							>
								<ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-zinc-400" />
							</Button>
						</Link>
						<div className="flex flex-col min-w-0">
							<div className="flex items-center gap-3">
								<h1 className="text-xl sm:text-2xl font-mono font-black tracking-tighter text-foreground line-clamp-1">#{dentalCase.caseNumber}</h1>
								<div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest shadow-sm">
									<ShieldCheck className="w-3 h-3" /> AI Audited
								</div>
							</div>
							<p className="text-[11px] sm:text-xs font-medium text-muted-foreground mt-0.5 line-clamp-1 flex items-center gap-2">
								<span className="uppercase tracking-widest opacity-60">Registered:</span>
								<span className="text-foreground">
									{new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(dentalCase.createdAt)}
								</span>
							</p>
						</div>
					</div>

					{/* RIGHT: Actions */}
					<div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto">
						<Button
							variant="outline"
							className="flex-1 md:flex-none rounded-xl font-bold border-border bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 h-10 px-4 transition-all shadow-sm text-xs"
						>
							<Printer className="w-4 h-4 mr-2 opacity-60" />
							Work Ticket
						</Button>

						<EditCaseButton caseId={dentalCase.id} status={dentalCase.status} />

						<AdvanceStatusButton caseId={dentalCase.id} currentStatus={dentalCase.status} staffAssignments={dentalCase.staffAssignments ?? []} />
					</div>
				</div>
			</header>

			{/* --- MAIN WORKSPACE --- */}
			{/* Independent scroll pane for the content */}
			<div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 w-full">
				{/* Ambient Glow: Restricted to the scrollable area */}
				<div
					className="absolute top-0 inset-x-0 h-125 pointer-events-none -z-10"
					style={{
						background: "radial-gradient(ellipse at top, rgba(var(--glow-primary-rgb), 0.06) 0%, transparent 70%)",
					}}
				/>
				<div className="w-full max-w-500 mx-auto flex flex-col xl:flex-row gap-8 p-4 sm:p-6 lg:p-8">
					{/* LEFT PANE: CLINICAL FEED (70%) */}
					<div className="flex-1 space-y-8 min-w-0">
						<NeuralAuditorCard />
						<ProductionPipelineStepper currentStatus={dentalCase.status} />
						<ClinicalRxFeed workItems={dentalCase.caseItems} />
						<DigitalAssetVault assets={dentalCase.caseAssetFiles ?? []} />
						{dentalCase.caseActivityLogs && dentalCase.caseActivityLogs.length > 0 && (
							<AuditTrailLog logs={dentalCase?.caseActivityLogs?.map((cal) => ({ ...cal, dentalCase: null, lab: null })) ?? []} />
						)}
					</div>

					{/* RIGHT PANE: LOGISTICS & META (30%) */}
					<aside className="w-full xl:w-96 shrink-0">
						{/* 
								Sticky Fix: top-8 ensures it aligns with the top of the first card 
								as you scroll the clinical feed.
							*/}
						<div className="sticky top-0 xl:top-2 space-y-6 flex flex-col pb-12">
							<CaseDetailsSidebar dentalCase={dentalCase} />
						</div>
					</aside>
				</div>
			</div>
		</div>
	);
}

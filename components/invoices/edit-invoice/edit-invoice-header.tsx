"use client";

import { ChevronLeft, LoaderCircle, Save, PenTool } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
	isSavingDraft: boolean;
	onSaveDraft: () => void;
	clinicId: string | undefined;
	selectedCount: number;
	invoiceNumber: string; // e.g., "INV-2605-0012"
	invoiceId: string; // Needed to route back to the dossier
}

export function EditInvoiceHeader({ clinicId, isSavingDraft, onSaveDraft, selectedCount, invoiceNumber, invoiceId }: Props) {
	// ── EDIT VALIDATION LOGIC ──────────────────────────────────────
	// A draft edit is valid to save as long as a clinic is attached and at least 1 case is checked
	const isSaveEnabled = !!clinicId && selectedCount > 0;

	return (
		<header className="shrink-0 sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm transition-all duration-300">
			{/* Inner container handles max-width, centering, and padding [2] */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 px-4 sm:px-6 lg:px-8 max-w-500 mx-auto w-full">
				{/* LEFT: Back Navigation & Context */}
				<div className="flex items-start sm:items-center gap-3 sm:gap-4">
					{/* WAYFINDING FIX: Routes back to the specific Invoice Dossier, not the global list */}
					<Link href={`/invoices/${invoiceId}`} className="shrink-0">
						<Button
							variant="outline"
							size="icon"
							className="rounded-xl border-border bg-white dark:bg-white/5 shadow-sm hover:border-emerald-500/30 hover:text-emerald-600 transition-all h-9 w-9 sm:h-10 sm:w-10"
						>
							<ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-zinc-400" />
						</Button>
					</Link>

					<div className="flex flex-col min-w-0">
						<div className="flex items-center gap-3 mb-0.5">
							<h1 className="text-xl sm:text-2xl font-mono font-black tracking-tighter text-foreground line-clamp-1">#{invoiceNumber}</h1>

							{/* Yellow "Editing" Status Badge */}
							<div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest shadow-sm">
								<PenTool className="w-3 h-3" /> Modifying Draft
							</div>
						</div>
						<p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 font-medium">Adjusting unbilled case selections and billing overrides.</p>
					</div>
				</div>

				{/* RIGHT: Actions */}
				<div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto mt-1 md:mt-0 justify-end">
					{/* DISCARD EDITS: Standard Safety Ghost Button */}
					<Link href={`/invoices/${invoiceId}`} className="flex-1 md:flex-none">
						<Button
							type="button"
							variant="ghost"
							className="w-full sm:w-auto rounded-xl font-semibold text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-10 px-4 transition-all"
						>
							Discard Edits
						</Button>
					</Link>

					{/* SAVE CHANGES */}
					<Button
						variant="outline"
						onClick={onSaveDraft}
						type="button"
						disabled={!isSaveEnabled || isSavingDraft}
						className={cn(
							"flex-1 md:flex-none rounded-xl font-bold h-10 px-4 sm:px-6 transition-all shadow-sm",
							isSaveEnabled
								? "border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50"
								: "bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-zinc-500 border-border cursor-not-allowed",
						)}
					>
						{isSavingDraft ? <LoaderCircle className="w-4 h-4 mr-1.5 animate-spin" /> : <Save className="w-4 h-4 mr-1.5 sm:mr-2 shrink-0" />}
						<span className="truncate">{isSavingDraft ? "Saving..." : "Save Changes"}</span>
					</Button>
				</div>
			</div>
		</header>
	);
}

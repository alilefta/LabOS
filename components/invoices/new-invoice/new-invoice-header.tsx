"use client";

import { ChevronLeft, LoaderCircle, Save, Landmark } from "lucide-react";
import Link from "next/link";
import { useWatch, Control } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CreateInvoiceInput } from "@/schema/composed/invoices/new-invoice.schema";

interface Props {
	isSavingDraft: boolean;
	onSaveDraft: () => void;
	clinicId: string | undefined; // Passed directly from parent state [2]
	selectedCount: number; // Passed from the parent shell's Set.size
}

export function NewInvoiceHeader({ clinicId, isSavingDraft, onSaveDraft, selectedCount }: Props) {
	// ── DRAFT BUTTON LOGIC ──────────────────────────────────────────
	// Clean, synchronous evaluation. No useWatch required! [2]
	const isSaveDraftEnabled = !!clinicId && selectedCount > 0;

	return (
		<header className="shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 sticky top-0 z-30 bg-background/80 backdrop-blur-xl pt-4 pb-4 border-b border-border">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 pb-4 px-4 sm:px-6 lg:px-8 max-w-[2000px] mx-auto w-full">
				{/* LEFT: Back Navigation & Dynamic Subtitle */}
				<div className="flex items-start sm:items-center gap-3 sm:gap-4">
					<Link href="/invoices" className="shrink-0">
						<Button
							variant="outline"
							size="icon"
							className="rounded-xl border-border bg-white dark:bg-white/5 shadow-sm hover:border-emerald-500/30 transition-all h-9 w-9 sm:h-10 sm:w-10"
						>
							<ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-zinc-400" />
						</Button>
					</Link>
					<div className="flex flex-col min-w-0">
						<div className="flex items-center gap-3">
							<h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground line-clamp-1">New invoice statement</h1>

							{/* Neural status indicator (Emerald-themed) */}
							<div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest shadow-sm">
								<Landmark className="w-3 h-3" /> Ledger Terminal
							</div>
						</div>
						<p className="text-xs sm:text-sm text-muted-foreground mt-0.5 line-clamp-1 font-medium">Compile multiple unbilled production cases into a single business statement.</p>
					</div>
				</div>

				{/* RIGHT: Secondary Actions */}
				<div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto mt-1 md:mt-0 justify-end">
					<Link href="/invoices" className="flex-1 md:flex-none">
						<Button type="button" variant="ghost" className="w-full sm:w-auto rounded-xl font-semibold text-muted-foreground hover:text-foreground h-10 px-4 transition-all">
							Cancel Onboarding
						</Button>
					</Link>

					<Button
						variant="outline"
						onClick={onSaveDraft}
						type="button"
						disabled={!isSaveDraftEnabled || isSavingDraft}
						className={cn(
							"flex-1 md:flex-none rounded-xl font-bold h-10 px-4 sm:px-6 transition-all shadow-sm",
							isSaveDraftEnabled
								? "border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
								: "bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-zinc-500 border-border cursor-not-allowed",
						)}
					>
						{isSavingDraft ? <LoaderCircle className="w-4 h-4 mr-1.5 animate-spin" /> : <Save className="w-4 h-4 mr-1.5 sm:mr-2 shrink-0" />}
						<span className="truncate">{isSavingDraft ? "Saving..." : "Save Draft"}</span>
					</Button>
				</div>
			</div>
		</header>
	);
}

"use client";

import { ChevronLeft, LoaderCircle, Save, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Control, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { CreateCompleteClinicInput } from "@/schema/composed/clinic.details";
import { useMemo } from "react";

interface Props {
	isSubmitting: boolean;
	onSaveDraft?: () => void;
	control: Control<CreateCompleteClinicInput>;
}

export function NewClinicHeader({ isSubmitting, onSaveDraft, control }: Props) {
	// ── FORM STATE WATCHERS ──────────────────────────────────────────
	// Watch the required fields from the Zod Schema
	const name = useWatch({ control, name: "name" });
	const city = useWatch({ control, name: "city" });
	const address1 = useWatch({ control, name: "address1" });
	const phoneNumber = useWatch({ control, name: "phoneNumber" });
	const email = useWatch({ control, name: "email" });

	// ── BUTTON LOGIC ──────────────────────────────────────────────────
	// Button lights up only when the mandatory Zod fields are populated
	const canSubmit = useMemo(() => {
		return !!name && !!city && !!address1 && !!phoneNumber && !!email;
	}, [name, city, address1, phoneNumber, email]);

	return (
		<header className="shrink-0 sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 pb-4 px-4 sm:px-6 lg:px-8 max-w-500 mx-auto w-full">
				{/* LEFT: Title & Context */}
				<div className="flex items-start sm:items-center gap-3 sm:gap-4">
					<Link href="/clinics" className="shrink-0 mt-0.5 sm:mt-0">
						<Button
							variant="outline"
							size="icon"
							className="rounded-xl border-border bg-white dark:bg-white/5 shadow-sm hover:bg-slate-50 dark:hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10 transition-colors"
						>
							<ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-zinc-400" />
						</Button>
					</Link>
					<div className="flex flex-col min-w-0">
						<h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground line-clamp-1 flex items-center gap-2">Onboard New Partner</h1>
						<p className="text-xs sm:text-sm text-muted-foreground mt-0.5 line-clamp-1">Establish a new B2B clinic relationship and financial ledger.</p>
					</div>
				</div>

				{/* RIGHT: Actions */}
				<div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto mt-1 md:mt-0">
					<Button
						variant="ghost"
						onClick={onSaveDraft}
						type="button"
						className="flex-1 md:flex-none rounded-xl font-semibold text-muted-foreground hover:text-foreground h-10 px-3 sm:px-4 bg-slate-50 dark:bg-white/2 md:bg-transparent border border-transparent md:border-none hover:border-border transition-all"
					>
						<Save className="w-4 h-4 mr-1.5 sm:mr-2 shrink-0" />
						<span className="truncate">Save as Draft</span>
					</Button>

					<Button
						disabled={!canSubmit || isSubmitting}
						className={cn(
							"flex-2 md:flex-none rounded-xl h-10 px-4 sm:px-6 font-bold transition-all shadow-sm",
							canSubmit ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-premium" : "bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-zinc-500 cursor-not-allowed",
						)}
						type="submit"
						form="new-clinic-onboarding-form"
					>
						{isSubmitting ? <LoaderCircle className="w-4 h-4 mr-1.5 animate-spin" /> : <Sparkles className="w-4 h-4 mr-1.5 sm:mr-2 shrink-0" />}
						<span className="truncate">{isSubmitting ? "Activating..." : "Activate Partner"}</span>
					</Button>
				</div>
			</div>
		</header>
	);
}

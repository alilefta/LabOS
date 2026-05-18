"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { X, ExternalLink, Plus, FileText, CreditCard, Sparkles } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePermissions } from "@/providers/permissions-provider";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { getClinicQuickOverviewAction } from "@/actions/clinics/get-clinic";
import { ClinicDossierContent } from "./clinic-dossier-content";
import { ClinicQuickOverviewDTO } from "@/schema/composed/clinic.details";
import Link from "next/link";

interface Props {
	clinicId: string | null;
	isOpen: boolean;
	onClose: () => void;
}

export function ClinicQuickViewSheet({ clinicId, isOpen, onClose }: Props) {
	const router = useRouter();
	const { canViewFinancials } = usePermissions();

	const { data: clinic, isLoading } = useQuery({
		queryKey: ["clinic-quick-view", clinicId],
		queryFn: async () => {
			if (!clinicId) return null;
			const res = await getClinicQuickOverviewAction({ clinicId });
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return (res.data as ClinicQuickOverviewDTO) ?? null;
		},
		enabled: isOpen && !!clinicId,
	});

	return (
		<Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<SheetContent showCloseButton={false} className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl overflow-hidden">
				<SheetHeader className="sr-only">
					<SheetTitle>{clinic?.name || "Clinic"} Quick View</SheetTitle>
					<SheetDescription>Comprehensive clinical and financial health summary</SheetDescription>
				</SheetHeader>

				{isLoading || !clinic ? (
					<div className="flex-1 flex flex-col items-center justify-center space-y-4 bg-slate-50/50 dark:bg-transparent">
						<div className="relative">
							<div className="w-16 h-16 rounded-2xl border-2 border-primary/20 animate-spin border-t-primary" />
							<div className="absolute inset-0 flex items-center justify-center">
								<Sparkles className="w-6 h-6 text-primary animate-pulse" />
							</div>
						</div>
						<p className="text-sm font-bold tracking-tight text-foreground uppercase animate-pulse">Neural Audit in Progress...</p>
					</div>
				) : (
					<>
						{/* --- SCROLLABLE CONTENT --- */}
						<div className="flex-1 overflow-y-auto custom-scrollbar relative">
							{/* Close Button (Floating) */}
							<SheetClose asChild>
								<Button
									variant="ghost"
									size="icon"
									className="absolute top-4 right-4 z-50 rounded-full bg-background/50 backdrop-blur-md border border-border/50 hover:bg-destructive/10 hover:text-destructive transition-all"
								>
									<X className="w-4 h-4" />
								</Button>
							</SheetClose>

							<ClinicDossierContent clinic={clinic} />
						</div>

						{/* --- STICKY FOOTER --- */}
						<div className="p-5 border-t border-border bg-slate-50/80 dark:bg-[#09090B]/80 backdrop-blur-xl shrink-0 z-20">
							<div className="flex flex-col gap-2">
								<Button asChild>
									<Link
										className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-bold shadow-premium hover:bg-primary/90 transition-all group"
										href={`/cases/${clinic.id}`}
									>
										Manage Full Hub <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
									</Link>
								</Button>
								<div className="grid grid-cols-2 gap-2">
									<Button
										variant="outline"
										className="h-10 rounded-xl font-bold border-border bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-xs"
										onClick={() => router.push(`/cases/new-case?clinicId=${clinic.id}`)}
									>
										<Plus className="w-3.5 h-3.5 mr-1.5" /> New Case
									</Button>

									{canViewFinancials ? (
										<Button
											variant="outline"
											className={cn(
												"h-10 rounded-xl font-bold text-xs transition-all",
												clinic.uninvoicedCasesCount > 0
													? "border-emerald-500/50 text-emerald-600 dark:text-emerald-500 hover:bg-emerald-500/10"
													: "border-border bg-white dark:bg-white/5",
											)}
										>
											<FileText className="w-3.5 h-3.5 mr-1.5" /> Statement
										</Button>
									) : (
										<Button variant="outline" className="h-10 rounded-xl font-bold text-xs border-border bg-white dark:bg-white/5">
											<CreditCard className="w-3.5 h-3.5 mr-1.5" /> History
										</Button>
									)}
								</div>
							</div>
						</div>
					</>
				)}
			</SheetContent>
		</Sheet>
	);
}

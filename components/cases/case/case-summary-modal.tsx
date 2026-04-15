"use client";

import { Printer, ArrowRight, AlertCircle, ShieldCheck, X, LoaderCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DigitalWorkTicket } from "./digital-work-ticket"; // Ensure this also reads from `data` in the future!
import { CreateCaseInput } from "@/schema/composed/case.details";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { useQuery } from "@tanstack/react-query";
import { getDraftCaseMetadataAction } from "@/actions/shared/case-summary";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	data: CreateCaseInput | null;
	existingDraftId?: string;
	isSubmitting: boolean;
}

export function CaseSummaryModal({ isOpen, onClose, onConfirm, data, isSubmitting, existingDraftId }: Props) {
	// Collect all pricing plan IDs from work items
	const pricingPlanIds = data?.caseWorkItems?.filter((item) => item.casePricingPlanId).map((item) => item.casePricingPlanId) ?? [];

	// Find assigned staff IDs by role
	const courierId = data?.staffAssignments?.find((s) => s.roleCategory === "COURIER" || s.roleCategory === "SALES_REP")?.staffId;

	const technicianId = data?.staffAssignments?.find((s) => s.roleCategory === "TECHNICIAN" || s.roleCategory === "SENIOR_TECHNICIAN" || s.roleCategory === "MANAGER")?.staffId;

	const canFetch = isOpen && !!data?.patientId && !!data?.clinicId && pricingPlanIds.length > 0;

	const { data: metadata, isFetching: isFetchingMetadata } = useQuery({
		queryKey: ["case-summary-metadata", data?.patientId, data?.clinicId, existingDraftId, pricingPlanIds.join(","), courierId, technicianId],
		queryFn: async () => {
			if (!data?.patientId || !data?.clinicId) return null;

			const res = await getDraftCaseMetadataAction({
				draftCaseId: existingDraftId,
				pricingPlansIDs: pricingPlanIds,
				clinicId: data.clinicId!,
				patientId: data.patientId,
				courierId,
				technicianId,
			});

			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({
					serverError: res?.serverError,
					validationErrors: res?.validationErrors,
				});
				return null;
			}

			return res?.data ?? null;
		},
		enabled: canFetch,
		staleTime: 1000 * 60 * 5, // 5 min — metadata doesn't change mid-session
	});

	if (!data) return null;

	// Dynamic Formatters
	const formattedTotal = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(data.grandTotal ?? 0);
	// Safely format the date if it exists
	const formattedDeadline = data.deadline
		? new Intl.DateTimeFormat("en-US", {
				weekday: "long",
				month: "long",
				day: "numeric",
				year: "numeric",
			}).format(new Date(data.deadline))
		: "Not Specified";
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogHeader className="sr-only">
				<DialogTitle>Case Review</DialogTitle>
				<DialogDescription>Case Review Before Submission</DialogDescription>
			</DialogHeader>
			<DialogContent className="max-w-6xl! xl:max-w-7xl! p-0 overflow-hidden border-border bg-card shadow-2xl rounded-3xl lg:rounded-4xl" showCloseButton={false}>
				{/* Modal Header */}
				<div className="p-6 border-b border-border bg-linear-to-r from-emerald-500/5 to-transparent flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-sm">
							{isFetchingMetadata ? <LoaderCircle className="w-6 h-6 animate-spin" /> : <ShieldCheck className="w-6 h-6" />}
						</div>
						<div>
							<DialogTitle className="text-xl font-bold tracking-tight">Final Case Review</DialogTitle>
							<p className="text-xs text-muted-foreground font-medium">
								AI Status: <span className="text-emerald-500 font-bold uppercase tracking-widest">{isFetchingMetadata ? "Auditing Records..." : "Ready for Production"}</span>
							</p>
						</div>
					</div>
					<DialogClose
						onClick={onClose}
						className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
					>
						<X className="w-5 h-5 text-muted-foreground" />
					</DialogClose>
				</div>

				{/* The Body: Split View (Ticket & Metadata) */}
				<div className="flex flex-col lg:flex-row max-h-[70vh] overflow-hidden">
					{/* LEFT: The Digital Work Ticket */}
					<div className="flex-1 bg-slate-50/50 dark:bg-white/2 p-8 overflow-y-auto custom-scrollbar border-r border-border/50 relative">
						{/* THE UPDATED TICKET CALL */}
						<DigitalWorkTicket data={data} metadata={metadata ?? null} isLoading={isFetchingMetadata} />
					</div>

					{/* RIGHT: Production & Financials  */}
					<div className="w-full lg:w-80 p-8 flex flex-col gap-8 bg-card overflow-y-auto lg:overflow-hidden">
						{/* Financial Summary */}
						<div>
							<h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Financial Summary</h4>
							<div className="space-y-3">
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">Subtotal ({data.caseWorkItems?.length ?? 0} items)</span>
									<span className="font-mono font-bold">{formattedTotal}</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">Tax (Exempt)</span>
									<span className="font-mono font-bold">$0.00</span>
								</div>
								<div className="h-px bg-border my-2" />
								<div className="flex justify-between items-end">
									<span className="text-xs font-bold text-foreground">GRAND TOTAL</span>
									<span className="text-2xl font-mono font-bold text-primary">{formattedTotal}</span>
								</div>
							</div>
						</div>

						{/* Logistics */}
						<div className="space-y-4">
							<h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Logistics</h4>

							<div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-border shadow-sm">
								<p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Target Delivery</p>
								<p className="text-sm font-bold text-foreground leading-snug">{formattedDeadline}</p>
							</div>
							{/* Resolved courier name */}
							{metadata?.courier && (
								<div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-border shadow-sm">
									<p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Intake Courier</p>
									<p className="text-sm font-bold text-foreground">
										{metadata.courier.firstName} {metadata.courier.lastName}
									</p>
								</div>
							)}

							{/* Resolved technician name */}
							{metadata?.technician && (
								<div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-border shadow-sm">
									<p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Lead Technician</p>
									<p className="text-sm font-bold text-foreground">
										{metadata.technician.firstName} {metadata.technician.lastName}
									</p>
								</div>
							)}

							{/* Clinic */}
							{metadata?.clinicInfo && (
								<div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-border shadow-sm">
									<p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Clinic</p>
									<p className="text-sm font-bold text-foreground">{metadata.clinicInfo.name}</p>
								</div>
							)}
						</div>

						<div className="mt-auto p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-3">
							<AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
							<p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium leading-normal">Reminder: Case cannot be modified by the clinic once production begins.</p>
						</div>
					</div>
				</div>

				{/* Footer Actions */}
				<DialogFooter className="p-6 border-t border-border bg-slate-50/50 dark:bg-white/1">
					<div className="flex flex-col-reverse sm:flex-row items-center justify-between w-full gap-4">
						<Button variant="ghost" onClick={() => window.print()} className="rounded-xl h-11 px-6 font-semibold text-muted-foreground hover:text-foreground w-full sm:w-auto">
							<Printer className="w-4 h-4 mr-2" /> Print Work Ticket
						</Button>
						<div className="flex items-center gap-3 w-full sm:w-auto">
							<Button variant="outline" onClick={onClose} className="rounded-xl h-11 px-6 border-border font-semibold flex-1 sm:flex-none">
								Edit Case
							</Button>
							<Button
								onClick={onConfirm}
								disabled={isSubmitting || isFetchingMetadata}
								className="rounded-xl h-11 px-8 bg-primary text-primary-foreground shadow-premium font-bold hover:bg-primary/90 flex-2 sm:flex-none"
							>
								{isSubmitting ? (
									<>
										<LoaderCircle className="w-4 h-4 mr-2 animate-spin" /> Submitting...
									</>
								) : (
									<>
										Confirm Production <ArrowRight className="w-4 h-4 ml-2" />
									</>
								)}
							</Button>
						</div>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

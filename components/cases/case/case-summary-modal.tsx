"use client";

import { Printer, ArrowRight, AlertCircle, ShieldCheck, X, LoaderCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DigitalWorkTicket } from "./digital-work-ticket";
import { CreateCaseInput } from "@/schema/composed/case.details";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	data: CreateCaseInput | null; // should be replaced with CaseDraftData or CreateCaseInput | UpdateCaseInput if needed
	isSubmitting: boolean;
}

export function CaseSummaryModal({ isOpen, onClose, onConfirm, data, isSubmitting }: Props) {
	if (!data) return null;
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogHeader className="sr-only">
				<DialogTitle>Case Review</DialogTitle>
				<DialogDescription>Case Review Before Submission</DialogDescription>
			</DialogHeader>
			<DialogContent className="max-w-4xl! p-0 overflow-hidden border-border bg-card shadow-2xl rounded-4xl" showCloseButton={false}>
				{/* Modal Header with AI Status */}
				<div className="p-6 border-b border-border bg-linear-to-r from-emerald-500/5 to-transparent flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-sm">
							<ShieldCheck className="w-6 h-6" />
						</div>
						<div>
							<DialogTitle className="text-xl font-bold tracking-tight">Final Case Review</DialogTitle>
							<p className="text-xs text-muted-foreground font-medium">
								AI Status: <span className="text-emerald-500 font-bold uppercase tracking-widest">Ready for Production</span>
							</p>
						</div>
					</div>
					<DialogClose onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors">
						<X className="w-5 h-5 text-muted-foreground" />
					</DialogClose>
				</div>

				{/* The Body: Split View (Ticket & Metadata) */}
				<div className="flex flex-col lg:flex-row max-h-[70vh] overflow-hidden">
					{/* LEFT: The Digital Work Ticket (Scrollable) */}
					<div className="flex-1 bg-slate-50/50 dark:bg-white/1 p-8 overflow-y-auto custom-scrollbar border-r border-border/50">
						<DigitalWorkTicket />
					</div>

					{/* RIGHT: Production & Financials (Fixed) */}
					<div className="w-full lg:w-80 p-8 flex flex-col gap-8 bg-card">
						<div>
							<h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Financial Summary</h4>
							<div className="space-y-3">
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">Subtotal</span>
									<span className="font-mono font-bold">$1,200.00</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">Tax (Exempt)</span>
									<span className="font-mono font-bold">$0.00</span>
								</div>
								<div className="h-px bg-border my-2" />
								<div className="flex justify-between items-end">
									<span className="text-xs font-bold text-foreground">GRAND TOTAL</span>
									<span className="text-2xl font-mono font-bold text-primary">$1,200.00</span>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Logistics</h4>
							<div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-border">
								<p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Target Delivery</p>
								<p className="text-sm font-bold text-foreground">March 28, 2026</p>
							</div>
							<div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-border">
								<p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Clinic Contact</p>
								<p className="text-sm font-bold text-foreground">Dr. Sarah Mitchell</p>
							</div>
						</div>

						<div className="mt-auto p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-3">
							<AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
							<p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium leading-normal">Reminder: Ensure all IOS scans are decrypted before submitting.</p>
						</div>
					</div>
				</div>

				{/* Footer Actions */}
				<DialogFooter className="p-6 border-t border-border bg-slate-50/50 dark:bg-white/2">
					<div className="flex items-center justify-between w-full">
						<Button variant="ghost" onClick={() => window.print()} className="rounded-xl h-11 px-6 font-semibold text-muted-foreground hover:text-foreground">
							<Printer className="w-4 h-4 mr-2" /> Print Work Ticket
						</Button>
						<div className="flex items-center gap-3">
							<Button variant="outline" onClick={onClose} className="rounded-xl h-11 px-6 border-border font-semibold">
								Back to Edit
							</Button>
							<Button onClick={onConfirm} disabled={isSubmitting} className="rounded-xl h-11 px-8 bg-primary shadow-premium font-bold hover:bg-primary/90">
								{isSubmitting ? (
									<>
										<LoaderCircle className="w-4 h-4 mr-2 animate-spin" /> Confirming
									</>
								) : (
									<>
										Confirm & Start Production <ArrowRight className="w-4 h-4 ml-2" />
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

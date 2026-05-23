"use client";

import { useQuery } from "@tanstack/react-query";
import { AlertOctagon, MessageCircle, ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { RiskClinicDTO } from "@/schema/composed/invoices/invoices.dtos";
import { getArRiskClinicsAction } from "@/actions/invoices/get-risk-clinics";
import { useRouter } from "next/navigation";

interface Props {
	labId: string;
}

export function RiskRadarQuickBar({ labId }: Props) {
	const router = useRouter();

	// --- FETCH DATA ---
	const { data: riskClinics = [], isLoading } = useQuery({
		queryKey: ["ar-risk-radar", labId],
		queryFn: async () => {
			const res = await getArRiskClinicsAction(); // Get clinics exceeding limit OR with overdue invoices
			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return (res?.data?.clinics as RiskClinicDTO[]) || [];
		},
		staleTime: 1000 * 30 * 5, // 30-second stale time for highly reactive debt monitoring
	});

	if (isLoading) {
		return (
			<div className="flex gap-4 overflow-x-auto no-scrollbar py-1">
				<div className="w-80 h-44 rounded-3xl bg-slate-100 dark:bg-white/5 animate-pulse shrink-0" />
				<div className="w-80 h-44 rounded-3xl bg-slate-100 dark:bg-white/5 animate-pulse shrink-0" />
			</div>
		);
	}

	if (riskClinics.length === 0) return null; // Beautiful: if no clinics are in debt, the radar disappears!

	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	// WhatsApp Message Generator (MENA Contextual Workflow)
	const triggerWhatsAppReminder = (clinic: RiskClinicDTO) => {
		const message = encodeURIComponent(
			`Hello Dr. from ${clinic.name},\n\nThis is an automated statement reminder from our accounts team at LabOS.\n\nYour current outstanding balance is ${formatMoney(clinic.currentBalance)}, which exceeds your safety credit limit of ${formatMoney(clinic.creditLimit)}.\n\nPlease review your detailed invoices here: https://labos.app/view-statement/${clinic.id}\n\nThank you for your prompt reconciliation.`,
		);
		window.open(`https://wa.me/${clinic.phoneNumber}?text=${message}`, "_blank");
	};

	return (
		<div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
			{/* SECTION HEADER */}
			<div className="flex items-center gap-2.5 px-1">
				<AlertOctagon className="w-4 h-4 text-rose-500 animate-pulse" />
				<h3 className="text-[11px] font-bold uppercase tracking-widest text-rose-600 dark:text-rose-500">Risk Radar: Production Holds Imminent</h3>
				<span className="text-[10px] font-mono font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">{riskClinics.length} Accounts At Risk</span>
			</div>

			{/* HORIZONTAL SCROLLING GRID */}
			<div className="flex gap-4 overflow-x-auto no-scrollbar py-2 mask-edges -mx-1 px-1">
				{riskClinics.map((clinic) => {
					const ratio = clinic.creditLimit > 0 ? (clinic.currentBalance / clinic.creditLimit) * 100 : 100;

					return (
						<div
							key={clinic.id}
							className="w-80 shrink-0 p-5 rounded-3xl border border-rose-500/20 bg-rose-500/2 relative overflow-hidden group flex flex-col justify-between h-44 shadow-sm hover:shadow-md transition-all hover:border-rose-500/40"
						>
							{/* Ambient Alert Glow */}
							<div className="absolute -top-12 -right-12 w-28 h-28 bg-rose-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

							{/* Card Top: Identity */}
							<div className="flex items-start justify-between relative z-10">
								<div className="flex flex-col min-w-0">
									<h4 className="text-sm font-bold text-foreground truncate max-w-45">{clinic.name}</h4>
									<span className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1 mt-0.5 font-medium">
										<MapPin className="w-3 h-3" /> {clinic.city}
									</span>
								</div>

								{clinic.overdueInvoiceCount > 0 && (
									<div className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-[9px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest">
										{clinic.overdueInvoiceCount} Overdue
									</div>
								)}
							</div>

							{/* Card Middle: Progress Bar */}
							<div className="space-y-1.5 relative z-10 my-3">
								<div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
									<span>Credit Utilization</span>
									<span className="font-mono">{ratio.toFixed(0)}%</span>
								</div>
								<Progress value={Math.min(ratio, 100)} className="h-1.5 bg-rose-500/20 [&>div]:bg-rose-500" />
							</div>

							{/* Card Bottom: Financials & WhatsApp Action */}
							<div className="flex items-center justify-between relative z-10 pt-3 border-t border-rose-500/10">
								<div className="flex flex-col">
									<span className="text-[9px] font-bold uppercase text-muted-foreground">Outstanding</span>
									<span className="text-xs font-mono font-bold text-foreground">{formatMoney(clinic.currentBalance)}</span>
								</div>

								<div className="flex items-center gap-2">
									<Button
										variant="ghost"
										size="icon"
										onClick={() => triggerWhatsAppReminder(clinic)}
										className="w-8 h-8 rounded-lg text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-700 transition-colors"
										title="Send Statement Reminder via WhatsApp"
									>
										<MessageCircle className="w-4 h-4" />
									</Button>

									<Button
										variant="outline"
										size="sm"
										onClick={() => router.push(`/clinics/${clinic.id}?tab=ledger`)}
										className="h-8 rounded-lg text-[10px] font-bold border-rose-500/20 hover:bg-rose-500/10 text-rose-500 transition-all shadow-sm"
									>
										Ledger <ArrowUpRight className="w-3 h-3 ml-1" />
									</Button>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

// app/(print)/paystub/[staffId]/[dateKey]/page.tsx

import { notFound, redirect } from "next/navigation";
import { format } from "date-fns";
import { Coins, FileText, Printer, ChevronLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStaffPaystubData } from "@/data/team/get-staff-paystub";

interface Props {
	params: Promise<{ staffId: string; dateKey: string }>;
}

export default async function PaystubPrintPage({ params }: Props) {
	const { staffId, dateKey } = await params;

	// 1. Fetch secure, filtered data
	const result = await getStaffPaystubData(staffId, dateKey);

	if (!result.success) {
		if (result.error?.code === "UNAUTHORIZED") redirect("/sign-in");
		if (result.error?.code === "LAB_NOT_FOUND") redirect("/onboarding");
		notFound();
	}

	const data = result.data;
	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	return (
		<div className="min-h-screen bg-slate-50 dark:bg-[#09090B] py-8 px-4 sm:px-6 lg:px-8 print:bg-white print:p-0 flex flex-col items-center">
			<div className="w-full max-w-4xl space-y-6 relative">
				{/* --- STICKY FLOAT HEADER (Hidden on Print) --- */}
				<div className="flex items-center justify-between p-4 rounded-2xl bg-white/80 dark:bg-[#121214]/80 border border-border/60 shadow-md backdrop-blur-md sticky top-4 z-30 print:hidden">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-500 shadow-sm">
							<Coins className="w-5 h-5" />
						</div>
						<div className="flex flex-col">
							<span className="text-sm font-bold text-foreground">Commissions Paystub</span>
							<span className="text-[10px] text-muted-foreground font-mono uppercase">{dateKey}</span>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline" onClick={() => window.print()} className="rounded-xl h-10 px-4 font-bold border-border bg-white dark:bg-[#121214] shadow-sm text-xs">
							<Printer className="w-4 h-4 mr-2" /> Print Statement
						</Button>
					</div>
				</div>

				{/* --- THE PHYSICAL PAYSTUB SHEET --- */}
				<div className="bg-white dark:bg-[#121214] border border-border rounded-3xl p-6 sm:p-12 shadow-xl relative overflow-hidden transition-all print:border-none print:shadow-none print:p-0">
					{/* Decorative Perforated Edge (Hidden on Print) */}
					<div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-emerald-500/30 to-transparent print:hidden" />

					{/* 1. STATEMENT HEADER */}
					<div className="flex justify-between items-start mb-12 pb-8 border-b border-border/50">
						<div className="space-y-1">
							<div className="flex items-center gap-2 mb-2">
								<div className="w-6 h-6 bg-emerald-600 rounded-md flex items-center justify-center text-white font-bold text-[10px]">L</div>
								<span className="text-sm font-bold uppercase tracking-widest text-foreground">{data.lab.title} Payroll</span>
							</div>
							<h2 className="text-2xl font-bold tracking-tight text-foreground">Disbursement Statement</h2>
							<p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Payment Date: {format(new Date(data.payoutDate), "MMMM do, yyyy")}</p>
						</div>
						<div className="text-right">
							<div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">
								ACCOUNT SETTLED
							</div>
						</div>
					</div>

					{/* 2. RECIPIENT METADATA */}
					<div className="mb-12 pb-8 border-b border-border/50">
						<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Technician</span>
						<p className="text-base font-bold text-foreground">{data.staff.name}</p>
						<p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mt-1">Role: {data.staff.jobTitle || data.staff.roleCategory.replace("_", " ")}</p>
					</div>

					{/* 3. CASE LINE ITEMS */}
					<div className="space-y-6">
						<h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
							<FileText className="w-4 h-4 text-emerald-500" /> Itemized Production Backlog ({data.cases.length} Units)
						</h3>

						<div className="divide-y divide-border/50 border-t border-border">
							{data.cases.map((c, idx) => (
								<div key={idx} className="py-5 flex items-center justify-between gap-4">
									<div>
										<span className="text-[10px] font-mono font-bold text-muted-foreground bg-slate-100 dark:bg-white/5 border border-border px-1.5 py-0.5 rounded mr-2">
											#{c.caseNumber}
										</span>
										<span className="text-sm font-bold text-foreground">Patient: {c.patientName}</span>
									</div>
									<div className="flex items-center gap-12 font-mono">
										<div className="text-right hidden sm:block">
											<span className="text-xs text-muted-foreground">Case total: {formatMoney(c.caseTotal)}</span>
										</div>
										<div className="text-right w-24">
											<span className="text-sm font-bold text-emerald-600 dark:text-emerald-500">+{formatMoney(c.commissionTotal)}</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* 4. TOTAL DISBURSED */}
					<div className="mt-12 pt-8 border-t border-border flex justify-between items-end bg-slate-50 dark:bg-white/[0.01] -mx-6 sm:-mx-12 p-6 sm:px-12 pb-6">
						<div>
							<p className="text-[10px] text-muted-foreground/60 font-medium leading-relaxed max-w-[200px]">Official paystub document. Generated on-demand via LabOS Ledger Engine.</p>
						</div>
						<div className="text-right font-mono">
							<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">Total Disbursed</span>
							<span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 leading-none">{formatMoney(data.totalDisbursed)}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

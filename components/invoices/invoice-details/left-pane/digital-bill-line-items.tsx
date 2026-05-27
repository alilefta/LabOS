"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BilledCaseLineItemDTO } from "@/schema/composed/invoices/invoice-details.dtos";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { memo } from "react";

interface Props {
	cases: BilledCaseLineItemDTO[];
}

export const DigitalBillLineItems = memo(function DigitalBillLineItems({ cases }: Props) {
	const router = useRouter();

	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	return (
		<div className="space-y-6 pt-10 pb-10 border-b border-border/50 animate-in fade-in duration-500 delay-150">
			<div className="flex items-center gap-3 px-1">
				<div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
				<h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Billed Line Items</h3>
			</div>

			<div className="w-full overflow-x-auto no-scrollbar border border-border rounded-2xl bg-slate-50/50 dark:bg-white/1 shadow-sm">
				<table className="w-full text-left text-sm border-collapse whitespace-nowrap">
					<thead>
						<tr className="border-b border-border/60 bg-slate-100/50 dark:bg-white/2">
							<th className="h-10 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Case ID</th>
							<th className="h-10 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Patient & Prescriber</th>
							<th className="h-10 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Prescription Summary</th>
							<th className="h-10 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">Amount</th>
							<th className="h-10 w-10"></th>
						</tr>
					</thead>
					<tbody className="divide-y divide-border/50">
						{cases.map((ic) => {
							const firstItem = ic.workItems[0];
							const extraCount = ic.workItems.length - 1;

							return (
								<tr key={ic.id} onClick={() => router.push(`/cases/${ic.id}`)} className="group hover:bg-slate-100/50 dark:hover:bg-white/5 transition-colors cursor-pointer relative">
									{/* Case Number */}
									<td className="p-4 px-6 align-middle">
										<span className="font-mono font-bold text-primary group-hover:underline underline-offset-4 decoration-primary/40">#{ic.caseNumber}</span>
									</td>

									{/* Patient & Dentist */}
									<td className="p-4 px-6 align-middle">
										<div className="flex flex-col gap-0.5">
											<span className="font-bold text-sm text-foreground">{ic.patientName}</span>
											<span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
												{ic.dentistName ? `Dr. ${ic.dentistName}` : "Default Prescriber"}
											</span>
										</div>
									</td>

									{/* The Clinical Prescription Pills */}
									<td className="p-4 px-6 align-middle">
										{firstItem ? (
											<div className="flex items-center gap-2">
												{/* Base Item Pill */}
												<div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white dark:bg-[#121214] border border-border shadow-sm">
													<span
														className={cn(
															"text-[9px] font-black px-1 rounded uppercase tracking-tighter",
															firstItem.jawType === "UPPER" ? "text-blue-500 bg-blue-500/5" : "text-rose-500 bg-rose-500/5",
														)}
													>
														{firstItem.jawType}
													</span>
													<span className="text-xs font-semibold text-foreground truncate max-w-30">{firstItem.productName}</span>
													{firstItem.teethCount > 0 && <span className="text-[10px] font-mono font-bold text-muted-foreground">({firstItem.teethCount}U)</span>}
												</div>

												{/* Extra Items Tooltip */}
												{extraCount > 0 && (
													<Tooltip>
														<TooltipTrigger asChild>
															<div
																onClick={(e) => e.stopPropagation()} // Stop the popover click from triggering row navigation
																className="h-6 px-2 rounded-md border border-dashed border-border flex items-center justify-center text-[10px] font-bold text-muted-foreground hover:border-emerald-500 hover:text-emerald-600 cursor-help transition-colors"
															>
																+{extraCount} more
															</div>
														</TooltipTrigger>
														<TooltipContent className="glass-ai-panel p-3 border-border shadow-2xl z-50">
															<div className="space-y-2">
																<p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-1">Additional Items</p>
																{ic.workItems.slice(1).map((item, i) => (
																	<div key={i} className="flex items-center gap-3 text-xs font-medium">
																		<span className="font-mono text-primary w-10">{item.jawType}</span>
																		<span className="text-foreground truncate max-w-30">{item.productName}</span>
																		<span className="text-muted-foreground">({item.teethCount}U)</span>
																	</div>
																))}
															</div>
														</TooltipContent>
													</Tooltip>
												)}
											</div>
										) : (
											<span className="text-muted-foreground text-xs italic">Analog Restoration</span>
										)}
									</td>

									{/* Total Bill Value (Monospace) */}
									<td className="p-4 px-6 text-right align-middle">
										<span className="font-mono font-bold text-sm text-foreground">{formatMoney(ic.caseTotal)}</span>
									</td>

									{/* Chevron Indicator */}
									<td className="p-4 px-6 text-right align-middle">
										<Link
											href={`/cases/${ic.id}`}
											className="inline-flex w-8 h-8 items-center justify-center rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
											onClick={(e) => e.stopPropagation()}
										>
											<ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
});

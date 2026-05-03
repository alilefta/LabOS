"use client";

import { Control, Controller, useWatch } from "react-hook-form";
import { Activity, ShieldAlert, CheckCircle2, PauseCircle, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { UpdateClinicInput } from "@/schema/composed/clinic.details";
import { ClinicStatus } from "@/schema/base/enums.base";

export function ClinicStatusEditor({ control }: { control: Control<UpdateClinicInput> }) {
	const currentStatus = useWatch({ control, name: "status" });

	const STATUS_OPTS: { id: ClinicStatus; label: string; desc: string; icon: LucideIcon; colorClass: string }[] = [
		{ id: "ACTIVE", label: "Active", desc: "Full production access", icon: CheckCircle2, colorClass: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20 ring-emerald-500/30" },
		{ id: "INACTIVE", label: "Inactive", desc: "No longer ordering", icon: PauseCircle, colorClass: "text-slate-500 bg-slate-100 dark:bg-white/5 border-border ring-border" },
		{ id: "SUSPENDED", label: "Suspended", desc: "Production hold", icon: ShieldAlert, colorClass: "text-destructive bg-destructive/10 border-destructive/20 ring-destructive/30" },
	];

	return (
		<section className="space-y-6 animate-in fade-in duration-500">
			<div className="flex items-center gap-3">
				<div className="w-1.5 h-6 bg-primary rounded-full" />
				<h2 className="text-xl font-bold tracking-tight text-foreground">Operational Status</h2>
			</div>

			<div className="lab-card p-6 border-border bg-slate-50/30 dark:bg-[#09090B] space-y-4">
				<label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
					<Activity className="w-4 h-4 text-primary/70" /> Account Standing
				</label>

				<Controller
					control={control}
					name="status"
					render={({ field }) => (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{STATUS_OPTS.map((opt) => {
								const isSelected = field.value === opt.id;
								return (
									<button
										key={opt.id}
										type="button"
										onClick={() => field.onChange(opt.id)}
										className={cn(
											"p-4 rounded-xl border flex flex-col items-start gap-3 transition-all duration-300 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
											isSelected
												? cn("ring-2 shadow-sm", opt.colorClass)
												: "bg-card border-border hover:border-slate-300 dark:hover:border-white/10 opacity-70 hover:opacity-100",
										)}
									>
										<div className="flex items-center justify-between w-full">
											<div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", isSelected ? "bg-background" : "bg-slate-100 dark:bg-white/5")}>
												<opt.icon className={cn("w-4 h-4", isSelected ? "" : "text-muted-foreground")} />
											</div>
											<div
												className={cn(
													"w-4 h-4 rounded-full border-2 transition-all",
													isSelected ? "border-current bg-current scale-110" : "border-slate-300 dark:border-zinc-700",
												)}
											/>
										</div>
										<div>
											<p className={cn("text-sm font-bold", isSelected ? "text-current" : "text-foreground")}>{opt.label}</p>
											<p className={cn("text-[11px] font-medium mt-0.5", isSelected ? "opacity-80" : "text-muted-foreground")}>{opt.desc}</p>
										</div>
									</button>
								);
							})}
						</div>
					)}
				/>
			</div>
		</section>
	);
}

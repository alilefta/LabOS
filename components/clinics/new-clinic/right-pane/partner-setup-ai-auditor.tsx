"use client";

import { Control, useWatch } from "react-hook-form";
import { BrainCircuit, AlertTriangle, Info, ShieldAlert, CheckCircle2 } from "lucide-react";
import { CreateClinicInput } from "@/schema/composed/clinic.details";
import { cn } from "@/lib/utils";

interface Props {
	control: Control<CreateClinicInput>;
}
export function PartnerSetupAiAuditor({ control }: Props) {
	// Watch key fields for business logic
	const creditLimit = useWatch({ control, name: "creditLimit" }) || 0;
	const discount = useWatch({ control, name: "discount" }) || 0;
	const zipcode = useWatch({ control, name: "zipcode" });

	// Watch required fields for the Progress Ring
	const name = useWatch({ control, name: "name" });
	const phone = useWatch({ control, name: "phoneNumber" });
	const email = useWatch({ control, name: "email" });
	const city = useWatch({ control, name: "city" });
	const address = useWatch({ control, name: "address1" });
	const dentist = useWatch({ control, name: "primaryDentist.name" });

	// Calculate Progress (6 required fields)
	const requiredFields = [name, phone, email, city, address, dentist];
	const completedFields = requiredFields.filter((field) => typeof field === "string" && field.trim().length > 0).length;
	const progressPercentage = Math.round((completedFields / requiredFields.length) * 100);
	const circumference = 2 * Math.PI * 38; // r=38
	const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

	return (
		<div className="lab-card flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-4 duration-700 delay-150">
			{/* HEADER & PROGRESS RING */}
			<div className="p-6 border-b border-border bg-linear-to-r from-ai/10 to-transparent flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-2xl bg-ai/10 flex items-center justify-center text-ai shadow-ai-glow-dark animate-ai-pulse">
						<BrainCircuit className="w-5 h-5" />
					</div>
					<div>
						<h2 className="text-sm font-bold tracking-tight text-foreground">AI Setup Auditor</h2>
						<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Business Rules</p>
					</div>
				</div>

				{/* SVG Progress Ring */}
				<div className="relative w-12 h-12 flex items-center justify-center">
					<svg className="w-full h-full transform -rotate-90">
						<circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100 dark:text-white/5" />
						<circle
							cx="24"
							cy="24"
							r="20"
							stroke={progressPercentage === 100 ? "var(--color-chart-3)" : "var(--ai)"}
							strokeWidth="4"
							fill="transparent"
							strokeDasharray={circumference}
							strokeDashoffset={strokeDashoffset}
							strokeLinecap="round"
							className="transition-all duration-1000 ease-out"
						/>
					</svg>
					<span className={cn("absolute inset-0 flex items-center justify-center text-[10px] font-bold", progressPercentage === 100 ? "text-emerald-500" : "text-foreground")}>
						{progressPercentage}%
					</span>
				</div>
			</div>

			{/* AUDIT FEED */}
			<div className="p-6 space-y-4">
				{/* 1. Base Status (Always visible) */}
				{progressPercentage === 100 ? (
					<div className="flex gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 animate-in fade-in">
						<CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
						<p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 leading-relaxed">
							<strong className="uppercase tracking-widest block mb-0.5 text-[9px]">Ready to Activate</strong>
							All mandatory clinical and identity fields have been successfully populated.
						</p>
					</div>
				) : (
					<div className="flex gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-border">
						<Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
						<p className="text-[11px] font-medium text-muted-foreground leading-relaxed">Complete the remaining fields on the left to activate this partner profile.</p>
					</div>
				)}

				{/* 2. Logistics Insight (Triggers when Zipcode is typed) */}
				{zipcode && zipcode.length >= 5 && (
					<div className="flex gap-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/20 animate-in fade-in slide-in-from-top-2">
						<Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
						<p className="text-[11px] font-medium text-blue-600 dark:text-blue-400 leading-relaxed">
							<strong className="uppercase tracking-widest block mb-0.5 text-[9px]">Logistics Routed</strong>
							Zip code <span className="font-mono">{zipcode}</span> falls outside the immediate metro zone. Cases will automatically default to FedEx shipping.
						</p>
					</div>
				)}

				{/* 3. Financial Danger (Triggers on high credit limit) */}
				{creditLimit >= 15000 && (
					<div className="flex gap-3 p-3 rounded-xl bg-destructive/10 border border-destructive/20 animate-in fade-in slide-in-from-top-2">
						<ShieldAlert className="w-4 h-4 text-destructive shrink-0 mt-0.5 animate-pulse" />
						<p className="text-[11px] font-medium text-destructive leading-relaxed">
							<strong className="uppercase tracking-widest block mb-0.5 text-[9px]">High Risk Exposure</strong>
							You authorized a credit limit of ${creditLimit.toLocaleString()}. Ensure you have a physically signed Credit Authorization form on file before activating.
						</p>
					</div>
				)}

				{/* 4. Margin Warning (Triggers on high discount) */}
				{discount >= 15 && (
					<div className="flex gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 animate-in fade-in slide-in-from-top-2">
						<AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
						<p className="text-[11px] font-medium text-amber-600 dark:text-amber-500 leading-relaxed">
							<strong className="uppercase tracking-widest block mb-0.5 text-[9px]">Margin Alert</strong>A {discount}% global discount drastically reduces profit margins on analog
							restorations (PFMs, Dentures).
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

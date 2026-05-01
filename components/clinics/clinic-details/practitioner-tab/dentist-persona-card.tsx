"use client";

import { Phone, Mail, Stethoscope, Sparkles, Star, Plus, MoreHorizontal, ShieldAlert, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface DentistProps {
	id: string;
	name: string;
	email: string | null;
	phoneNumber: string | null;
	isOwner: boolean;
	isDefault: boolean;
	// AI Persona Data (Mocked for UI)
	persona: {
		tendency: string;
		riskLevel: "LOW" | "ELEVATED" | "HIGH";
		topMaterial: string;
	};
}

export function DentistPersonaCard({ dentist }: { dentist: DentistProps }) {
	const initials = dentist.name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.substring(0, 2)
		.toUpperCase();

	return (
		<div className="lab-card flex flex-col p-5 group hover:border-primary/40 hover:shadow-lg transition-all duration-300">
			{/* --- HEADER: Identity & Badges --- */}
			<div className="flex items-start justify-between mb-4">
				<div className="flex gap-3">
					<Avatar className="w-12 h-12 border-2 border-background shadow-sm ring-1 ring-border">
						<AvatarImage src={`https://api.dicebear.com/7.x/notionists/svg?seed=${dentist.id}`} />
						<AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">{initials}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<h3 className="text-sm font-bold text-foreground truncate max-w-[140px]">Dr. {dentist.name}</h3>
						<div className="flex flex-wrap items-center gap-1.5 mt-1">
							{dentist.isOwner && (
								<span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-500 uppercase tracking-widest border border-amber-500/20 flex items-center gap-1">
									<Star className="w-2.5 h-2.5 fill-current" /> Owner
								</span>
							)}
							{dentist.isDefault && (
								<span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-primary/10 text-primary uppercase tracking-widest border border-primary/20">Primary</span>
							)}
							{!dentist.isOwner && !dentist.isDefault && (
								<span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 dark:bg-white/5 text-muted-foreground uppercase tracking-widest border border-border">
									Associate
								</span>
							)}
						</div>
					</div>
				</div>
				<Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground -mr-2 -mt-2">
					<MoreHorizontal className="w-4 h-4" />
				</Button>
			</div>

			{/* --- CONTACT INFO --- */}
			<div className="space-y-2 mb-5">
				{dentist.phoneNumber ? (
					<div className="flex items-center gap-2 text-xs text-muted-foreground">
						<Phone className="w-3.5 h-3.5 text-slate-400" />
						<span className="font-mono">{dentist.phoneNumber}</span>
					</div>
				) : (
					<div className="flex items-center gap-2 text-xs text-muted-foreground opacity-50">
						<Phone className="w-3.5 h-3.5" /> <span>No phone listed</span>
					</div>
				)}
				{dentist.email ? (
					<div className="flex items-center gap-2 text-xs text-muted-foreground">
						<Mail className="w-3.5 h-3.5 text-slate-400" />
						<span className="truncate">{dentist.email}</span>
					</div>
				) : (
					<div className="flex items-center gap-2 text-xs text-muted-foreground opacity-50">
						<Mail className="w-3.5 h-3.5" /> <span>No email listed</span>
					</div>
				)}
			</div>

			{/* --- AI CLINICAL PERSONA --- */}
			<div className="mt-auto p-3.5 rounded-xl bg-ai/5 border border-ai/10 relative overflow-hidden group-hover:border-ai/30 transition-colors">
				<div className="absolute top-0 right-0 p-3 opacity-10">
					<Sparkles className="w-12 h-12 text-ai" />
				</div>
				<div className="flex items-center gap-1.5 mb-2 relative z-10">
					<Sparkles className="w-3.5 h-3.5 text-ai" />
					<span className="text-[10px] font-bold uppercase tracking-widest text-ai">Clinical Persona</span>
				</div>

				<div className="space-y-2 relative z-10">
					<div className="flex justify-between items-end">
						<span className="text-[10px] text-muted-foreground font-medium">Top Material</span>
						<span className="text-xs font-bold text-foreground">{dentist.persona.topMaterial}</span>
					</div>
					<div className="flex justify-between items-end">
						<span className="text-[10px] text-muted-foreground font-medium">Style Tendency</span>
						<span className="text-xs font-bold text-foreground text-right leading-tight max-w-[120px]">{dentist.persona.tendency}</span>
					</div>
					<div className="flex justify-between items-end pt-2 border-t border-ai/10">
						<span className="text-[10px] text-muted-foreground font-medium">Remake Risk</span>
						<div
							className={cn(
								"flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest",
								dentist.persona.riskLevel === "HIGH" ? "text-rose-500" : dentist.persona.riskLevel === "ELEVATED" ? "text-amber-500" : "text-emerald-500",
							)}
						>
							{dentist.persona.riskLevel === "HIGH" && <ShieldAlert className="w-3 h-3" />}
							{dentist.persona.riskLevel === "ELEVATED" && <ShieldAlert className="w-3 h-3" />}
							{dentist.persona.riskLevel === "LOW" && <TrendingUp className="w-3 h-3" />}
							{dentist.persona.riskLevel}
						</div>
					</div>
				</div>
			</div>

			{/* --- QUICK ACTIONS --- */}
			<div className="mt-4 pt-4 border-t border-border flex gap-2">
				<Button className="flex-1 rounded-lg h-9 bg-primary/10 text-primary hover:bg-primary hover:text-white font-bold text-xs transition-all">
					<Plus className="w-3.5 h-3.5 mr-1" /> New Case
				</Button>
			</div>
		</div>
	);
}

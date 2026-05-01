"use client";

import { Stethoscope, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DentistPersonaCard } from "./dentist-persona-card";
import { useState } from "react";

// MOCK DATA (Should be populated from your `clinic.dentists` include)
const MOCK_DENTISTS = [
	{
		id: "den-1",
		name: "Sarah Mitchell",
		email: "s.mitchell@apexdental.com",
		phoneNumber: "+1 (305) 555-0192",
		isOwner: true,
		isDefault: true,
		persona: { tendency: "High Translucency", riskLevel: "LOW" as const, topMaterial: "Zirconia Multi-Layer" },
	},
	{
		id: "den-2",
		name: "John Smith",
		email: "j.smith@apexdental.com",
		phoneNumber: "+1 (305) 555-0999",
		isOwner: false,
		isDefault: false,
		persona: { tendency: "Tight Proximal Contacts", riskLevel: "HIGH" as const, topMaterial: "E-Max Pressed" },
	},
	{
		id: "den-3",
		name: "Emily Chen",
		email: null,
		phoneNumber: null,
		isOwner: false,
		isDefault: false,
		persona: { tendency: "Standard", riskLevel: "ELEVATED" as const, topMaterial: "PFM Standard" },
	},
];

export function DentistRosterGrid() {
	const [searchQuery, setSearchQuery] = useState("");

	const filteredDentists = MOCK_DENTISTS.filter((d) => d.name.toLowerCase().includes(searchQuery.toLowerCase()));

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full min-h-0">
			{/* TOOLBAR */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-border">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
						<Stethoscope className="w-4 h-4" />
					</div>
					<div>
						<h3 className="text-sm font-bold text-foreground">Practitioner Roster</h3>
						<p className="text-xs text-muted-foreground mt-0.5">{MOCK_DENTISTS.length} doctors registered to this clinic.</p>
					</div>
				</div>

				<div className="flex items-center gap-3 w-full sm:w-auto">
					<div className="relative w-full sm:w-64">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
						<input
							type="text"
							placeholder="Search doctors..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full h-9 pl-9 pr-4 bg-white dark:bg-[#121214] border border-border rounded-lg text-xs focus:ring-1 focus:ring-primary outline-none shadow-sm transition-all"
						/>
					</div>
					<Button className="shrink-0 h-9 rounded-lg bg-primary text-white font-bold shadow-sm">
						<Plus className="w-4 h-4 sm:mr-1.5" />
						<span className="hidden sm:inline">Add Doctor</span>
					</Button>
				</div>
			</div>

			{/* GRID */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
				{filteredDentists.map((dentist) => (
					<DentistPersonaCard key={dentist.id} dentist={dentist} />
				))}

				{/* Empty Search State */}
				{filteredDentists.length === 0 && (
					<div className="col-span-full py-12 flex flex-col items-center justify-center text-center opacity-50">
						<Stethoscope className="w-8 h-8 text-muted-foreground mb-3" />
						<p className="text-sm font-bold">No practitioners found.</p>
					</div>
				)}
			</div>
		</div>
	);
}

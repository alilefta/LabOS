import { Plus, Users2, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TechnicianProductionTable } from "@/components/technicians/technician-production-table";
import { TechnicianPersonnelDossier } from "@/components/technicians/technician-personnel-dossier";

export default function TechniciansPage() {
	return (
		<div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in duration-700">
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Production Team</h1>
					<p className="text-muted-foreground mt-1">Monitor workforce efficiency and payroll dynamics.</p>
				</div>
				<div className="flex items-center gap-3">
					<Button variant="outline" className="rounded-xl border-border h-10">
						<Filter className="w-4 h-4 mr-2" /> Payroll Export
					</Button>
					<Button className="rounded-xl bg-primary shadow-premium h-10 px-4 font-bold">
						<Plus className="w-4 h-4 mr-2" /> Add Technician
					</Button>
				</div>
			</div>

			<div className="flex-1 flex flex-col xl:flex-row gap-6 min-h-0">
				<div className="flex-1 flex flex-col min-w-0">
					<TechnicianProductionTable />
				</div>
				<div className="w-full xl:w-100 shrink-0 flex flex-col gap-6">
					<TechnicianPersonnelDossier />
				</div>
			</div>
		</div>
	);
}

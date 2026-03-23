import { BarChart3, Layers, Wallet, History, Settings, User, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { SubPageSidebar } from "@/components/shared/sub-page-sidebar";
import { Button } from "@/components/ui/button";
import { TechnicianSidebarWrapper } from "@/components/technicians/technician/technician-sidebar-warpper";

export default async function TechnicianDetailLayout(props: { children: React.ReactNode; params: Promise<{ technicianId: string }> }) {
	const params = await props.params;
	const tId = params.technicianId;

	return (
		<div className="flex flex-col h-full animate-in fade-in duration-700">
			{/* Header Area */}
			<div className="flex items-center justify-between mb-8">
				<div className="flex items-center gap-4">
					<Link href="/technicians">
						<Button variant="outline" size="icon" className="rounded-xl border-border bg-transparent">
							<ChevronLeft className="w-4 h-4" />
						</Button>
					</Link>
					<div>
						<div className="flex items-center gap-3">
							<h1 className="text-2xl font-bold tracking-tight text-foreground">Elena Vance</h1>
							<span className="px-2.5 py-0.5 rounded-full bg-ai/10 text-ai text-[10px] font-bold uppercase tracking-widest border border-ai/20">Senior Ceramist</span>
						</div>
						<p className="text-sm text-muted-foreground mt-0.5">ID: #TECH-8842 • Member since 2022</p>
					</div>
				</div>
			</div>

			<div className="flex flex-col md:flex-row gap-8 lg:gap-12 flex-1 min-h-0">
				{/* Sidebar (Left) */}
				<aside className="w-full md:w-60 shrink-0">
					<TechnicianSidebarWrapper tId={tId} />
				</aside>

				{/* Content Canvas (Right) */}
				<div className="flex-1 min-w-0">{props.children}</div>
			</div>
		</div>
	);
}

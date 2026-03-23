import { Filter, Search, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
	title: "Cases Database | LabOS",
};

export default function CasesPage() {
	return (
		<div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in duration-700">
			{/* Header Area */}
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
				<div>
					<h1 className="text-3xl font-bold tracking-tight text-foreground">Cases Database</h1>
					<p className="text-muted-foreground mt-1">Manage and query 5,492 active and completed cases.</p>
				</div>
				<div className="flex items-center gap-3">
					<Button variant="outline" className="h-10 rounded-xl border-border bg-transparent hover:bg-secondary text-foreground font-medium">
						<Filter className="w-4 h-4 mr-2" />
						Advanced Filters
					</Button>
					<Button className="h-10 rounded-xl shadow-premium bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
						<Plus className="w-4 h-4 mr-2" />
						Create Case
					</Button>
				</div>
			</div>

			{/* SPLIT SCREEN ARCHITECTURE */}
			<div className="flex-1 flex flex-col xl:flex-row gap-6 min-h-0">
				{/* LEFT PANE: 70% Width (The Data Grid) */}
				<div className="flex-1 lab-card flex flex-col overflow-hidden">
					{/* Table Toolbar */}
					<div className="p-4 border-b border-border bg-slate-50/50 dark:bg-white/2 flex items-center justify-between gap-4">
						<div className="relative w-full max-w-sm">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
							<input
								type="text"
								placeholder="Search Case ID, Clinic, or Patient..."
								className="w-full h-9 pl-9 pr-4 bg-white dark:bg-[#121214] border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
							/>
						</div>

						{/* Active Filter Tags */}
						<div className="hidden lg:flex items-center gap-2">
							<span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-1">Active:</span>
							<span className="px-2.5 py-1 bg-white dark:bg-white/5 border border-border rounded-md text-xs font-medium flex items-center gap-1.5 shadow-sm">
								Status: Processing <button className="text-muted-foreground hover:text-destructive">&times;</button>
							</span>
						</div>
					</div>

					{/* 
					  Placeholder for the actual Table Component. 
					  Using flex-1 and overflow-auto so ONLY the table scrolls, not the whole page! 
					*/}
					<div className="flex-1 overflow-auto p-8 flex items-center justify-center border-2 border-dashed border-border m-4 rounded-xl bg-slate-50/50 dark:bg-white/2">
						<p className="text-muted-foreground font-medium flex items-center gap-2">
							<Loader2 className="w-4 h-4 animate-spin" />
							Data Table Component Will Go Here
						</p>
					</div>
				</div>

				{/* RIGHT PANE: 30% Width (AI Query Sidebar) */}
				<div className="w-full xl:w-100 shrink-0 flex flex-col gap-6">
					<div className="lab-card flex-1 flex flex-col overflow-hidden relative group">
						{/* Glowing Header */}
						<div className="p-5 border-b border-border bg-linear-to-r from-ai/10 to-transparent flex items-center gap-3">
							<div className="w-8 h-8 rounded-lg bg-ai text-white flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
								<Sparkles className="w-4 h-4" />
							</div>
							<div>
								<h2 className="text-sm font-bold text-foreground tracking-tight">AI Data Copilot</h2>
								<p className="text-[11px] text-muted-foreground font-medium">Context: 5,492 Cases</p>
							</div>
						</div>

						{/* Chat/Query Output Area */}
						<div className="flex-1 p-5 overflow-auto flex flex-col justify-end">
							<div className="bg-slate-50 dark:bg-white/5 border border-border rounded-2xl rounded-tr-sm p-4 text-sm text-foreground shadow-sm">
								<p className="mb-3">How can I help you query the database today?</p>
								<div className="flex flex-col gap-2">
									<button className="text-left text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 p-2 rounded-lg transition-colors border border-transparent hover:border-primary/20">
										&quot;Show me all late Zirconia cases.&quot;
									</button>
									<button className="text-left text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 p-2 rounded-lg transition-colors border border-transparent hover:border-primary/20">
										&quot;Which clinic has the highest remake rate?&quot;
									</button>
								</div>
							</div>
						</div>

						{/* Input Area */}
						<div className="p-4 border-t border-border bg-slate-50/50 dark:bg-white/2">
							<div className="relative">
								<input
									type="text"
									placeholder="Ask LabOS..."
									className="w-full h-11 pl-4 pr-10 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm focus:outline-none focus:border-ai focus:ring-1 focus:ring-ai transition-all shadow-sm"
								/>
								<Button size="icon" className="absolute right-1.5 top-1.5 w-8 h-8 rounded-lg bg-ai hover:bg-ai/90 text-white shadow-md">
									<Sparkles className="w-3.5 h-3.5" />
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// Dummy import to avoid React errors in the placeholder
import { Loader2 } from "lucide-react";

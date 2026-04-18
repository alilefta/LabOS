import Link from "next/link";
import { FileQuestion, Search, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CaseNotFound() {
	return (
		<div className="flex-1 flex items-center justify-center p-6 h-[calc(100vh-80px)] animate-in fade-in duration-700 relative overflow-hidden">
			{/* Ambient Background Glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-destructive/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

			<div className="lab-card max-w-md w-full p-8 text-center relative overflow-hidden border-destructive/20 shadow-xl">
				{/* Decorative Top Accent */}
				<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-destructive/50 to-transparent" />

				<div className="w-20 h-20 mx-auto rounded-3xl bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive mb-6 shadow-inner">
					<FileQuestion className="w-10 h-10" />
				</div>

				<h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">Case Not Found</h2>
				<p className="text-sm text-muted-foreground leading-relaxed mb-8">
					The clinical dossier you are looking for does not exist, has been deleted, or you do not have permission to view it.
				</p>

				<div className="flex flex-col gap-3">
					<Button asChild className="w-full rounded-xl h-11 font-bold shadow-premium bg-primary text-primary-foreground hover:bg-primary/90">
						<Link href="/cases">
							<ArrowLeft className="w-4 h-4 mr-2" /> Return to Database
						</Link>
					</Button>

					<div className="grid grid-cols-2 gap-3 mt-2">
						<Button asChild variant="outline" className="rounded-xl h-10 font-semibold border-border hover:bg-slate-50 dark:hover:bg-white/5">
							<Link href="/cases">
								<Search className="w-4 h-4 mr-2 text-muted-foreground" /> Search
							</Link>
						</Button>
						<Button asChild variant="outline" className="rounded-xl h-10 font-semibold border-border hover:bg-slate-50 dark:hover:bg-white/5">
							<Link href="/cases/new">
								<Plus className="w-4 h-4 mr-2 text-muted-foreground" /> New Case
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

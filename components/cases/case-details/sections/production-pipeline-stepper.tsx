import { AlertCircle, CheckCircle2, ChevronRight, FileCheck, FlaskConical, Microscope, PackageCheck, Send, ShieldCheck, Sparkles, Truck, User } from "lucide-react";

import { cn } from "@/lib/utils";

interface StepperProps {
	currentStatus: string;
}

const PIPELINE_STEPS = [
	{ id: "NEW", label: "Intake", icon: FileCheck },
	{ id: "ASSIGNED", label: "Assigned", icon: User },
	{ id: "PROCESSING", label: "Milling / Prod", icon: FlaskConical },
	// { id: "QC", label: "QC Check", icon: Microscope }, // not sure about QC as not all labs has this workflow
	{ id: "COMPLETED", label: "Completed", icon: PackageCheck },
	{ id: "DELIVERED", label: "Delivered", icon: Truck },
];

export function ProductionPipelineStepper({ currentStatus }: StepperProps) {
	// Find the current index to determine past/active/future steps
	const currentIndex = PIPELINE_STEPS.findIndex((s) => s.id === currentStatus);

	// Fallback if status is weird or draft
	const activeIndex = currentIndex === -1 ? 0 : currentIndex;

	return (
		<div className="lab-card p-6 sm:p-8 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Production Pipeline</h3>
				<span className="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-foreground uppercase tracking-wider border border-border shadow-sm">
					Est. Completion: <span className="text-primary ml-1">2 Days</span>
				</span>
			</div>

			{/* --- THE RESPONSIVE SCROLL WRAPPER --- */}
			{/* Negative horizontal margins on mobile allow edge-to-edge scrolling */}
			<div className="overflow-x-auto custom-scrollbar -mx-6 px-4 sm:mx-0 sm:px-2 py-4">
				{/* Fixed min-width forces horizontal scroll instead of squishing */}
				<div className="relative min-w-[650px] mb-6">
					{/* The background track line */}
					<div className="absolute top-5 sm:top-6 left-0 right-0 h-1 bg-slate-100 dark:bg-white/5 -translate-y-1/2 rounded-full" />

					{/* The active progress line */}
					<div
						className="absolute top-5 sm:top-6 left-0 h-1 bg-primary -translate-y-1/2 rounded-full transition-all duration-1000 ease-out"
						style={{ width: `${(activeIndex / (PIPELINE_STEPS.length - 1)) * 100}%` }}
					/>

					{/* The Nodes */}
					<div className="relative flex justify-between mx-4">
						{PIPELINE_STEPS.map((step, index) => {
							const isPast = index < activeIndex;
							const isActive = index === activeIndex;

							return (
								<div key={step.id} className="flex flex-col items-center gap-3 relative group">
									{/* The Node */}
									<div
										className={cn(
											"w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center z-10 transition-all duration-500",
											isPast
												? "bg-primary text-white shadow-md"
												: isActive
													? "bg-background border-2 border-primary text-primary shadow-[0_0_15px_rgba(37,99,235,0.3)] scale-110"
													: "bg-slate-100 dark:bg-[#121214] border border-border text-muted-foreground",
										)}
									>
										{isPast ? <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" /> : <step.icon className={cn("w-4 h-4 sm:w-5 sm:h-5", isActive && "animate-pulse")} />}
									</div>

									{/* The Label */}
									<div className="absolute top-14 sm:top-16 w-24 text-center">
										<span
											className={cn(
												"text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-colors line-clamp-1",
												isActive ? "text-primary" : isPast ? "text-foreground" : "text-muted-foreground",
											)}
										>
											{step.label}
										</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

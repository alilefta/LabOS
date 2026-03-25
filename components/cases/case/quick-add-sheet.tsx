"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { Sparkles, Loader2 } from "lucide-react";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	type: "CLINIC" | "PATIENT";
}

export function QuickAddSheet({ isOpen, onClose, type }: Props) {
	const isClinic = type === "CLINIC";

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="sm:max-w-md border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col">
				{/* Animated Header */}
				<SheetHeader className="p-8 border-b border-border bg-linear-to-br from-primary/5 to-transparent">
					<div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-ai-glow-light">
						{isClinic ? <Sparkles className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
					</div>
					<SheetTitle className="text-2xl font-bold tracking-tight">Quick Add {isClinic ? "Clinic" : "Patient"}</SheetTitle>
					<SheetDescription className="text-sm text-muted-foreground">Enter the essential details. You can add more info later in the {type.toLowerCase()} settings.</SheetDescription>
				</SheetHeader>

				{/* Form Body */}
				<div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
					<div className="space-y-5">
						<div className="p-4 rounded-xl bg-ai/5 border border-ai/10 text-[11px] text-ai font-medium italic">
							Tip: AI will automatically index this new entry for future case queries.
						</div>

						{/* Placeholder inputs matching your InputWithLabel pattern */}
						<div className="space-y-4">
							<div className="h-16 w-full rounded-xl bg-slate-50 dark:bg-white/5 border border-border animate-pulse" />
							<div className="h-16 w-full rounded-xl bg-slate-50 dark:bg-white/5 border border-border animate-pulse" />
							<div className="grid grid-cols-2 gap-4">
								<div className="h-16 w-full rounded-xl bg-slate-50 dark:bg-white/5 border border-border animate-pulse" />
								<div className="h-16 w-full rounded-xl bg-slate-50 dark:bg-white/5 border border-border animate-pulse" />
							</div>
						</div>
					</div>
				</div>

				{/* Action Footer */}
				<SheetFooter className="p-8 border-t border-border bg-slate-50/30 dark:bg-white/1">
					<Button variant="ghost" onClick={onClose} className="rounded-xl h-11 px-6">
						Cancel
					</Button>
					<Button className="rounded-xl h-11 px-8 bg-primary shadow-premium font-bold hover:bg-primary/90 flex-1 sm:flex-none">Register {isClinic ? "Clinic" : "Patient"}</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

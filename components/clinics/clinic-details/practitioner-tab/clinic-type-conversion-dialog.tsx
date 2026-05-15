"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ClinicType } from "@/schema/base/enums.base";
import { Loader2, Briefcase, Hospital, GraduationCap, Check, AlertTriangle } from "lucide-react";
import { memo, useCallback, useState } from "react";

interface Props {
	isOpen: boolean;
	newType: ClinicType;
	isConverting: boolean;
	onChangeType: (newType: ClinicType) => void;
	onClose: () => void;
}

export const ClinicTypeConversionDialog = memo(function ClinicTypeConversionDialog({ isOpen, onChangeType, isConverting, onClose }: Props) {
	const [newType, setNewType] = useState<ClinicType | null>(null);
	const handleChangeType = useCallback(() => {
		if (newType) {
			onChangeType(newType);
		}
	}, [onChangeType, newType]);
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-125 p-0 overflow-hidden border-border bg-card shadow-2xl rounded-4xl">
				<div className="p-8 border-b border-border bg-linear-to-br from-amber-500/5 to-transparent">
					<div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
						<AlertTriangle className="w-6 h-6" />
					</div>
					<DialogTitle className="text-2xl font-bold tracking-tight">Upgrade Structure?</DialogTitle>
					<DialogDescription className="text-sm text-muted-foreground mt-2 leading-relaxed">
						Solo Practices are limited to one doctor. To add more, convert to a multi-doctor structure first.
					</DialogDescription>
				</div>
				<div className="p-8 space-y-3">
					{[
						{ id: "CLINIC", label: "Multi-Dentist Clinic", icon: Briefcase },
						{ id: "HOSPITAL", label: "Medical Center", icon: Hospital },
						{ id: "UNIVERSITY", label: "Academic / School", icon: GraduationCap },
					].map((t) => (
						<button
							key={t.id}
							onClick={() => setNewType(t.id as ClinicType)}
							className={cn(
								"flex items-center justify-between w-full p-4 rounded-2xl border transition-all",
								newType === t.id ? "border-primary bg-primary/5 ring-1 ring-primary/20 shadow-sm" : "border-border hover:border-slate-300",
							)}
						>
							<div className="flex items-center gap-3">
								<div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", newType === t.id ? "bg-primary text-white" : "bg-slate-100 dark:bg-white/5 text-slate-500")}>
									<t.icon className="w-4 h-4" />
								</div>
								<span className={cn("text-sm font-bold", newType === t.id ? "text-foreground" : "text-muted-foreground")}>{t.label}</span>
							</div>
							{newType === t.id && <Check className="w-4 h-4 text-primary animate-in zoom-in" />}
						</button>
					))}
				</div>
				<DialogFooter className="p-6 border-t border-border bg-slate-50/30 dark:bg-white/1 flex flex-row gap-3">
					<Button variant="ghost" onClick={onClose} className="rounded-xl h-11 px-6 font-semibold">
						Cancel
					</Button>
					<Button onClick={handleChangeType} disabled={isConverting} className="flex-1 rounded-xl h-11 bg-primary text-white shadow-premium font-bold hover:bg-primary/90">
						{isConverting ? <Loader2 className="animate-spin mr-2" /> : <Check className="mr-2 h-4 w-4" />} Confirm & Continue
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
});

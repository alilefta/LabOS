"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import { Droplet, ChevronDown, FileText } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CreateCaseWorkItemInput } from "@/schema/composed/case-work-item.details";

// SHADE SYSTEM PRESETS
const SHADE_SYSTEMS = [
	{ id: "VITA_CLASSICAL", name: "VITA Classical (A1-D4)" },
	{ id: "VITA_3D_MASTER", name: "VITA 3D-Master" },
	{ id: "CHROMASCOP", name: "Ivoclar Chromascop" },
	{ id: "CUSTOM", name: "Custom / Written" },
];

export interface MetadataEditorRef {
	getValues: () => {
		notes?: string;
		shadeSystem?: string;
		baseShade?: string;
		stumpShade?: string;
		shadeNotes?: string;
	};
}

interface Props {
	initialData: CreateCaseWorkItemInput | null;
	// isOpen: boolean; // Used to trigger resets when the modal opens/closes
}

export const WorkItemMetadataEditor = forwardRef<MetadataEditorRef, Props>(({ initialData }, ref) => {
	const initIsCustom = initialData?.shadeSystem && !SHADE_SYSTEMS.some((sys) => sys.id === initialData.shadeSystem);

	const [isMetadataOpen, setIsMetadataOpen] = useState(!!(initialData?.notes || initialData?.baseShade));
	const [notes, setNotes] = useState(initialData?.notes || "");
	const [shadeSystem, setShadeSystem] = useState(initIsCustom ? "CUSTOM" : initialData?.shadeSystem || "");
	const [customShadeSystem, setCustomShadeSystem] = useState(initIsCustom ? initialData?.shadeSystem || "" : "");
	const [baseShade, setBaseShade] = useState(initialData?.baseShade || "");
	const [stumpShade, setStumpShade] = useState(initialData?.stumpShade || "");
	const [shadeNotes, setShadeNotes] = useState(initialData?.shadeNotes || "");
	// 2. Reset state whenever the parent modal opens with new data
	// useEffect(() => {
	// 	if (isOpen) {
	// 		const isInitialCustom = initialData?.shadeSystem && !SHADE_SYSTEMS.some((sys) => sys.id === initialData.shadeSystem);

	// 		setShadeSystem(isInitialCustom ? "CUSTOM" : initialData?.shadeSystem || "");
	// 		setCustomShadeSystem(isInitialCustom ? initialData?.shadeSystem || "" : "");
	// 		setNotes(initialData?.notes || "");
	// 		setBaseShade(initialData?.baseShade || "");
	// 		setStumpShade(initialData?.stumpShade || "");
	// 		setShadeNotes(initialData?.shadeNotes || "");

	// 		// Auto-open if there is existing data
	// 		setIsMetadataOpen(!!(initialData?.notes || initialData?.baseShade));
	// 	}
	// }, [isOpen, initialData]);

	// 3. Expose a function to the parent to "pull" the data only when saving
	useImperativeHandle(ref, () => ({
		getValues: () => ({
			notes: notes || undefined,
			shadeSystem: shadeSystem === "CUSTOM" && customShadeSystem ? customShadeSystem : shadeSystem || undefined,
			baseShade: baseShade || undefined,
			stumpShade: stumpShade || undefined,
			shadeNotes: shadeNotes || undefined,
		}),
	}));

	return (
		<Collapsible open={isMetadataOpen} onOpenChange={setIsMetadataOpen} className="border border-border rounded-2xl bg-slate-50/50 dark:bg-white/2 shadow-sm transition-all duration-300 mt-4">
			<CollapsibleTrigger className="w-full flex items-center justify-between p-4 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ai/50">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-ai/10 flex items-center justify-center text-ai group-hover:scale-110 transition-transform">
						<Droplet className="w-4 h-4" />
					</div>
					<div className="flex flex-col items-start text-left">
						<span className="text-[13px] font-bold text-foreground">Clinical Notes & Shade</span>
						<span className="text-[10px] text-muted-foreground font-medium">Define aesthetics & instructions</span>
					</div>
				</div>
				<div className="flex items-center gap-3">
					{/* Status indicator if data exists */}
					{(baseShade || notes) && !isMetadataOpen && (
						<span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-ai/10 text-[9px] font-bold uppercase tracking-widest text-ai border border-ai/20 animate-in fade-in">
							<span className="w-1.5 h-1.5 rounded-full bg-ai animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.5)]"></span>
							Data Saved
						</span>
					)}
					<div className="w-6 h-6 rounded-md bg-white dark:bg-[#121214] border border-border flex items-center justify-center shadow-sm">
						<ChevronDown className={cn("w-3.5 h-3.5 text-muted-foreground transition-transform duration-300", isMetadataOpen && "rotate-180")} />
					</div>
				</div>
			</CollapsibleTrigger>

			<CollapsibleContent className="p-5 pt-0 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
				<div className="h-px w-full bg-linear-to-r from-transparent via-border to-transparent mb-2" />

				{/* --- SHADE CONFIGURATION --- */}
				<div className="space-y-4">
					<label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
						<Droplet className="w-3.5 h-3.5 text-ai" /> Shade Requirements
					</label>

					<div className="space-y-4">
						{/* 1. Shade System & Custom Input */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className={cn("space-y-1.5 transition-all duration-300", shadeSystem === "CUSTOM" ? "col-span-1" : "md:col-span-2")}>
								<Label className="text-[11px] font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-widest">Shade System</Label>
								<Select value={shadeSystem} onValueChange={setShadeSystem}>
									<SelectTrigger className="w-full h-11 rounded-xl bg-white dark:bg-[#121214] border-border text-sm shadow-sm focus:ring-[3px] focus:ring-ai/20 focus:border-ai transition-all">
										<SelectValue placeholder="Select reference system..." />
									</SelectTrigger>
									<SelectContent className="rounded-2xl border-border shadow-premium dark:bg-[#121214]">
										{SHADE_SYSTEMS.map((sys) => (
											<SelectItem key={sys.id} value={sys.id} className="text-[13px] font-medium rounded-lg cursor-pointer py-2.5">
												{sys.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							{/* Custom System Input */}
							{shadeSystem === "CUSTOM" && (
								<div className="space-y-1.5 animate-in fade-in slide-in-from-right-4 duration-300">
									<label htmlFor="custom-shade-system" className="text-[11px] font-bold text-ai uppercase tracking-widest flex items-center gap-1.5">
										Specify System <span className="text-destructive">*</span>
									</label>
									<Input
										id="custom-shade-system"
										placeholder="e.g. Noritake, GC Initial..."
										value={customShadeSystem}
										onChange={(e) => setCustomShadeSystem(e.target.value)}
										className="h-11 rounded-xl bg-ai/5 border-ai/30 text-sm font-bold shadow-sm focus-visible:ring-[3px] focus-visible:ring-ai/20 focus-visible:border-ai transition-all placeholder:text-ai/40"
									/>
								</div>
							)}
						</div>

						{/* 2. Specific Shades */}
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-1.5">
								<label htmlFor="base-shade-input" className="text-[11px] font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-widest">
									Final Shade
								</label>
								<Input
									id="base-shade-input"
									placeholder="e.g. A2"
									value={baseShade}
									onChange={(e) => setBaseShade(e.target.value)}
									className="h-11 rounded-xl bg-white dark:bg-[#121214] border-border text-sm font-mono font-bold shadow-sm focus-visible:ring-[3px] focus-visible:ring-ai/20 focus-visible:border-ai transition-all"
								/>
							</div>

							<div className="space-y-1.5">
								<label htmlFor="stump-shade-input" className="text-[11px] font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-widest">
									Stump Shade
								</label>
								<Input
									id="stump-shade-input"
									placeholder="e.g. ND2"
									value={stumpShade}
									onChange={(e) => setStumpShade(e.target.value)}
									className="h-11 rounded-xl bg-white dark:bg-[#121214] border-border text-sm font-mono font-bold shadow-sm focus-visible:ring-[3px] focus-visible:ring-ai/20 focus-visible:border-ai transition-all"
								/>
							</div>
						</div>

						{/* 3. Shade Notes */}
						<div className="space-y-1.5">
							<label htmlFor="shade-notes-input" className="text-[11px] font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-widest">
								Aesthetic Notes
							</label>
							<Input
								id="shade-notes-input"
								placeholder="e.g. Heavy incisal translucency..."
								value={shadeNotes}
								onChange={(e) => setShadeNotes(e.target.value)}
								className="h-11 rounded-xl bg-white dark:bg-[#121214] border-border text-sm shadow-sm focus-visible:ring-[3px] focus-visible:ring-ai/20 focus-visible:border-ai transition-all"
							/>
						</div>
					</div>
				</div>

				{/* --- CLINICAL NOTES --- */}
				<div className="space-y-3 pt-4 border-t border-border/50">
					<label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
						<FileText className="w-3.5 h-3.5 text-primary" /> Technical Instructions
					</label>
					<Textarea
						placeholder="Specific instructions for this item (e.g. tight proximal contacts, relieve undercuts...)"
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
						className="min-h-25! rounded-xl bg-white dark:bg-[#121214] border-border text-sm shadow-sm focus-visible:ring-[3px] focus-visible:ring-primary/20 focus-visible:border-primary resize-none custom-scrollbar transition-all"
					/>
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
});

WorkItemMetadataEditor.displayName = "WorkItemMetadataEditor";

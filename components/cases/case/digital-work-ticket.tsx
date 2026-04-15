"use client";

import { FileText, MapPin, User, Stethoscope, CalendarClock, Droplet, Loader2 } from "lucide-react";
import { format, differenceInDays, startOfDay } from "date-fns";
import { CaseSummaryMetadata, CreateCaseInput } from "@/schema/composed/case.details";
import { cn } from "@/lib/utils";

// Universal Numbering Dictionary for visual mapping
const TOOTH_NUMBER_MAP: Record<string, { num: number; quad: string }> = {
	UpperRightThirdMolar: { num: 1, quad: "UR" },
	UpperRightSecondMolar: { num: 2, quad: "UR" },
	UpperRightFirstMolar: { num: 3, quad: "UR" },
	UpperRightSecondPremolar: { num: 4, quad: "UR" },
	UpperRightFirstPremolar: { num: 5, quad: "UR" },
	UpperRightCanine: { num: 6, quad: "UR" },
	UpperRightLateralIncisor: { num: 7, quad: "UR" },
	UpperRightCentralIncisor: { num: 8, quad: "UR" },
	UpperLeftCentralIncisor: { num: 9, quad: "UL" },
	UpperLeftLateralIncisor: { num: 10, quad: "UL" },
	UpperLeftCanine: { num: 11, quad: "UL" },
	UpperLeftFirstPremolar: { num: 12, quad: "UL" },
	UpperLeftSecondPremolar: { num: 13, quad: "UL" },
	UpperLeftFirstMolar: { num: 14, quad: "UL" },
	UpperLeftSecondMolar: { num: 15, quad: "UL" },
	UpperLeftThirdMolar: { num: 16, quad: "UL" },
	LowerLeftThirdMolar: { num: 17, quad: "LL" },
	LowerLeftSecondMolar: { num: 18, quad: "LL" },
	LowerLeftFirstMolar: { num: 19, quad: "LL" },
	LowerLeftSecondPremolar: { num: 20, quad: "LL" },
	LowerLeftFirstPremolar: { num: 21, quad: "LL" },
	LowerLeftCanine: { num: 22, quad: "LL" },
	LowerLeftLateralIncisor: { num: 23, quad: "LL" },
	LowerLeftCentralIncisor: { num: 24, quad: "LL" },
	LowerRightCentralIncisor: { num: 25, quad: "LR" },
	LowerRightLateralIncisor: { num: 26, quad: "LR" },
	LowerRightCanine: { num: 27, quad: "LR" },
	LowerRightFirstPremolar: { num: 28, quad: "LR" },
	LowerRightSecondPremolar: { num: 29, quad: "LR" },
	LowerRightFirstMolar: { num: 30, quad: "LR" },
	LowerRightSecondMolar: { num: 31, quad: "LR" },
	LowerRightThirdMolar: { num: 32, quad: "LR" },
};

interface Props {
	data: CreateCaseInput;
	metadata: CaseSummaryMetadata | null;
	isLoading?: boolean;
}

const today = new Date();

export function DigitalWorkTicket({ data, metadata, isLoading }: Props) {
	const isUrgent = data.deadline ? differenceInDays(startOfDay(data.deadline), startOfDay(today)) <= 3 : false;

	// Resolve names from metadata, fall back to truncated IDs
	const patientName = metadata?.patientInfo?.name ?? `ID: ${data.patientId.substring(0, 8).toUpperCase()}`;

	const clinicName = metadata?.clinicInfo?.name ?? (data.clinicId ? `ID: ${data.clinicId.substring(0, 8).toUpperCase()}` : "TBD");

	// Resolve dentist — find the selected dentist or fall back to default
	const dentistName = (() => {
		if (!metadata?.clinicInfo?.dentists?.length) {
			return data.dentistId ? `ID: ${data.dentistId.substring(0, 8).toUpperCase()}` : "Default Prescriber";
		}
		if (data.dentistId) {
			const matched = metadata.clinicInfo.dentists.find((d) => d.id === data.dentistId);
			if (matched) return `Dr. ${matched.name}`;
		}
		const defaultDentist = metadata.clinicInfo.dentists.find((d) => d.isDefault);
		return defaultDentist ? `Dr. ${defaultDentist.name}` : "Default Prescriber";
	})();

	const caseNumber = metadata?.caseNumber ?? "TBD-AUTO-GEN";

	return (
		<div className="bg-white dark:bg-[#121214] border border-border rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden transition-all">
			{/* Loading Overlay */}
			{isLoading && (
				<div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-in fade-in duration-300">
					<Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
					<p className="text-sm font-bold text-foreground">Resolving Clinical Data...</p>
				</div>
			)}

			{/* Decorative "Perforated" Edge */}
			<div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary/20 to-transparent" />

			{/* Ticket Header */}
			<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-10">
				<div className="space-y-1">
					<div className="flex items-center gap-2 mb-2">
						<div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center text-white font-bold text-[10px]">L</div>
						<span className="text-sm font-bold uppercase tracking-widest text-foreground">LabOS Prescription</span>
					</div>
					<h2 className="text-2xl sm:text-3xl font-mono font-bold tracking-tighter text-foreground">#{caseNumber}</h2>
					<p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-1.5 mt-1">
						<CalendarClock className="w-3 h-3" />
						Created: {format(today, "MMM dd, yyyy • HH:mm")}
					</p>
				</div>

				<div className="text-left sm:text-right flex flex-col gap-2 items-start sm:items-end">
					{isUrgent ? (
						<div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg text-[10px] font-bold text-amber-600 dark:text-amber-500 animate-pulse">URGENT PRODUCTION</div>
					) : (
						<div className="px-3 py-1 bg-slate-100 dark:bg-white/5 border border-border rounded-lg text-[10px] font-bold text-foreground">STANDARD ROUTING</div>
					)}
					{data.deadline && <p className="text-[10px] text-muted-foreground font-medium">Due: {format(new Date(data.deadline), "MMM dd, yyyy")}</p>}
				</div>
			</div>

			{/* Patient + Clinic */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 pb-8 border-b border-border/50">
				<div className="space-y-6">
					<div className="space-y-2">
						<div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
							<User className="w-3 h-3 text-primary" /> Patient
						</div>
						<p className={cn("text-base sm:text-lg font-bold text-foreground", !metadata?.patientInfo && "font-mono")}>{patientName}</p>
						{/* Patient meta */}
						{metadata?.patientInfo && (
							<div className="flex items-center gap-3 text-xs text-muted-foreground">
								{metadata.patientInfo.age && <span>Age: {metadata.patientInfo.age}</span>}
								{metadata.patientInfo.gender && <span>{metadata.patientInfo.gender}</span>}
								<span>{metadata.patientInfo.cases.length} prior cases</span>
							</div>
						)}
						{metadata?.patientInfo?.description && <p className="text-xs text-amber-600 dark:text-amber-400 font-medium italic">⚠ {metadata.patientInfo.description}</p>}
					</div>

					<div className="space-y-2">
						<div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
							<MapPin className="w-3 h-3 text-primary" /> Clinic & Prescriber
						</div>
						<p className={cn("text-sm font-bold text-foreground", !metadata?.clinicInfo && "font-mono")}>{clinicName}</p>
						<p className="text-xs text-muted-foreground">
							<span className="font-mono mr-1">D:</span>
							{dentistName}
						</p>
					</div>
				</div>

				<div className="space-y-3 bg-slate-50 dark:bg-[#09090B] p-4 rounded-2xl border border-border">
					<div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
						<FileText className="w-3 h-3 text-primary" /> Global Clinical Notes
					</div>
					{data.notes ? (
						<p className="text-xs text-foreground leading-relaxed italic">&quot;{data.notes}&quot;</p>
					) : (
						<p className="text-xs text-muted-foreground italic">No global instructions provided.</p>
					)}
				</div>
			</div>

			{/* DYNAMIC WORK ITEMS RENDER */}
			<div className="space-y-10">
				<h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
					<Stethoscope className="w-3.5 h-3.5" /> Prescribed Work Items ({data.caseWorkItems?.length ?? 0})
				</h3>

				{data.caseWorkItems.map((item, index) => {
					// Match by pricing plan ID — more reliable than index
					const technicalDetail = metadata?.technicalDetails.find((td) => td.product !== null) ?? metadata?.technicalDetails[index] ?? null;

					const productName = technicalDetail?.product?.name.toUpperCase() ?? `PROD-${item.productId?.substring(0, 6).toUpperCase() ?? "UNKNOWN"}`;

					const workTypeName = technicalDetail?.product?.workType?.name ?? "Manufacturing Department";

					const categoryName = technicalDetail?.product?.workType?.caseCategory?.name ?? null;

					const teeth = item.selectedTeeth?.map((t) => (typeof t === "string" ? t : t.toothPosition)) ?? [];

					const hasShade = item.baseShade || item.stumpShade || item.shadeNotes;

					return (
						<div key={index} className="space-y-6 pt-6 border-t border-dashed border-border first:pt-0 first:border-0">
							<div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2">
								<div>
									<div className="flex items-center gap-2 mb-1">
										<span className="px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded">#{index + 1}</span>
										<p className={cn("text-base font-bold text-foreground", !technicalDetail?.product && "font-mono")}>{productName}</p>
									</div>
									<p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
										Arch: <span className="text-foreground mr-3">{item.jawType}</span>
										{categoryName && (
											<>
												Cat: <span className="text-primary mr-3">{categoryName}</span>
											</>
										)}
										Dept: <span className="text-primary">{workTypeName}</span>
									</p>
								</div>

								{hasShade && (
									<div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-ai/5 border border-ai/20 text-ai text-[10px] font-bold uppercase tracking-widest">
										<Droplet className="w-3 h-3" />
										{item.shadeSystem || "Standard Shade"}
									</div>
								)}
							</div>

							{(item.notes || hasShade) && (
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									{hasShade && (
										<div className="p-3 rounded-xl bg-slate-50 dark:bg-white/2 border border-border">
											<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Color Parameters</p>
											<div className="flex flex-wrap gap-4 text-xs font-medium text-foreground">
												{item.baseShade && (
													<div>
														<span className="text-muted-foreground mr-1">Final:</span>
														{item.baseShade}
													</div>
												)}
												{item.stumpShade && (
													<div>
														<span className="text-muted-foreground mr-1">Stump:</span>
														{item.stumpShade}
													</div>
												)}
											</div>
											{item.shadeNotes && <p className="text-[11px] text-muted-foreground mt-1.5 italic">&quot;{item.shadeNotes}&quot;</p>}
										</div>
									)}
									{item.notes && (
										<div className="p-3 rounded-xl bg-slate-50 dark:bg-white/2 border border-border">
											<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Item Notes</p>
											<p className="text-[11px] text-foreground italic">&quot;{item.notes}&quot;</p>
										</div>
									)}
								</div>
							)}

							{teeth.length > 0 && (
								<div className="bg-slate-50/50 dark:bg-white/2 p-4 rounded-2xl border border-border">
									<div className="flex items-center justify-between mb-4">
										<h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Mapped Positions</h4>
										<span className="text-xs font-bold text-foreground">{teeth.length} Units</span>
									</div>
									<div className="flex flex-wrap gap-3">
										{teeth.map((toothRaw) => {
											const mappedData = TOOTH_NUMBER_MAP[toothRaw];
											return (
												<div
													key={toothRaw}
													className="w-12 h-14 sm:w-14 sm:h-16 rounded-xl bg-white dark:bg-[#121214] border border-border shadow-sm flex flex-col items-center justify-center hover:border-primary/40 hover:shadow-md transition-all"
												>
													<span className="text-[9px] font-bold text-muted-foreground opacity-60 uppercase">{mappedData?.quad ?? "XX"}</span>
													<span className="text-lg font-mono font-bold text-foreground">{mappedData?.num ?? "?"}</span>
												</div>
											);
										})}
									</div>
								</div>
							)}
						</div>
					);
				})}
			</div>

			{/* QR Code Placeholder for Lab Tracking */}
			<div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-6">
				<div className="flex items-center gap-4">
					<div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-50 dark:bg-white/5 rounded-xl border border-border flex items-center justify-center shrink-0">
						<div className="w-8 h-8 border-2 border-dashed border-slate-300 dark:border-zinc-700 opacity-40 rounded" />
					</div>
					<div className="space-y-1">
						<p className="text-[10px] font-bold text-foreground tracking-widest">SCAN TO TRACK</p>
						<p className="text-[9px] text-muted-foreground font-mono">LABOS-{caseNumber}</p>
					</div>
				</div>
				<div className="text-left sm:text-right">
					<p className="text-[9px] text-muted-foreground font-medium max-w-50 sm:max-w-xs leading-relaxed">Electronically verified by LabOS. No signature required for intra-lab routing.</p>
				</div>
			</div>
		</div>
	);
}

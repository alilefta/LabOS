"use client";

import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { ArrowRightLeft, Loader2, ChevronsUpDown, Sparkles, Wrench } from "lucide-react";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList, CommandEmpty } from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

import { StaffRoleCategory } from "@/schema/base/enums.base";
import { reassignCasesStaffAction } from "@/actions/team/reassign-cases";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import useDebounce from "@/hooks/useDebounce";
import { getActiveLabStaffBySearchQueryAction } from "@/actions/team/get-active-staff-search";
import { StaffMemberDTO } from "@/schema/composed/team/team.dtos"; // Re-used the optimized DTO!

interface Props {
	isOpen: boolean;
	onClose: () => void;
	caseIds: string[];
	caseNumbers: string[];
	originalStaffId: string;
	originalStaffName: string;
	originalActiveCaseCount: number; // 🔥 FIX 1: Passed from parent roster [1]
	roleCategory: StaffRoleCategory;
}

type DataShape = StaffMemberDTO[];

export function ReassignStaffCasesSheet({
	isOpen,
	onClose,
	caseIds,
	originalStaffId,
	originalStaffName,
	originalActiveCaseCount, // [1]
	roleCategory,
}: Props) {
	const [targetStaff, setTargetStaff] = useState<StaffMemberDTO | null>(null);
	const [openCombo, setOpenCombo] = useState(false);
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce({ value: search, delay: 300 });

	const queryClient = useQueryClient();

	// ── FIX 2: THE STATE RESET RESET HANDSHAKE ───────────────────────────
	// Safely wipes the local memory of the modal as soon as it is closed
	const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
	if (isOpen !== prevIsOpen) {
		setPrevIsOpen(isOpen);
		if (isOpen) {
			setTargetStaff(null);
			setSearch("");
		}
	}

	// ── 1. FETCH ELIGIBLE TARGET STAFF ──────────────────────────────────
	const { data: rawStaffList = [], isFetching } = useQuery({
		queryKey: ["labStaff", "reassign-search", debouncedSearch],
		queryFn: async () => {
			const res = await getActiveLabStaffBySearchQueryAction({ searchQuery: debouncedSearch, limit: 20 });
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return (res.data?.staff as DataShape) || [];
		},
		enabled: isOpen,
		staleTime: 1000 * 60 * 2,
	});

	const eligibleCandidates = useMemo(() => {
		return rawStaffList.filter((s) => s.id !== originalStaffId && s.isActive);
	}, [rawStaffList, originalStaffId]);

	// ── 2. SERVER ACTION HANDLER ────────────────────────────────────────
	const { executeAsync: reassignCases, isExecuting } = useAction(reassignCasesStaffAction, {
		onSuccess: () => {
			toast.success(`Successfully shifted ${caseIds.length} tasks.`);

			queryClient.invalidateQueries({ queryKey: ["staff-active-cases", originalStaffId] });
			if (targetStaff) {
				queryClient.invalidateQueries({ queryKey: ["staff-active-cases", targetStaff.id] });
			}
			queryClient.invalidateQueries({ queryKey: ["staff-roster"] });

			onClose();
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	const handleExecute = async () => {
		if (!targetStaff) return;
		await reassignCases({
			caseIds,
			originalStaffId,
			targetStaffId: targetStaff.id,
			roleCategory,
		});
	};

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER --- */}
				<SheetHeader className="p-8 border-b border-border bg-linear-to-br from-amber-500/5 to-transparent relative overflow-hidden shrink-0">
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<ArrowRightLeft className="w-24 h-24" />
					</div>
					<div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4 shadow-sm border border-amber-500/20">
						<ArrowRightLeft className="w-6 h-6" />
					</div>
					<SheetTitle className="text-2xl font-bold tracking-tight text-foreground">Rebalance workload</SheetTitle>
					<SheetDescription className="text-sm text-muted-foreground font-medium">
						Shifting <strong className="text-foreground">{caseIds.length} cases</strong> off <strong className="text-foreground">{originalStaffName}</strong>&apos;s bench.
					</SheetDescription>
				</SheetHeader>

				{/* --- BODY --- */}
				<div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 custom-scrollbar">
					{/* TARGET STAFF SELECTOR */}
					<div className="flex flex-col gap-3">
						{/* FIX: Sentence case label */}
						<label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
							Select target technician <span className="text-destructive">*</span>
						</label>

						<Popover open={openCombo} onOpenChange={setOpenCombo}>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									role="combobox"
									className={cn(
										"w-full h-12 justify-between rounded-xl border-border bg-card px-4 transition-all shadow-sm",
										openCombo ? "ring-[3px] ring-primary/20 border-primary outline-none" : "hover:bg-slate-50 dark:hover:bg-white/5",
									)}
								>
									<div className="flex items-center gap-3 truncate min-w-0">
										<Wrench className={cn("w-4 h-4 shrink-0", targetStaff ? "text-primary animate-pulse" : "text-slate-400")} />
										<span className={cn("text-sm truncate", !targetStaff && "text-muted-foreground")}>
											{targetStaff ? (
												<span className="font-bold text-foreground">
													{targetStaff.firstName} {targetStaff.lastName}
												</span>
											) : (
												"Search available technicians..."
											)}
										</span>
									</div>
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</PopoverTrigger>

							<PopoverContent className="p-0 rounded-2xl border-border shadow-premium overflow-hidden w-(--radix-popover-trigger-width)">
								<Command className="dark:bg-[#121214]" shouldFilter={false}>
									<CommandInput placeholder="Type name..." value={search} onValueChange={setSearch} className="py-3" />
									<CommandList className="max-h-56 custom-scrollbar">
										{isFetching && (
											<div className="p-4 text-center">
												<Loader2 className="w-5 h-5 animate-spin text-primary mx-auto" />
											</div>
										)}
										{!isFetching && eligibleCandidates.length === 0 && (
											<CommandEmpty className="p-6 text-center text-xs text-muted-foreground">No available technicians found.</CommandEmpty>
										)}

										<CommandGroup heading="Available Technicians">
											{eligibleCandidates.map((staff) => {
												const activeCases = staff.activeCaseCount || 0;
												const isOverloaded = activeCases >= 12;

												return (
													<CommandItem
														key={staff.id}
														value={`${staff.firstName} ${staff.lastName}`}
														onSelect={() => {
															setTargetStaff(staff);
															setOpenCombo(false);
														}}
														className="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-primary/5 rounded-lg my-0.5"
													>
														<div className="flex items-center gap-3 min-w-0 flex-1">
															<Avatar className="w-8 h-8 border border-border shrink-0">
																{staff.avatarUrl && <AvatarImage src={staff.avatarUrl} />}
																<AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
																	{staff.firstName[0]}
																	{staff.lastName[0]}
																</AvatarFallback>
															</Avatar>
															<div className="flex flex-col min-w-0">
																<span className="text-xs font-bold text-foreground truncate">
																	{staff.firstName} {staff.lastName}
																</span>
																<span className="text-[10px] text-muted-foreground uppercase tracking-wider">{staff.jobTitle || staff.roleCategory}</span>
															</div>
														</div>

														<div className="flex flex-col items-end shrink-0 ml-4">
															<span
																className={cn(
																	"text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded",
																	isOverloaded ? "bg-rose-500/10 text-rose-500" : "bg-emerald-500/10 text-emerald-500",
																)}
															>
																{activeCases} Active
															</span>
														</div>
													</CommandItem>
												);
											})}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
					</div>

					{/* --- HIGH-END COMPARATIVE CAPACITY PREVIEW --- */}
					{targetStaff &&
						(() => {
							// 1. Safe Math Calculations
							const MAX_CAPACITY = 15;

							// Original Staff Math
							const originalNewCount = Math.max(0, originalActiveCaseCount - caseIds.length);
							const originalPct = Math.min((originalNewCount / MAX_CAPACITY) * 100, 100);

							// Target Staff Math
							const targetNewCount = targetStaff.activeCaseCount + caseIds.length;
							const targetPct = Math.min((targetNewCount / MAX_CAPACITY) * 100, 100);

							// Target Staff Color Logic
							const targetIsCritical = targetNewCount >= 15;
							const targetIsWarning = targetNewCount >= 12 && targetNewCount < 15;

							return (
								<div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/2 border border-border flex flex-col gap-5 animate-in fade-in zoom-in-95 shadow-sm">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<Sparkles className="w-4 h-4 text-primary" />
											<h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Post-Transfer Load</h4>
										</div>
										{targetIsCritical && (
											<span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest bg-rose-500/10 px-2 py-0.5 rounded animate-pulse">Burnout Risk</span>
										)}
									</div>

									<div className="flex flex-col gap-5">
										{/* Original Tech ( Ahmed ) */}
										<div className="flex flex-col gap-2">
											<div className="flex justify-between text-xs font-semibold">
												<span className="text-muted-foreground truncate max-w-37.5">{originalStaffName}</span>
												<span className="font-mono text-muted-foreground">{originalNewCount} Active</span>
											</div>
											<div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
												<div className="h-full bg-slate-300 dark:bg-zinc-600 rounded-full transition-all duration-1000 ease-out" style={{ width: `${originalPct}%` }} />
											</div>
										</div>

										{/* Target Tech ( Elena ) */}
										<div className="flex flex-col gap-2">
											<div className="flex justify-between text-xs font-bold">
												<span className="text-foreground truncate max-w-37.5">
													{targetStaff.firstName} {targetStaff.lastName}
												</span>
												<span
													className={cn(
														"font-mono transition-colors duration-500",
														targetIsCritical ? "text-rose-500" : targetIsWarning ? "text-amber-500" : "text-emerald-500",
													)}
												>
													+{caseIds.length} → {targetNewCount} Active
												</span>
											</div>
											<div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
												<div
													className={cn(
														"h-full rounded-full transition-all duration-1000 ease-out",
														targetIsCritical ? "bg-rose-500" : targetIsWarning ? "bg-amber-500" : "bg-emerald-500",
													)}
													style={{ width: `${targetPct}%` }}
												/>
											</div>
										</div>
									</div>
								</div>
							);
						})()}
				</div>

				{/* --- FOOTER --- */}
				<SheetFooter className="p-8 border-t border-border bg-slate-50/30 dark:bg-white/1 shrink-0">
					<Button variant="ghost" onClick={onClose} className="rounded-xl h-11! px-6 font-semibold">
						Cancel
					</Button>
					<Button
						onClick={handleExecute}
						disabled={isExecuting || !targetStaff}
						className="rounded-xl flex items-center justify-center gap-2 h-11 bg-primary shadow-premium font-bold hover:bg-primary/90 transition-all shrink-0"
					>
						{isExecuting ? <Loader2 className="animate-spin w-4 h-4" /> : <>Reassign Assignments</>}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

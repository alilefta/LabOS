"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Stethoscope, Plus, Search, UserCircle, Star, Users, Loader2, UserLock, Briefcase, Hospital, GraduationCap, Check, AlertTriangle } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/useDebounce";
import { Skeleton } from "@/components/ui/skeleton";

import { DentistPersonaCard } from "./dentist-persona-card";
import { usePermissions } from "@/providers/permissions-provider";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { DentistPersonaDTO } from "@/schema/composed/clinics/clinic-dentists.dtos";
import { getClinicDentistPersonasAction } from "@/actions/clinics/dentists/get-dentists";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { setDentistAsDefaultAction, toggleDentistActiveStatusAction } from "@/actions/dentists/update-dentist";
import { updateClinicTypeAction } from "@/actions/clinics/update-clinic";
import { ClinicType } from "@/schema/base/enums.base";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { DentistEditorSheet } from "@/components/modals/dentists/dentist-editor-sheet";
import { useQueryState, parseAsString } from "nuqs";

// Import your specific server action

interface Props {
	clinicId: string;
	currentClinicType: ClinicType;
}

type RoleFilter = "ALL" | "OWNERS" | "ASSOCIATES" | "INACTIVE";

export const DentistRosterGrid = memo(function DentistRosterGrid({ clinicId, currentClinicType }: Props) {
	const { canViewFinancials } = usePermissions();
	const queryClient = useQueryClient();
	// --- 1. UI STATE ---
	const [searchInput, setSearchInput] = useState("");
	const debouncedSearch = useDebounce({ value: searchInput, delay: 300 });
	const [roleFilter, setRoleFilter] = useState<RoleFilter>("ALL");

	// Sheet & Dialog Control
	// const [isSheetOpen, setIsSheetOpen] = useState(false);
	// const [editingId, setEditingId] = useState<string | null>(null);

	const [isTypeConflictDialogOpen, setIsTypeConflictDialogOpen] = useState(false);
	const [selectedNewType, setSelectedNewType] = useState<ClinicType>("CLINIC");
	const [editingId, setEditingId] = useQueryState("dentistId", parseAsString);
	const isSheetOpen = !!editingId;

	// --- 2. DATA FETCHING ---
	const {
		data: dentists = [],
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: ["clinic-dentists", clinicId],
		queryFn: async () => {
			const res = await getClinicDentistPersonasAction({ clinicId });
			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
				return [];
			}
			return (res?.data?.personas as DentistPersonaDTO[]) ?? [];
		},
		staleTime: 1000 * 60 * 5,
	});

	useEffect(() => {
		console.log("DentistRosterGrid MOUNTED");
		return () => console.log("DentistRosterGrid UNMOUNTED");
	}, []);
	// --- 3. ACTIONS ---
	const { executeAsync: executeToggleStatus } = useAction(toggleDentistActiveStatusAction, {
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clinic-dentists", clinicId] }),
		onError: ({ error }) => handleSafeActionError(error),
	});

	const { executeAsync: executeSetAsDefault } = useAction(setDentistAsDefaultAction, {
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clinic-dentists", clinicId] }),
		onError: ({ error }) => handleSafeActionError(error),
	});

	const { executeAsync: executeTypeConversion, isExecuting: isConverting } = useAction(updateClinicTypeAction, {
		onSuccess: () => {
			setIsTypeConflictDialogOpen(false);
			setEditingId("new");
			queryClient.invalidateQueries({ queryKey: ["clinic-detail", clinicId] });
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	// --- 4. CALLBACK HANDLERS (Memoized) ---
	const handleAddDoctorClick = useCallback(() => {
		if (currentClinicType === "SOLO") setIsTypeConflictDialogOpen(true);
		else setEditingId("new");
	}, [currentClinicType, setEditingId]);

	const handleEditDentist = useCallback(
		(id: string) => {
			setEditingId(id);
		},
		[setEditingId],
	);

	const handleCloseSheet = useCallback(() => {
		setEditingId(null);
	}, [setEditingId]);

	const handleToggleStatus = useCallback(
		async (dentistId: string, currentStatus: boolean) => {
			const target = dentists.find((d) => d.id === dentistId);
			if (currentStatus && (target?.isDefault || target?.isOwner)) {
				toast.error("Operation Denied", { description: "Primary contacts cannot be deactivated." });
				return;
			}
			toast.promise(executeToggleStatus({ clinicId, dentistId }), {
				loading: currentStatus ? "Suspending practitioner..." : "Restoring access...",
				success: "Status updated.",
				error: "Update failed.",
			});
		},
		[clinicId, executeToggleStatus, dentists],
	);

	const handleSetDefault = useCallback(
		async (dentistId: string) => {
			toast.promise(executeSetAsDefault({ clinicId, dentistId }), {
				loading: "Updating primary contact...",
				success: "Primary contact set.",
				error: "Update failed.",
			});
		},
		[clinicId, executeSetAsDefault],
	);

	// --- 5. FILTERING ---
	const filteredDentists = useMemo(() => {
		return dentists.filter((d) => {
			const searchLower = debouncedSearch.toLowerCase();
			const matchesSearch = d.name.toLowerCase().includes(searchLower) || d.email?.toLowerCase().includes(searchLower) || d.phoneNumber?.includes(debouncedSearch);
			if (roleFilter === "INACTIVE") return !d.isActive && matchesSearch;
			if (!d.isActive) return false;
			const matchesRole = roleFilter === "ALL" || (roleFilter === "OWNERS" && d.isOwner) || (roleFilter === "ASSOCIATES" && !d.isOwner);
			return matchesSearch && matchesRole;
		});
	}, [dentists, debouncedSearch, roleFilter]);
	console.log("Grid render:", { isSheetOpen, editingId });

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full min-h-0">
			{/* --- TOOLBAR ZONE --- */}
			<div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50/50 dark:bg-white/2 border border-border shadow-sm">
				{/* Left: Vitals & Roles */}
				<div className="flex flex-col sm:flex-row sm:items-center gap-6">
					<div className="flex items-center gap-3">
						<div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
							<Stethoscope className="w-4 h-4" />
						</div>
						<div>
							<h3 className="text-sm font-bold text-foreground">Practitioner Roster</h3>
							<div className="flex items-center gap-2 mt-0.5">
								<p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">{dentists.length} Doctors</p>
								{isFetching && <Loader2 className="w-3 h-3 text-primary animate-spin" />}
							</div>
						</div>
					</div>

					{/* Role Filter (Segmented Control) */}
					<div className="flex p-1 bg-white dark:bg-[#121214] rounded-xl border border-border shadow-sm">
						{[
							{ id: "ALL", label: "All Staff", icon: Users },
							{ id: "OWNERS", label: "Owners", icon: Star },
							{ id: "ASSOCIATES", label: "Associates", icon: UserCircle },
							{ id: "INACTIVE", label: "Inactive", icon: UserLock },
						].map((btn) => (
							<button
								key={btn.id}
								onClick={() => setRoleFilter(btn.id as RoleFilter)}
								className={cn(
									"flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
									roleFilter === btn.id ? "bg-slate-100 dark:bg-white/10 text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
								)}
							>
								<btn.icon className={cn("w-3 h-3", roleFilter === btn.id && btn.id === "OWNERS" ? "text-amber-500" : "")} />
								<span className="hidden sm:inline">{btn.label}</span>
							</button>
						))}
					</div>
				</div>

				{/* Right: Search & Actions */}
				<div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full xl:w-auto">
					<div className="relative w-full sm:w-64 group">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
						<input
							type="text"
							placeholder="Search by name, email..."
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
							className="w-full h-10 pl-9 pr-4 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none shadow-sm transition-all placeholder:text-muted-foreground/70"
						/>
					</div>
					<Button className="shrink-0 h-10 rounded-xl bg-primary text-white font-bold shadow-premium hover:bg-primary/90 transition-all" onClick={handleAddDoctorClick}>
						<Plus className="w-4 h-4 sm:mr-1.5" />
						<span className="hidden sm:inline">Register Doctor</span>
					</Button>
				</div>
			</div>
			{/* --- GRID ZONE --- */}
			<div className="flex-1 overflow-y-auto custom-scrollbar pb-6 pr-2">
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
					{/* Skeletons */}
					{isLoading &&
						Array.from({ length: 8 }).map((_, i) => (
							<div key={i} className="lab-card min-h-90 p-5 flex flex-col gap-4">
								<div className="flex items-start gap-3">
									<Skeleton className="w-11 h-11 rounded-full" />
									<div className="space-y-2 flex-1 pt-1">
										<Skeleton className="h-4 w-2/3" />
										<Skeleton className="h-3 w-1/3" />
									</div>
								</div>
								<div className="space-y-2 mt-4">
									<Skeleton className="h-3 w-full" />
									<Skeleton className="h-3 w-4/5" />
								</div>
								<Skeleton className="h-32 w-full rounded-xl mt-auto" />
							</div>
						))}

					{/* Rendered Cards */}
					{!isLoading &&
						filteredDentists.map((dentist) => (
							<DentistPersonaCard
								key={dentist.id}
								dentist={dentist}
								clinicId={clinicId}
								canViewFinancials={canViewFinancials}
								onEdit={handleEditDentist}
								onToggleStatus={handleToggleStatus}
								onSetDefault={handleSetDefault}
							/>
						))}
				</div>

				{/* --- EMPTY STATES --- */}
				{!isLoading && dentists.length === 0 && (
					<div className="py-20 flex flex-col items-center justify-center text-center animate-in fade-in">
						<div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 border border-border flex items-center justify-center mb-4 shadow-sm">
							<Stethoscope className="w-8 h-8 text-slate-300 dark:text-zinc-600" />
						</div>
						<h4 className="text-base font-bold text-foreground">No Practitioners Registered</h4>
						<p className="text-xs text-muted-foreground mt-1 max-w-sm mb-6">
							This clinic profile doesn&apos;t have any associated doctors yet. Add a practitioner to start logging their clinical preferences.
						</p>
						<Button className="rounded-xl bg-primary text-white font-bold px-6 shadow-sm hover:bg-primary/90">
							<Plus className="w-4 h-4 mr-2" /> Register First Doctor
						</Button>
					</div>
				)}

				{!isLoading && dentists.length > 0 && filteredDentists.length === 0 && (
					<div className="py-20 flex flex-col items-center justify-center text-center animate-in fade-in">
						<Search className="w-10 h-10 text-slate-300 dark:text-zinc-600 mb-4" />
						<h4 className="text-sm font-bold text-foreground">No matches found</h4>
						<p className="text-xs text-muted-foreground mt-1 max-w-sm">No doctors match your search for &quot;{searchInput}&quot; with the current role filter.</p>
					</div>
				)}
			</div>
			{/* --- CONVERSION DIALOG --- */}
			<Dialog open={isTypeConflictDialogOpen} onOpenChange={setIsTypeConflictDialogOpen}>
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
								onClick={() => setSelectedNewType(t.id as ClinicType)}
								className={cn(
									"flex items-center justify-between w-full p-4 rounded-2xl border transition-all",
									selectedNewType === t.id ? "border-primary bg-primary/5 ring-1 ring-primary/20 shadow-sm" : "border-border hover:border-slate-300",
								)}
							>
								<div className="flex items-center gap-3">
									<div
										className={cn(
											"w-8 h-8 rounded-lg flex items-center justify-center",
											selectedNewType === t.id ? "bg-primary text-white" : "bg-slate-100 dark:bg-white/5 text-slate-500",
										)}
									>
										<t.icon className="w-4 h-4" />
									</div>
									<span className={cn("text-sm font-bold", selectedNewType === t.id ? "text-foreground" : "text-muted-foreground")}>{t.label}</span>
								</div>
								{selectedNewType === t.id && <Check className="w-4 h-4 text-primary animate-in zoom-in" />}
							</button>
						))}
					</div>
					<DialogFooter className="p-6 border-t border-border bg-slate-50/30 dark:bg-white/1 flex flex-row gap-3">
						<Button variant="ghost" onClick={() => setIsTypeConflictDialogOpen(false)} className="rounded-xl h-11 px-6 font-semibold">
							Cancel
						</Button>
						<Button
							onClick={() => executeTypeConversion({ clinicId, type: selectedNewType })}
							disabled={isConverting}
							className="flex-1 rounded-xl h-11 bg-primary text-white shadow-premium font-bold hover:bg-primary/90"
						>
							{isConverting ? <Loader2 className="animate-spin mr-2" /> : <Check className="mr-2 h-4 w-4" />} Confirm & Continue
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			{/* --- UNIFIED EDITOR SHEET --- */}
			<DentistEditorSheet isOpen={isSheetOpen} onClose={handleCloseSheet} clinicId={clinicId} dentistIdToEdit={editingId === "new" ? null : editingId} />
		</div>
	);
});

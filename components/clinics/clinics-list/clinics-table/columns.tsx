"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Building2, UserCircle, Hospital, GraduationCap, Phone, CheckCircle2, AlertTriangle, FileText, PauseCircle, LucideIcon, Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ClinicListDTO } from "@/schema/composed/clinic.details";
import { useRouter } from "next/navigation";

// --- FORMATTERS ---
const formatCurrency = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

const getClinicIcon = (type: ClinicListDTO["type"]) => {
	switch (type) {
		case "SOLO":
			return <UserCircle className="w-3 h-3 shrink-0" />;
		case "HOSPITAL":
			return <Hospital className="w-3 h-3 shrink-0" />;
		case "UNIVERSITY":
			return <GraduationCap className="w-3 h-3 shrink-0" />;
		default:
			return <Building2 className="w-3 h-3 shrink-0" />;
	}
};

// const STATUS_CONFIG: Record<ClinicListDTO["status"], { label: string; icon: LucideIcon; colorClass: string }> = {
// 	ACTIVE: { label: "Active", icon: CheckCircle2, colorClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
// 	INACTIVE: { label: "Inactive", icon: PauseCircle, colorClass: "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-zinc-300 border-border" },
// 	SUSPENDED: { label: "Suspended", icon: AlertTriangle, colorClass: "bg-destructive/10 text-destructive border-destructive/20 animate-pulse" },
// };

export const columns: ColumnDef<ClinicListDTO>[] = [
	{
		accessorKey: "name",
		id: "name",
		header: "Clinic Partner",
		cell: ({ row }) => {
			const clinic = row.original;
			const score = clinic.healthScore;

			// Health Color Logic
			const healthColor = score >= 90 ? "emerald" : score >= 75 ? "amber" : "rose";

			return (
				<div className="flex flex-col gap-2 max-w-62.5">
					<div className="flex items-center gap-2">
						<span className="font-bold text-sm text-foreground truncate">{clinic.name}</span>
						{/* --- 1. THE HEALTH GAUGE --- */}
						<div
							className={cn(
								"flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter border animate-in fade-in zoom-in-95",
								healthColor === "emerald"
									? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
									: healthColor === "amber"
										? "bg-amber-500/10 text-amber-600 border-amber-500/20"
										: "bg-rose-500/10 text-rose-600 border-rose-500/20",
							)}
						>
							<div className={cn("w-1 h-1 rounded-full animate-pulse", `bg-${healthColor}-500`)} />
							{score}%
						</div>
					</div>
					<div className="flex items-center gap-1.5">
						<span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-[9px] font-bold text-muted-foreground uppercase tracking-widest border border-border">
							{getClinicIcon(clinic.type)} {clinic.type}
						</span>
						<span className="text-[10px] text-muted-foreground uppercase tracking-widest truncate font-medium">{clinic.city}</span>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "ownerDentist",
		id: "ownerDentist",
		header: "Primary Contact",
		cell: ({ row }) => {
			const dentist = row.original.ownerDentist;
			const totalDentists = row.original.totalDentists;

			if (!dentist) {
				return <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground italic opacity-50">No Contact Set</span>;
			}

			return (
				<div className="flex items-center gap-3">
					<Avatar className="h-8 w-8 border border-border shadow-sm shrink-0">
						<AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold tracking-tighter">{dentist.name.substring(0, 2).toUpperCase()}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col max-w-35">
						<span className="text-xs font-bold text-foreground truncate">{dentist.name}</span>
						{totalDentists > 1 ? (
							<span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">+{totalDentists - 1} Other Doctors</span>
						) : (
							<a
								href={`https://wa.me/${row.original.phoneNumber.replace(/[^0-9]/g, "")}`}
								target="_blank"
								rel="noopener noreferrer"
								onClick={(e) => e.stopPropagation()}
								className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-1 mt-0.5"
							>
								<Phone className="w-2.5 h-2.5" /> WhatsApp
							</a>
						)}
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "trendData",
		id: "trend",
		header: "6-Week Volume",
		cell: ({ row }) => {
			const data = row.original.trendData.map((val, i) => ({ val, i }));
			// Calculate trend direction for color
			const isUp = row.original.trendData[5] + row.original.trendData[4] >= row.original.trendData[0] + row.original.trendData[1];
			const health = row.original.healthScore;
			return (
				<div className="flex flex-col gap-1.5 items-center w-full">
					{/* --- 2. THE SPARKLINE --- */}
					<div className="h-8 w-full min-h-8">
						<ResponsiveContainer width="100%" height={32} minWidth={0}>
							<LineChart data={data} className="pointer-events-none">
								<Line
									type="monotone"
									dataKey="val"
									//stroke={isUp ? "var(--color-chart-3)" : "var(--color-chart-5)"}
									stroke={health > 90 ? "var(--color-chart-3)" : health > 70 ? "var(--color-chart-4)" : "var(--color-chart-5)"}
									strokeWidth={2.5}
									dot={false}
									animationDuration={1000}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
					<div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
						{isUp ? <TrendingUp className="w-2.5 h-2.5 text-emerald-500" /> : <TrendingDown className="w-2.5 h-2.5 text-rose-500" />}
						Trend
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "activeCases",
		id: "activeCases",
		header: "Production",
		cell: ({ row }) => {
			const activeCases = row.getValue("activeCases") as number;
			const uninvoiced = row.original.uninvoicedCasesCount;

			return (
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-1.5">
						<span className="text-sm font-mono font-bold text-foreground">{activeCases}</span>
						<span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">In Lab</span>
					</div>
					{uninvoiced > 0 && (
						<div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-500 animate-in zoom-in-95 shrink-0 w-fit">
							<FileText className="w-2.5 h-2.5" />
							<span className="text-[9px] font-black uppercase tracking-widest">{uninvoiced} Unbilled</span>
						</div>
					)}
				</div>
			);
		},
	},
	{
		accessorKey: "currentBalance",
		id: "currentBalance",
		header: "Account Ledger",
		cell: ({ row }) => {
			const balance = row.getValue("currentBalance") as number;
			const limit = row.original.creditLimit;

			if (!limit || limit === 0) {
				return (
					<div className="flex flex-col gap-1">
						<span className="font-mono font-bold text-sm text-foreground">{formatCurrency(balance)}</span>
						<span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">No Limit</span>
					</div>
				);
			}

			const exposurePercent = Math.min((balance / limit) * 100, 100);
			const isHighRisk = exposurePercent >= 80;

			return (
				<div className="flex flex-col gap-1.5 w-[140px]">
					<div className="flex items-center justify-between">
						<span className={cn("font-mono font-bold text-sm", isHighRisk ? "text-amber-600 dark:text-amber-500" : "text-foreground")}>{formatCurrency(balance)}</span>
						<span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">/ {formatCurrency(limit)}</span>
					</div>
					<Progress value={exposurePercent} className={cn("h-1.5 bg-slate-100 dark:bg-white/5", isHighRisk ? "[&>div]:bg-amber-500" : "[&>div]:bg-emerald-500")} />
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const clinic = row.original;

			return (
				<div className="text-right">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4 text-muted-foreground" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-48 rounded-xl border-border shadow-premium dark:bg-[#121214]">
							<DropdownMenuLabel className="text-[10px] text-muted-foreground uppercase tracking-widest">Management</DropdownMenuLabel>
							<DropdownMenuItem className="cursor-pointer font-medium py-2 hover:bg-primary/5">Quick View</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer font-medium py-2 hover:bg-primary/5">Full Clinic View</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer font-medium py-2 hover:bg-primary/5 text-primary">New Case</DropdownMenuItem>
							<DropdownMenuSeparator className="bg-border" />
							{clinic.uninvoicedCasesCount > 0 ? (
								<DropdownMenuItem className="cursor-pointer font-bold py-2 text-emerald-600 focus:text-emerald-600 focus:bg-emerald-500/10">
									<FileText className="w-4 h-4 mr-2" /> Generate Invoice
								</DropdownMenuItem>
							) : (
								<DropdownMenuItem className="cursor-pointer font-medium py-2 hover:bg-emerald-500/5">
									<Wallet className="w-4 h-4 mr-2 text-emerald-500" /> Record Payment
								</DropdownMenuItem>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];

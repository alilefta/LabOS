"use client";

import { ColumnDef, flexRender } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Inbox, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useRef, ReactNode } from "react";
import { useDataTable } from "@/hooks/use-data-table";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isLoading?: boolean;
	onRowClick?: (row: TData) => void;

	// Infinite Scroll Triggers
	fetchNextPage?: () => void;
	isFetchingNextPage?: boolean;
	hasNextPage?: boolean;

	// UPGRADED: Structured Empty State Configuration [DX Improvement]
	emptyState?: {
		title: string;
		description: string;
		icon?: ReactNode; // Supports passing a styled Lucide Icon or custom badge
	};
	minHeight: number;
}

export function DataTable<TData, TValue>({ columns, data, isLoading, onRowClick, fetchNextPage, isFetchingNextPage, hasNextPage, emptyState, minHeight }: DataTableProps<TData, TValue>) {
	const table = useDataTable({
		data,
		columns,
	});

	const { rows } = table.getRowModel();
	const tableContainerRef = useRef<HTMLDivElement>(null);

	const rowVirtualizer = useVirtualizer({
		count: hasNextPage ? rows.length + 1 : rows.length,
		getScrollElement: () => tableContainerRef.current,
		estimateSize: () => 72,
		overscan: 10,
	});

	const virtualItems = rowVirtualizer.getVirtualItems();

	// Infinite Scroll Trigger Effect
	useEffect(() => {
		const [lastItem] = [...virtualItems].reverse();
		if (!lastItem) return;

		if (lastItem.index >= rows.length - 1 && hasNextPage && !isFetchingNextPage && fetchNextPage) {
			fetchNextPage();
		}
	}, [hasNextPage, fetchNextPage, rows.length, isFetchingNextPage, virtualItems]);

	const paddingTop = virtualItems.length > 0 ? virtualItems?.[0]?.start || 0 : 0;
	const paddingBottom = virtualItems.length > 0 ? rowVirtualizer.getTotalSize() - (virtualItems?.[virtualItems.length - 1]?.end || 0) : 0;

	return (
		<div ref={tableContainerRef} className="flex-1 h-full w-full overflow-auto custom-scrollbar bg-slate-50/50 dark:bg-white/2 relative">
			<table className="w-full text-left border-collapse whitespace-nowrap">
				{/* --- STICKY FROSTED HEADER --- */}
				<thead className="sticky top-0 z-20 bg-slate-50/90 dark:bg-[#09090B]/90 backdrop-blur-xl border-b border-border shadow-sm shadow-black/5">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<th key={header.id} className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
									</th>
								);
							})}
						</tr>
					))}
				</thead>

				{/* --- VIRTUALIZED BODY --- */}
				<tbody className="divide-y divide-border/50">
					{paddingTop > 0 && (
						<tr>
							<td style={{ height: `${paddingTop}px` }} />
						</tr>
					)}

					{virtualItems.map((virtualRow) => {
						const isLoaderRow = virtualRow.index > rows.length - 1;
						const row = rows[virtualRow.index];

						if (isLoaderRow) {
							return (
								<tr key={`loader-${virtualRow.index}`} className="h-18">
									<td colSpan={columns.length} className="px-6 py-4 text-center">
										<Loader2 className="w-5 h-5 animate-spin text-primary mx-auto" />
									</td>
								</tr>
							);
						}

						return (
							<tr
								key={row.id}
								onClick={() => onRowClick && onRowClick(row.original)}
								className={cn("group transition-colors duration-200 bg-background", onRowClick ? "cursor-pointer hover:bg-slate-50 dark:hover:bg-white/2" : "hover:bg-transparent")}
							>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className="px-6 py-4 align-middle">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						);
					})}

					{paddingBottom > 0 && (
						<tr>
							<td style={{ height: `${paddingBottom}px` }} />
						</tr>
					)}

					{/* --- EMPTY STATE HANDLING --- */}
					{!isLoading && data.length === 0 && (
						<tr>
							<td colSpan={columns.length}>
								<div
									className="flex flex-col items-center justify-center py-16 px-4 text-center animate-in fade-in zoom-in-95 duration-500"
									style={{
										// Uses your exact layout height logic!
										minHeight: `${minHeight}px`,
									}}
								>
									{/* 1. DYNAMIC CONTAINER FOR ICON */}
									<div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 border border-border flex items-center justify-center mb-4 shadow-sm transition-transform duration-300 hover:scale-110">
										{emptyState?.icon ? emptyState.icon : <Inbox className="w-8 h-8 text-slate-400 dark:text-zinc-500" />}
									</div>

									{/* 2. DYNAMIC TEXT CONTENT */}
									<h3 className="text-lg font-bold text-foreground">{emptyState?.title || "No records found"}</h3>
									<p className="text-xs text-muted-foreground mt-1 max-w-sm leading-relaxed">
										{emptyState?.description || "Adjust your filters or use the AI Copilot to query different parameters."}
									</p>
								</div>
							</td>
						</tr>
					)}

					{/* Initial Loading Skeletons */}
					{isLoading && data.length === 0 && (
						<>
							{Array.from({ length: 8 }).map((_, i) => (
								<tr key={`skeleton-${i}`} className="border-b border-border/50">
									{columns.map((_, colIndex) => (
										<td key={`skeleton-col-${colIndex}`} className="px-6 py-5">
											<Skeleton className="h-5 w-full max-w-30 rounded-md bg-slate-200 dark:bg-white/5" />
										</td>
									))}
								</tr>
							))}
						</>
					)}
				</tbody>
			</table>
		</div>
	);
}

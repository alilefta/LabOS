"use client";

import * as React from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Inbox, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isLoading?: boolean;
	onRowClick?: (row: TData) => void;

	// Optional: Infinite Scroll Triggers (For Step 3!)
	fetchNextPage?: () => void;
	isFetchingNextPage?: boolean;
	hasNextPage?: boolean;
}

export function DataTable<TData, TValue>({ columns, data, isLoading, onRowClick, fetchNextPage, isFetchingNextPage, hasNextPage }: DataTableProps<TData, TValue>) {
	// 1. Initialize TanStack Table
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const { rows } = table.getRowModel();

	// 2. Initialize the Scroll Container Ref for Virtualization
	const tableContainerRef = React.useRef<HTMLDivElement>(null);

	// 3. Initialize TanStack Virtualizer
	const rowVirtualizer = useVirtualizer({
		count: hasNextPage ? rows.length + 1 : rows.length, // Add 1 extra row for the loading spinner if more pages exist
		getScrollElement: () => tableContainerRef.current,
		// Estimate row height (72px is roughly the height of our padded rows)
		estimateSize: () => 72,
		overscan: 10, // Render 10 items off-screen for smooth scrolling
	});

	// 4. Infinite Scroll Trigger Effect
	const virtualItems = rowVirtualizer.getVirtualItems();
	React.useEffect(() => {
		const [lastItem] = [...virtualItems].reverse();
		if (!lastItem) return;

		// If the last rendered item is the "loading" row and we aren't already fetching, grab the next page!
		if (lastItem.index >= rows.length - 1 && hasNextPage && !isFetchingNextPage && fetchNextPage) {
			fetchNextPage();
		}
	}, [hasNextPage, fetchNextPage, rows.length, isFetchingNextPage, virtualItems]);

	// 5. Calculate Virtual Padding (The magic that makes the scrollbar accurate without rendering rows)
	const paddingTop = virtualItems.length > 0 ? virtualItems?.[0]?.start || 0 : 0;
	const paddingBottom = virtualItems.length > 0 ? rowVirtualizer.getTotalSize() - (virtualItems?.[virtualItems.length - 1]?.end || 0) : 0;

	return (
		<div ref={tableContainerRef} className="flex-1 h-full w-full overflow-auto custom-scrollbar bg-slate-50/50 dark:bg-white/[0.02] relative">
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
					{/* Top Padding */}
					{paddingTop > 0 && (
						<tr>
							<td style={{ height: `${paddingTop}px` }} />
						</tr>
					)}

					{/* Visible Rows */}
					{virtualItems.map((virtualRow) => {
						const isLoaderRow = virtualRow.index > rows.length - 1;
						const row = rows[virtualRow.index];

						// If this is the extra row added for infinite scrolling
						if (isLoaderRow) {
							return (
								<tr key={`loader-${virtualRow.index}`} className="h-[72px]">
									<td colSpan={columns.length} className="px-6 py-4 text-center">
										<Loader2 className="w-5 h-5 animate-spin text-primary mx-auto" />
									</td>
								</tr>
							);
						}

						// Actual Data Row
						return (
							<tr
								key={row.id}
								onClick={() => onRowClick && onRowClick(row.original)}
								className={cn(
									"group transition-colors duration-200 bg-background",
									onRowClick ? "cursor-pointer hover:bg-slate-50 dark:hover:bg-white/[0.02]" : "hover:bg-transparent",
								)}
							>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className="px-6 py-4 align-middle">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						);
					})}

					{/* Bottom Padding */}
					{paddingBottom > 0 && (
						<tr>
							<td style={{ height: `${paddingBottom}px` }} />
						</tr>
					)}

					{/* Empty State */}
					{!isLoading && data.length === 0 && (
						<tr>
							<td colSpan={columns.length}>
								<div className="flex flex-col items-center justify-center p-16 text-center animate-in fade-in zoom-in-95">
									<div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4 border border-border">
										<Inbox className="w-8 h-8 text-slate-400 dark:text-zinc-500" />
									</div>
									<h3 className="text-lg font-bold text-foreground">No cases found</h3>
									<p className="text-xs text-muted-foreground mt-1 max-w-sm">Adjust your filters or use the AI Copilot to query different clinical parameters.</p>
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
											<Skeleton className="h-5 w-full max-w-[120px] rounded-md bg-slate-200 dark:bg-white/5" />
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

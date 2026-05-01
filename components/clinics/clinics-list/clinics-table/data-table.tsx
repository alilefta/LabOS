"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Building2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ClinicListDTO } from "@/schema/composed/clinic.details";
import { memo, useEffect, useRef } from "react";

interface DataTableProps {
	columns: ColumnDef<ClinicListDTO>[];
	data: ClinicListDTO[];
	isLoading?: boolean;
	onRowClick?: (row: ClinicListDTO) => void;
	fetchNextPage?: () => void;
	isFetchingNextPage?: boolean;
	hasNextPage?: boolean;
}

export const DataTable = memo(function DataTable({ columns, data, isLoading, onRowClick, fetchNextPage, isFetchingNextPage, hasNextPage }: DataTableProps) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const { rows } = table.getRowModel();
	const tableContainerRef = useRef<HTMLDivElement>(null);

	const rowVirtualizer = useVirtualizer({
		count: hasNextPage ? rows.length + 1 : rows.length,
		getScrollElement: () => tableContainerRef.current,
		estimateSize: () => 76,
		overscan: 10,
	});

	const virtualItems = rowVirtualizer.getVirtualItems();

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
				<thead className="sticky top-0 z-20 bg-slate-50/90 dark:bg-[#09090B]/90 backdrop-blur-xl border-b border-border shadow-sm shadow-black/5">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id} className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
									{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>

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
								<tr key={`loader-${virtualRow.index}`} className="h-[76px]">
									<td colSpan={columns.length} className="px-6 py-4 text-center">
										<Loader2 className="w-5 h-5 animate-spin text-primary mx-auto" />
									</td>
								</tr>
							);
						}

						return (
							<tr
								key={row.id}
								onClick={() => onRowClick?.(row.original)}
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

					{/* EMPTY STATE */}
					{!isLoading && data.length === 0 && (
						<tr>
							<td colSpan={columns.length}>
								<div className="flex flex-col items-center justify-center p-16 text-center animate-in fade-in zoom-in-95">
									<div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4 border border-border">
										<Building2 className="w-8 h-8 text-slate-400 dark:text-zinc-500" />
									</div>
									<h3 className="text-lg font-bold text-foreground">No clinic partners found</h3>
									<p className="text-xs text-muted-foreground mt-1 max-w-sm">Adjust your filters or register a new clinic to begin production.</p>
								</div>
							</td>
						</tr>
					)}

					{/* SKELETON LOADERS */}
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
});

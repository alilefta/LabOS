"use client";

import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";

export function useDataTable<TData, TValue>({ data, columns }: { columns: ColumnDef<TData, TValue>[]; data: TData[] }) {
	return useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});
}

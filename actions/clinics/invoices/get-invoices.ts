"use server";

import { ERRORS } from "@/lib/errors";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { z } from "zod";
import { InvoiceStatus } from "@/generated/prisma/client";
import { APIError } from "better-auth";
import { endOfDay, startOfDay, startOfMonth, subMonths } from "date-fns";
import { InvoiceFiltersSchema } from "@/schema/composed/invoices/invoice-filters";
import { DatePreset } from "@/schema/composed/shared/date-preset";

export type ClinicInvoiceListDTO = {
	id: string;
	invoiceNumber: string;
	status: InvoiceStatus;
	issuedAt: Date | null;
	dueDate: Date | null;
	total: number;
	amountDue: number;
};

export type GetClinicInvoicesResult = {
	invoices: ClinicInvoiceListDTO[];
	nextCursor: string | null;
	totalCount: number;
};

function resolveDatePreset(preset: DatePreset, from: Date | null, to: Date | null): { gte: Date; lte: Date } | null {
	const now = new Date();
	switch (preset) {
		case "this_month":
			return { gte: startOfMonth(now), lte: endOfDay(now) };
		case "last_month": {
			const start = startOfMonth(subMonths(now, 1));
			const end = endOfDay(new Date(now.getFullYear(), now.getMonth(), 0));
			return { gte: start, lte: end };
		}
		case "last_3_months":
			return { gte: startOfDay(subMonths(now, 3)), lte: endOfDay(now) };
		case "last_6_months":
			return { gte: startOfDay(subMonths(now, 6)), lte: endOfDay(now) };
		case "custom":
			if (!from || !to) return null;
			return { gte: startOfDay(from), lte: endOfDay(to) };
	}
}

export const getClinicInvoicesAction = actionClientWithLab
	.metadata({
		actionName: "Get-Clinic-Invoices-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(
		z.object({
			clinicId: z.uuid(),
			cursor: z.string().optional(),
			take: z.number().default(20),
			search: z.string().optional(),
			filters: InvoiceFiltersSchema,
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { labId } = ctx;
		const { clinicId, cursor, take, search, filters } = parsedInput;
		try {
			const prisma = await tenantPrisma(labId);

			const clinic = await prisma.clinic.findUnique({
				where: { id: clinicId, labId },
				select: { id: true },
			});
			if (!clinic) throw ERRORS.CLIENT_NOT_FOUND;

			// ── Where clause ──────────────────────────────────────────────────────────
			const unpaidStatuses: InvoiceStatus[] = ["SENT", "PARTIAL", "OVERDUE"];

			const statusWhere = filters.isUnpaidOnly ? { status: { in: unpaidStatuses } } : filters.statuses.length > 0 ? { status: { in: filters.statuses } } : {};

			const dateWhere = filters.dateRange
				? (() => {
						const range = resolveDatePreset(filters.dateRange!.preset, filters.dateRange!.from, filters.dateRange!.to);
						if (!range) return {};
						return { [filters.dateRange!.field]: range };
					})()
				: {};

			const where = {
				clinicId,
				labId,
				...statusWhere,
				...dateWhere,
				...(search?.trim() && {
					invoiceNumber: { contains: search.trim(), mode: "insensitive" as const },
				}),
			};

			// ── Query ─────────────────────────────────────────────────────────────────
			const [rawInvoices, totalCount] = await Promise.all([
				prisma.invoice.findMany({
					where,
					take: take + 1,
					...(cursor && { cursor: { id: cursor }, skip: 1 }),
					orderBy: { createdAt: "desc" },
					select: {
						id: true,
						invoiceNumber: true,
						status: true,
						issuedAt: true,
						dueDate: true,
						total: true,
						amountDue: true,
					},
				}),
				prisma.invoice.count({ where }),
			]);

			const hasNextPage = rawInvoices.length > take;
			const page = hasNextPage ? rawInvoices.slice(0, -1) : rawInvoices;

			const invoices: ClinicInvoiceListDTO[] = page.map((inv) => ({
				id: inv.id,
				invoiceNumber: inv.invoiceNumber,
				status: inv.status,
				issuedAt: inv.issuedAt,
				dueDate: inv.dueDate,
				total: Number(inv.total),
				amountDue: Number(inv.amountDue),
			}));

			return {
				invoices,
				nextCursor: hasNextPage ? page[page.length - 1].id : null,
				totalCount,
			} as GetClinicInvoicesResult;
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-Clinic-Invoices-Action] Error", e.message);
			}
			throw e;
		}
	});

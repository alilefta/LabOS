"use server";

import { ERRORS } from "@/lib/errors";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { Prisma } from "@/generated/prisma/client";
import { endOfDay, startOfDay, startOfMonth, subMonths } from "date-fns";
import { GetInvoicsListSchema, GetInvoicesListResult, InvoiceListDTO } from "@/schema/composed/invoices/invoices.dtos";
import { DatePreset } from "@/schema/composed/shared/date-preset";
import { InvoicePulseFilter } from "@/schema/composed/invoices/invoice-filters";
import { INVOICE_LIST_SELECT } from "@/data/invoices/invoice-read-projections";

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

function buildPulseWhere(pulse: InvoicePulseFilter, now: Date): Prisma.InvoiceWhereInput {
	switch (pulse) {
		case "outstanding":
			return { amountDue: { gt: 0 }, status: { in: ["SENT", "PARTIAL"] } };
		case "overdue":
			return { amountDue: { gt: 0 }, dueDate: { lt: now } };
		case "collected":
			return { status: "PAID" };
		case "all":
		default:
			return {};
	}
}

export const getInvoicesListAction = actionClientWithLab
	.metadata({
		actionName: "Get-Invoices-List-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(GetInvoicsListSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { labId } = ctx;
		const { cursor, take, search, filters } = parsedInput;

		const prisma = await tenantPrisma(labId);

		// ── Clinic guard (if scoped) ───────────────────────────────────────────────
		if (filters.clinicId) {
			const clinic = await prisma.clinic.findUnique({
				where: { id: filters.clinicId, labId },
				select: { id: true },
			});
			if (!clinic) throw ERRORS.CLIENT_NOT_FOUND;
		}

		const now = new Date();

		// ── Where clause ──────────────────────────────────────────────────────────
		const pulseWhere = buildPulseWhere(filters.pulseFilter, now);

		const statusWhere: Prisma.InvoiceWhereInput = filters.isUnpaidOnly
			? { status: { in: ["SENT", "PARTIAL", "OVERDUE"] } }
			: filters.statuses.length > 0
				? { status: { in: filters.statuses } }
				: {};

		const dateWhere: Prisma.InvoiceWhereInput = filters.dateRange
			? (() => {
					const range = resolveDatePreset(filters.dateRange!.preset, filters.dateRange!.from, filters.dateRange!.to);
					if (!range) return {};
					return { [filters.dateRange!.field]: range };
				})()
			: {};

		const where: Prisma.InvoiceWhereInput = {
			labId,
			...pulseWhere,
			...statusWhere,
			...dateWhere,
			...(filters.clinicId && { clinicId: filters.clinicId }),
			...(search?.trim() && {
				OR: [{ invoiceNumber: { contains: search.trim(), mode: "insensitive" } }, { clinic: { name: { contains: search.trim(), mode: "insensitive" } } }],
			}),
		};

		// ── Queries — all parallel ────────────────────────────────────────────────
		const [rawInvoices, totalCount, amountDueAggregate] = await Promise.all([
			prisma.invoice.findMany({
				where,
				take: take + 1,
				...(cursor && { cursor: { id: cursor }, skip: 1 }),
				orderBy: [{ dueDate: "asc" }, { createdAt: "desc" }],
				select: INVOICE_LIST_SELECT,
			}),
			prisma.invoice.count({ where }),
			prisma.invoice.aggregate({
				where,
				_sum: { amountDue: true },
			}),
		]);

		const hasNextPage = rawInvoices.length > take;
		const page = hasNextPage ? rawInvoices.slice(0, -1) : rawInvoices;

		const invoices: InvoiceListDTO[] = page.map((inv) => {
			const total = Number(inv.total);
			const amountPaid = Number(inv.amountPaid);
			const amountDue = Number(inv.amountDue);

			return {
				id: inv.id,
				invoiceNumber: inv.invoiceNumber,
				clinicName: inv.clinic.name,
				issuedAt: inv.issuedAt,
				dueDate: inv.dueDate,
				total,
				amountPaid,
				amountDue,
				status: inv.status,
				isOverdue: amountDue > 0 && inv.dueDate !== null && inv.dueDate < now,
				progressPct: total > 0 ? Math.round((amountPaid / total) * 100) : 0,
			};
		});

		return {
			invoices,
			nextCursor: hasNextPage ? page[page.length - 1].id : null,
			totalCount,
			totalAmountDue: Number(amountDueAggregate._sum.amountDue ?? 0),
		} as GetInvoicesListResult;
	});

"use server";

import { addDays, startOfDay } from "date-fns";
import { Prisma } from "@/generated/prisma/client";
import { actionClientWithAuthorization } from "@/lib/safe-action";
import { generalPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";

const LIVE_STATUSES = new Set(["SENT", "PARTIAL", "PAID", "OVERDUE"]);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isSerializationAbort(error: unknown): boolean {
	if (!(error instanceof Prisma.PrismaClientKnownRequestError)) return false;
	if (error.code === 'P2034') return true;
	const adapter = error.meta?.driverAdapterError as { cause?: { originalCode?: unknown } } | undefined;
	return error.code === 'P2010' && adapter?.cause?.originalCode === '40001';
}

/** A bearer is returned only after its durable disclosure audit commits. */
export const shareInvoicePublicLinkAction = actionClientWithAuthorization('N-FIN-PL-001')
	.action(async ({ parsedInput, ctx }) => {
		const { invoiceId } = parsedInput;
		const { labId, organizationId, memberId, userId, memberRole } = ctx;
		const correlationId = crypto.randomUUID();

		for (let attempt = 0; attempt < 3; attempt++) {
			try {
				const shared = await generalPrisma.$transaction(async (tx) => {
					const locked = await tx.$queryRaw<Array<{ id: string }>>`
						SELECT "id" FROM "Invoice" WHERE "id" = ${invoiceId} AND "labId" = ${labId} FOR UPDATE`;
					if (locked.length !== 1) throw ERRORS.OPERATION_NOT_ALLOWED;

					const invoice = await tx.invoice.findUnique({ where: { id: invoiceId, labId }, select: {
							id: true, labId: true, status: true, isActive: true,
							publicToken: true, publicLinkExpiresAt: true,
					} });
					const lab = await tx.lab.findUnique({ where: { id: labId }, select: { id: true, organizationId: true } });
					const organization = await tx.organization.findUnique({ where: { id: organizationId }, select: { id: true } });
					const member = await tx.member.findFirst({ where: { id: memberId, organizationId, userId }, select: { id: true, role: true } });
					if (!invoice || invoice.labId !== labId || !lab || lab.organizationId !== organizationId ||
						!organization || !member || member.role !== memberRole ||
						!invoice.isActive || !LIVE_STATUSES.has(invoice.status)) {
						throw ERRORS.OPERATION_NOT_ALLOWED;
					}

					const existingDisclosure = await tx.invoicePublicLinkAudit.findUnique({
						where: { correlationId_event: { correlationId, event: 'DISCLOSED' } },
						select: { actorMemberId: true, organizationId: true, labId: true, invoiceId: true },
					});
					if (existingDisclosure && (existingDisclosure.actorMemberId !== memberId ||
						existingDisclosure.organizationId !== organizationId || existingDisclosure.labId !== labId ||
						existingDisclosure.invoiceId !== invoiceId)) throw ERRORS.OPERATION_NOT_ALLOWED;

					let token = invoice.publicToken;
					let expiresAt = invoice.publicLinkExpiresAt;
					const issuing = token === null && expiresAt === null;
					if (existingDisclosure && issuing) throw ERRORS.OPERATION_NOT_ALLOWED;
					if (issuing) {
						token = crypto.randomUUID();
						expiresAt = addDays(startOfDay(new Date()), 90);
						await tx.invoice.update({
							where: { id: invoiceId, labId },
							data: { publicToken: token, publicLinkExpiresAt: expiresAt },
						});
					} else if (!token || !UUID.test(token) || !expiresAt || expiresAt < new Date()) {
						throw ERRORS.OPERATION_NOT_ALLOWED;
					}
					if (!expiresAt || expiresAt < new Date()) throw ERRORS.OPERATION_NOT_ALLOWED;

					if (!existingDisclosure) {
						if (issuing) {
							const issued = await tx.$executeRaw`
								INSERT INTO "InvoicePublicLinkAudit" ("id", "organizationId", "labId", "invoiceId", "actorMemberId", "correlationId", "event", "expiresAt")
								SELECT ${crypto.randomUUID()}, ${organizationId}, ${labId}, ${invoiceId}, ${memberId}, ${correlationId},
									'ISSUED'::"InvoicePublicLinkAuditEvent", "publicLinkExpiresAt" AT TIME ZONE 'UTC'
								FROM "Invoice" WHERE "id" = ${invoiceId} AND "labId" = ${labId} AND "publicLinkExpiresAt" IS NOT NULL`;
							if (issued !== 1) throw ERRORS.OPERATION_NOT_ALLOWED;
						}
						const disclosed = await tx.$executeRaw`
							INSERT INTO "InvoicePublicLinkAudit" ("id", "organizationId", "labId", "invoiceId", "actorMemberId", "correlationId", "event", "expiresAt")
							SELECT ${crypto.randomUUID()}, ${organizationId}, ${labId}, ${invoiceId}, ${memberId}, ${correlationId},
								'DISCLOSED'::"InvoicePublicLinkAuditEvent", "publicLinkExpiresAt" AT TIME ZONE 'UTC'
							FROM "Invoice" WHERE "id" = ${invoiceId} AND "labId" = ${labId} AND "publicLinkExpiresAt" IS NOT NULL`;
						if (disclosed !== 1) throw ERRORS.OPERATION_NOT_ALLOWED;
					}
					return { invoiceId, token, expiresAt };
				}, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable, maxWait: 5000, timeout: 10000 });
				return shared;
			} catch (error) {
				if (isSerializationAbort(error) && attempt < 2) continue;
				throw error;
			}
		}
		throw ERRORS.OPERATION_NOT_ALLOWED;
	});

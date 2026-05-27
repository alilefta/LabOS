// data/invoices/get-public-invoice.ts
import { generalPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { daError, daSuccess, toDAError, DAResult } from "@/lib/data-access-errors";
import z from "zod";
import { PublicInvoiceDTO } from "@/schema/composed/invoices/invoices.dtos";

const TokenInputSchema = z.uuid("Invalid secure token format.");

export async function getPublicInvoiceByToken(token: string): Promise<DAResult<PublicInvoiceDTO>> {
	try {
		// --- GUARD 1: INPUT SANITIZATION ---
		const parsedToken = TokenInputSchema.safeParse(token);
		if (!parsedToken.success) {
			return daError(ERRORS.INVALID_INPUT.toJSON());
		}

		// Public query: we do not pass a labId to tenantPrisma,
		// allowing the global search across all tenants based solely on the unique secure token
		const prisma = generalPrisma;
		const now = new Date();

		// --- GUARD 2: SECURE DATABASE QUERY ---
		const invoice = await prisma.invoice.findFirst({
			where: {
				publicToken: parsedToken.data,
				// Strict Status Lockout: Block DRAFT and CANCELLED
				status: { in: ["SENT", "PAID", "PARTIAL", "OVERDUE"] },
				// Expiration Check: Must be active [1]
				publicLinkExpiresAt: { gte: now },
			},
			include: {
				lab: {
					select: { title: true, subtitle: true, brandAvatarUrl: true },
				},
				clinic: {
					select: { name: true, city: true, address1: true, phoneNumber: true, email: true },
				},
				cases: {
					include: {
						case: {
							include: {
								patient: { select: { name: true, age: true, gender: true } },
								dentist: { select: { name: true } },
								caseItems: {
									include: {
										product: { select: { name: true } },
										workType: { select: { name: true } },
										_count: { select: { selectedTeeth: true } },
									},
								},
							},
						},
					},
				},
			},
		});

		// --- GUARD 3: OBFUSCATE NOT FOUND ---
		// We return a generic NOT_FOUND even if the token exists but is expired.
		// Never let an attacker know the token is valid but expired [1].
		if (!invoice) {
			return daError(ERRORS.NOT_FOUND.toJSON());
		}

		// --- GUARD 4: THE DTO SANITIZER (Map to secure DTO) ---
		const sanitizedInvoice: PublicInvoiceDTO = {
			invoiceNumber: invoice.invoiceNumber,
			status: invoice.status,
			notes: invoice.notes,
			subtotal: Number(invoice.subtotal),
			discountAmount: Number(invoice.discountAmount),
			total: Number(invoice.total),
			amountPaid: Number(invoice.amountPaid),
			amountDue: Number(invoice.amountDue),
			issuedAt: invoice.issuedAt,
			dueDate: invoice.dueDate,

			lab: {
				title: invoice.lab.title,
				subtitle: invoice.lab.subtitle,
				brandAvatarUrl: invoice.lab.brandAvatarUrl,
			},

			clinic: {
				name: invoice.clinic.name,
				city: invoice.clinic.city,
				address1: invoice.clinic.address1,
				phoneNumber: invoice.clinic.phoneNumber,
				email: invoice.clinic.email,
			},

			// Map and sanitize deep relations, stripping out technician notes, IDs, and assignments
			cases: invoice.cases.map((ic) => {
				const c = ic.case;
				return {
					id: c.id,
					caseNumber: c.caseNumber,
					patientName: c.patient.name,
					patientAge: c.patient.age,
					patientGender: c.patient.gender,
					dentistName: c.dentist?.name ?? null,
					caseTotal: Number(ic.caseTotal), // The historical snapshot price!
					workItems: c.caseItems.map((item) => ({
						productName: item.product?.name ?? "Unknown Product",
						workTypeName: item.workType?.name ?? "General",
						jawType: item.jawType,
						teethCount: item._count.selectedTeeth,
					})),
				};
			}),
		};

		return daSuccess(sanitizedInvoice);
	} catch (e) {
		return toDAError(e);
	}
}

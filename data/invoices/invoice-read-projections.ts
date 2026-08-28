/**
 * Allowlisted Prisma projections for ordinary authenticated Invoice reads.
 *
 * Public statement tokens are bearer capabilities. They intentionally do not
 * appear in either projection: listing or reading an Invoice must never grant
 * the separate ability to disclose its public statement URL.
 */
export const INVOICE_LIST_SELECT = {
	id: true,
	invoiceNumber: true,
	issuedAt: true,
	dueDate: true,
	total: true,
	amountPaid: true,
	amountDue: true,
	status: true,
	clinic: { select: { name: true } },
} as const;

export const INVOICE_DOSSIER_SELECT = {
	id: true,
	invoiceNumber: true,
	status: true,
	notes: true,
	subtotal: true,
	discountAmount: true,
	total: true,
	amountPaid: true,
	amountDue: true,
	appliedDiscountPercentage: true,
	discountReason: true,
	issuedAt: true,
	dueDate: true,
	createdAt: true,
	updatedAt: true,
	lab: {
		select: { title: true, subtitle: true, brandAvatarUrl: true },
	},
	clinic: {
		select: {
			id: true,
			name: true,
			city: true,
			address1: true,
			phoneNumber: true,
			email: true,
			type: true,
		},
	},
	payments: {
		orderBy: { paidAt: "desc" as const },
		select: {
			id: true,
			amount: true,
			method: true,
			reference: true,
			paidAt: true,
		},
	},
	cases: {
		select: {
			caseTotal: true,
			case: {
				select: {
					id: true,
					caseNumber: true,
					isRemake: true,
					patient: { select: { name: true } },
					dentist: { select: { name: true } },
					caseItems: {
						select: {
							jawType: true,
							product: { select: { name: true } },
							workType: { select: { name: true } },
							_count: { select: { selectedTeeth: true } },
						},
					},
				},
			},
		},
	},
} as const;

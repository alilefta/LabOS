import { Prisma } from '@/generated/prisma/browser'

type DisplayAmount = number | string

/** Mirrors the accepted Invoice write order for a non-authoritative preview. */
export function calculateInvoicePreview(
	caseTotals: readonly DisplayAmount[],
	discountPercentage: number,
) {
	const subtotal = caseTotals.reduce(
		(sum, amount) => sum.plus(amount),
		new Prisma.Decimal(0),
	).toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP)
	const safeDiscount = Math.min(Math.max(discountPercentage, 0), 100)
	const discountAmount = subtotal.mul(safeDiscount).div(100)
		.toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP)
	const total = subtotal.minus(discountAmount)

	return {
		subtotal: subtotal.toNumber(),
		discountAmount: discountAmount.toNumber(),
		grandTotal: total.toNumber(),
	}
}

/** Invoice persistence is two-decimal for every supported currency. */
export function formatInvoiceMoney(amount: number, currency: string) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount)
}

export function buildInvoiceWhatsAppUrl(input: {
	clinicName: string
	invoiceNumber: string
	amountDue: number
	currency: string
	publicUrl: string
	clinicPhone?: string
}) {
	const message = encodeURIComponent(
		`Hello Dr. from ${input.clinicName},\n\nThis is an automated statement from our accounts team.\n\nYour statement #${input.invoiceNumber} for ${formatInvoiceMoney(input.amountDue, input.currency)} is ready. You can securely review the cases and download the PDF here:\n\n${input.publicUrl}\n\nThank you for your business!`,
	)
	const cleanPhone = input.clinicPhone ? input.clinicPhone.replace(/\D/g, '') : ''
	return `https://wa.me/${cleanPhone}?text=${message}`
}

import { describe, expect, it } from 'vitest'
import { buildInvoiceWhatsAppUrl, calculateInvoicePreview, formatInvoiceMoney } from '@/lib/invoice-presentation'

describe('Invoice presentation', () => {
	it('matches the committed HALF_UP order for fractional-cent discounts', () => {
		expect(calculateInvoicePreview([0.05], 10)).toEqual({
			subtotal: 0.05,
			discountAmount: 0.01,
			grandTotal: 0.04,
		})
		expect(calculateInvoicePreview(['0.005', '0.01'], 10)).toEqual({
			subtotal: 0.02,
			discountAmount: 0,
			grandTotal: 0.02,
		})
	})

	it('keeps zero and full discounts at the two-decimal Invoice scale', () => {
		expect(calculateInvoicePreview([10, 0.04], 0).grandTotal).toBe(10.04)
		expect(calculateInvoicePreview([10, 0.04], 100).grandTotal).toBe(0)
	})

	it.each(['IQD', 'USD', 'AED', 'SAR', 'EUR'])(
		'preserves two stored decimal places for %s', currency => {
			const tiny = formatInvoiceMoney(0.04, currency)
			const whole = formatInvoiceMoney(10, currency)
			expect(tiny).toContain('0.04')
			expect(whole).toContain('10.00')
			if (currency === 'IQD') expect(tiny).toContain('IQD')
		},
	)

	it('constructs a correctly encoded WhatsApp URL without opening it', () => {
		const url = buildInvoiceWhatsAppUrl({
			clinicName: 'Synthetic Clinic',
			invoiceNumber: 'INV-TEST',
			amountDue: 0.04,
			currency: 'IQD',
			publicUrl: 'http://127.0.0.1:3108/statement/00000000-0000-4000-8000-000000000001',
			clinicPhone: '+964 770 000 0000',
		})
		const parsed = new URL(url)
		expect(parsed.origin).toBe('https://wa.me')
		expect(parsed.pathname).toBe('/9647700000000')
		expect(parsed.searchParams.get('text')).toContain('INV-TEST for IQD\u00a00.04')
		expect(parsed.searchParams.get('text')).toContain('/statement/00000000-0000-4000-8000-000000000001')
	})
})

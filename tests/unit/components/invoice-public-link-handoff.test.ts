import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const read = (...path: string[]) => readFileSync(join(process.cwd(), ...path), 'utf8')

describe('Invoice public-link UI handoff', () => {
	it.each(['new-invoice/new-invoice-client.tsx', 'edit-invoice/edit-invoice-client.tsx'])(
		'%s requests sharing only after a SENT commit and supports share-only retry', file => {
			const source = read('components', 'invoices', ...file.split('/'))
			expect(source).toContain('submittedStatus.current === "SENT"')
			expect(source).toContain('void requestShare(data.invoice.id)')
			expect(source).toContain('onRetryShare={() => void requestShare(successPayload.id)}')
			expect(source).toContain('shareFailed: true')
			expect(source).not.toContain('data.invoice.publicToken')
		},
	)
	it('uses committed amounts and never constructs a statement/null URL', () => {
		const created = read('components', 'invoices', 'new-invoice', 'new-invoice-client.tsx')
		const edited = read('components', 'invoices', 'edit-invoice', 'edit-invoice-client.tsx')
		const modal = read('components', 'modals', 'invoices', 'invoice-generation', 'invoice-success-share-modal.tsx')
		expect(created).toContain('Number(data.invoice.amountDue)')
		expect(edited).toContain('Number(data.invoice.amountDue)')
		expect(created).toContain('currency: data.invoice.currency')
		expect(edited).toContain('currency: data.invoice.currency')
		expect(modal).toContain('formatInvoiceMoney(val, currency)')
		expect(modal).toContain('await navigator.clipboard.writeText(publicUrl)')
		expect(modal.indexOf('toast.success("Secure statement link copied.")')).toBeGreaterThan(modal.indexOf('await navigator.clipboard.writeText(publicUrl)'))
		expect(modal).toContain('&& publicToken ?')
		expect(modal).toContain('Invoice sent; sharing unavailable')
	})
})

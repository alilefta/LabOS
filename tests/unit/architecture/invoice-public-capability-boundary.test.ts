import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import {
	INVOICE_DOSSIER_SELECT,
	INVOICE_LIST_SELECT,
} from '@/data/invoices/invoice-read-projections'

const ORDINARY_INVOICE_READ_FILES = [
	'actions/invoices/get-invoices.ts',
	'actions/invoices/get-invoice-dossier-action.ts',
	'data/invoices/get-invoice-dossier.ts',
	'schema/composed/invoices/invoices.dtos.ts',
	'schema/composed/invoices/invoice-details.dtos.ts',
	'components/invoices/invoices-page/invoices-table/invoice-columns.tsx',
	'components/invoices/invoice-details/invoice-dossier-client.tsx',
] as const

describe('Invoice public capability boundary', () => {
	it('does not select bearer-capability fields in ordinary Invoice reads', () => {
		const projections = JSON.stringify({
			list: INVOICE_LIST_SELECT,
			dossier: INVOICE_DOSSIER_SELECT,
		})

		expect(projections).not.toContain('publicToken')
		expect(projections).not.toContain('publicLinkExpiresAt')
	})

	it('limits patient and payment history to necessary Invoice detail facts', () => {
		expect(
			INVOICE_DOSSIER_SELECT.cases.select.case.select.patient.select,
		).toEqual({ name: true })
		expect(INVOICE_DOSSIER_SELECT.payments.select).toEqual({
			id: true,
			amount: true,
			method: true,
			reference: true,
			paidAt: true,
		})
	})

	it('does not expose bearer-capability fields through ordinary DTOs or UI', () => {
		const violations = ORDINARY_INVOICE_READ_FILES.filter((file) => {
			const source = readFileSync(join(process.cwd(), file), 'utf8')
			return /\bpublicToken\b|\bpublicLinkExpiresAt\b/.test(source)
		})

		expect(violations).toEqual([])
	})

	it('preserves the isolated public statement lookup', () => {
		const source = readFileSync(
			join(process.cwd(), 'data/invoices/get-public-invoice.ts'),
			'utf8',
		)

		expect(source).toContain('publicToken: parsedToken.data')
		expect(source).toContain('publicLinkExpiresAt')
	})
})

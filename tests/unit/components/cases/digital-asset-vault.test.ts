import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/components/shared/file-assets/clinical-asset-lightbox', () => ({
	ClinicalAssetLightbox: ({ assets }: { assets: unknown[] }) =>
		createElement('div', { 'data-legacy-lightbox-count': assets.length }),
}))

import { DigitalAssetVault } from '@/components/cases/case-details/sections/digital-asset-vault'
import type { CaseAssetSummary } from '@/schema/composed/case-asset-file.details'

const date = new Date('2026-09-25T00:00:00.000Z')
const legacy: CaseAssetSummary = {
	id: 'legacy-1',
	dentalCaseId: 'case-1',
	labId: 'lab-1',
	title: 'Legacy photo',
	description: null,
	assetFileType: 'IMAGE',
	createdAt: date,
	updatedAt: date,
	storageMode: 'LEGACY_URL_UNVERIFIED',
	documentUrl: 'https://legacy.example/photo',
	fileExtension: 'png',
}
const managed: CaseAssetSummary = {
	id: 'managed-1',
	title: 'Private scan',
	description: 'Upper arch',
	assetFileType: 'SCANNERFILE',
	storageMode: 'MANAGED_PRIVATE',
}

describe('DigitalAssetVault mixed read contract', () => {
	it('renders every asset but sends only legacy entries to the URL lightbox', () => {
		const html = renderToStaticMarkup(createElement(DigitalAssetVault, { assets: [legacy, managed] }))
		expect(html).toContain('2 FILES')
		expect(html).toContain('data-asset-id="legacy-1"')
		expect(html).toContain('data-asset-id="managed-1"')
		expect(html).toContain('Content unavailable')
		expect(html).toContain('Private scan')
		expect(html).toContain('Upper arch')
		expect(html).toContain('data-legacy-lightbox-count="1"')
		expect(html).not.toContain('No digital assets found')
	})

	it('does not render a broken link or zero-assets state for a managed-only Case', () => {
		const html = renderToStaticMarkup(createElement(DigitalAssetVault, { assets: [managed] }))
		expect(html).toContain('1 FILE')
		expect(html).toContain('Content unavailable')
		expect(html).not.toContain('<a ')
		expect(html).not.toContain('<img ')
		expect(html).not.toContain('No digital assets found')
		expect(html).toContain('data-legacy-lightbox-count="0"')
	})
})

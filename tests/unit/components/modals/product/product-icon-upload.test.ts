import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = (...segments: string[]) => readFileSync(join(process.cwd(), ...segments), 'utf8')
const uploader = source('components', 'modals', 'product', 'product-icon-upload.tsx')
const createSheet = source('components', 'modals', 'product', 'create-product-sheet.tsx')
const editor = source('components', 'modals', 'catalog', 'products', 'product-editor-sheet.tsx')
const createAction = source('actions', 'product.ts')
const updateAction = source('actions', 'catalog', 'products', 'update-product.ts')

describe('ProductIconUpload opaque-grant handoff', () => {
	it('uses only the dedicated Product route and opaque grant handoff', () => {
		expect(uploader).toContain("useUploadThing('productIconAvatar'")
		expect(uploader).toContain("setValue('imageUploadGrantId', uploadGrantId")
		expect(uploader).not.toContain("setValue('imageUrl'")
		expect(uploader).toContain('Removing a persisted image is unavailable')
	})

	it('stages both Product create surfaces and authoritative edit updates', () => {
		expect(createSheet).toContain("<ProductIconUpload stage={{ mode: 'create' }} />")
		expect(editor).toContain("<ProductIconUpload stage={{ mode: 'create' }} />")
		expect(editor).toContain("stage={{ mode: 'update', productId: productIdToEdit }}")
	})

	it('hands opaque grants to Product commands rather than raw URL authority', () => {
		expect(createAction).toContain('executeCatalogProductCreate')
		expect(createAction).toContain('imageUploadGrantId')
		expect(updateAction).toContain('executeCatalogProductUpdate')
		expect(updateAction).toContain('imageUploadGrantId')
	})
})

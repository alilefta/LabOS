import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = process.cwd()
const uploaderSource = readFileSync(
	join(root, 'components/modals/case-category/category-icon-upload.tsx'),
	'utf8',
)
const createSheetSource = readFileSync(
	join(root, 'components/modals/case-category/create-case-category-sheet.tsx'),
	'utf8',
)
const editorSource = readFileSync(
	join(root, 'components/modals/catalog/categories/category-editor-sheet.tsx'),
	'utf8',
)
const activeCreateActionSource = readFileSync(
	join(root, 'actions/case-category.ts'),
	'utf8',
)
const activeUpdateActionSource = readFileSync(
	join(root, 'actions/catalog/categories/update-category.ts'),
	'utf8',
)
const legacyCreateActionSource = readFileSync(
	join(root, 'actions/catalog/categories/create-category.ts'),
	'utf8',
)

describe('CategoryIconUpload opaque-grant handoff', () => {
	it('passes the explicit create/update stage as the required UploadThing input', () => {
		expect(uploaderSource).toContain('export type CategoryIconUploadStage =')
		expect(uploaderSource).toContain('await startUpload([file], stage)')
		expect(uploaderSource).not.toContain("server-only")
	})

	it('captures only serverData.uploadGrantId and never persists the provider URL', () => {
		expect(uploaderSource).toContain(
			'const uploadGrantId = res[0].serverData?.uploadGrantId',
		)
		expect(uploaderSource).toContain('setValue("imageUploadGrantId", uploadGrantId')
		expect(uploaderSource).toContain('const visualPreviewUrl = res[0].ufsUrl || res[0].url')
		expect(uploaderSource).not.toContain('setValue("imageUrl", url')
	})

	it('keeps persisted-image removal unavailable and clears only local staged state', () => {
		expect(uploaderSource).toContain('disabled={!hasLocalStagedPreview}')
		expect(uploaderSource).toContain(
			'"Removing a persisted image is unavailable"',
		)
		expect(uploaderSource).toContain('if (!hasLocalStagedPreview) return')
		expect(uploaderSource).toContain('setValue("imageUploadGrantId", undefined')
		expect(uploaderSource).not.toContain('setValue("imageUrl", ""')
	})

	it('passes create mode from both Category create call sites', () => {
		expect(createSheetSource).toContain(
			"<CategoryIconUpload stage={{ mode: 'create' }} />",
		)
		expect(editorSource).toContain(
			"<CategoryIconUpload stage={{ mode: 'create' }} />",
		)
	})

	it('passes categoryIdToEdit only for the editor update stage', () => {
		expect(editorSource).toContain('categoryIdToEdit ? (')
		expect(editorSource).toContain(
			"stage={{ mode: 'update', categoryId: categoryIdToEdit }}",
		)
	})

	it('submits the opaque grant through the active create and update actions', () => {
		expect(createSheetSource).toContain('await createCategory(data)')
		expect(createSheetSource).toContain('imageUploadGrantId: undefined')
		expect(editorSource).toContain('await updateCategory({')
		expect(editorSource).toContain('categoryId: categoryIdToEdit')
		expect(editorSource).toContain('imageUploadGrantId: undefined')
		expect(activeCreateActionSource).toContain('executeCatalogCategoryCreate')
		expect(activeCreateActionSource).toContain('imageUploadGrantId')
		expect(activeUpdateActionSource).toContain('executeCatalogCategoryUpdate')
		expect(activeUpdateActionSource).toContain('imageUploadGrantId')
		expect(legacyCreateActionSource).not.toContain('executeCatalogCategoryCreate')
	})
})

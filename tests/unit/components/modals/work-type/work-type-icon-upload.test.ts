import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = (...segments: string[]) => readFileSync(join(process.cwd(), ...segments), 'utf8')
const uploader = source('components', 'modals', 'work-type', 'work-type-icon-upload.tsx')
const createSheet = source('components', 'modals', 'work-type', 'create-work-type-sheet.tsx')
const editor = source('components', 'modals', 'catalog', 'work-types', 'work-type-editor-sheet.tsx')
const createAction = source('actions', 'work-type.ts')
const updateAction = source('actions', 'catalog', 'worktypes', 'update-worktype.ts')

describe('WorkTypeIconUpload opaque-grant handoff', () => {
	it('uses only the dedicated WorkType route and opaque grant handoff', () => {
		expect(uploader).toContain("useUploadThing('workTypeIconAvatar'")
		expect(uploader).toContain("setValue('imageUploadGrantId', uploadGrantId")
		expect(uploader).not.toContain("setValue('imageUrl'")
		expect(uploader).toContain('Removing a persisted image is unavailable')
	})

	it('stages create from both create surfaces and authoritative update from edit', () => {
		expect(createSheet).toContain("<WorkTypeIconUpload stage={{ mode: 'create' }} />")
		expect(editor).toContain("<WorkTypeIconUpload stage={{ mode: 'create' }} />")
		expect(editor).toContain("stage={{ mode: 'update', workTypeId: workTypeIdToEdit }}")
	})

	it('hands the opaque grant to the active commands rather than raw image URL authority', () => {
		expect(createAction).toContain('executeCatalogWorkTypeCreate')
		expect(createAction).toContain('imageUploadGrantId')
		expect(updateAction).toContain('executeCatalogWorkTypeUpdate')
		expect(updateAction).toContain('imageUploadGrantId')
	})
})

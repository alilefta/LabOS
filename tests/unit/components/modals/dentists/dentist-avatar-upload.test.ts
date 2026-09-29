import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = (...segments: string[]) => readFileSync(join(process.cwd(), ...segments), 'utf8')
const uploader = source('components', 'modals', 'dentists', 'dentist-avatar-upload.tsx')
const editor = source('components', 'modals', 'dentists', 'dentist-editor-sheet.tsx')
const createAction = source('actions', 'dentists', 'create-dentist.ts')
const updateAction = source('actions', 'dentists', 'update-dentist.ts')

describe('DentistAvatarUpload opaque-grant handoff', () => {
	it('uses only the dedicated Dentist route and opaque grant handoff', () => {
		expect(uploader).toContain("useUploadThing('dentistAvatar'")
		expect(uploader).toContain("setValue('imageUploadGrantId', uploadGrantId")
		expect(uploader).not.toContain("setValue('avatarUrl'")
		expect(uploader).toContain('Removing a persisted avatar is unavailable')
	})

	it('stages create and authoritative edit updates from the roster editor', () => {
		expect(editor).toContain('<DentistAvatarUpload')
		expect(editor).toContain('mode: "update", dentistId: dentistIdToEdit')
	})

	it('hands opaque grants to Dentist commands rather than raw URL authority', () => {
		expect(createAction).toContain('executeDentistAvatarCreate')
		expect(createAction).toContain('imageUploadGrantId')
		expect(updateAction).toContain('executeDentistAvatarUpdate')
		expect(updateAction).toContain('imageUploadGrantId')
		expect(createAction).not.toContain('avatarUrl: avatarUrl')
		expect(updateAction).not.toContain('avatarUrl: avatarUrl')
	})
})

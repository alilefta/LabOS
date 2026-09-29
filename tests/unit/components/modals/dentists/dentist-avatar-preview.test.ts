import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

const avatarUrl = '/verified-avatar.webp'
const dropzoneConfig = vi.hoisted(() => ({ accept: [] as string[] }))

vi.mock('react-hook-form', () => ({
	useFormContext: () => ({
		setValue: vi.fn(),
		watch: (field: string) => field === 'avatarUrl' ? avatarUrl : undefined,
		formState: { errors: {} },
	}),
}))

vi.mock('react-dropzone', () => ({
	useDropzone: ({ accept }: { accept: Record<string, unknown> }) => {
		dropzoneConfig.accept = Object.keys(accept).sort()
		return {
			getRootProps: () => ({}),
			getInputProps: () => ({ type: 'file', accept: Object.keys(accept).join(',') }),
			isDragActive: false,
		}
	},
}))

vi.mock('@/utils/uploadThing', () => ({
	useUploadThing: () => ({ isUploading: false, startUpload: vi.fn() }),
}))

vi.mock('@/components/ui/button', () => ({
	Button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) =>
		createElement('button', props, children),
}))

import { DentistAvatarUpload } from '@/components/modals/dentists/dentist-avatar-upload'

describe('DentistAvatarUpload persisted preview', () => {
	it('renders the stored raster avatar without creating a grant or offering removal', () => {
		const html = renderToStaticMarkup(
			createElement(DentistAvatarUpload, { stage: { mode: 'update', dentistId: 'dentist_1' } }),
		)

		expect(dropzoneConfig.accept).toEqual(['image/jpeg', 'image/png', 'image/webp'])
		expect(html).toContain('src="/_next/image?url=%2Fverified-avatar.webp')
		expect(html).toContain('alt="Practitioner avatar"')
		expect(html).toContain('title="Removing a persisted avatar is unavailable"')
		expect(html).toContain('disabled=""')
		expect(html).toContain('PNG, JPEG, or WebP (Max 4MB)')
		expect(html).not.toContain('image/svg+xml')
	})
})

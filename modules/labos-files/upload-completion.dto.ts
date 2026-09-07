/**
 * UploadThing already supplies the uploaded file's client-safe name, key, and
 * URL. LabOS does not need to add server identity or tenant metadata to the
 * browser-visible completion payload.
 */
export type UploadCompletionDTO = Readonly<Record<string, never>>

export function createUploadCompletionDTO(): UploadCompletionDTO {
	return Object.freeze({})
}

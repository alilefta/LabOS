/** Server-side Files boundary. Keys are allocated and permanently reserved by Files. */
export type ObjectStorageFailure = Readonly<{
	code: 'INVALID_REQUEST' | 'UNAVAILABLE' | 'FORBIDDEN' | 'CANCELLED' | 'TOO_LARGE' | 'INTEGRITY'
}>

export type StorageResult<T> =
	| Readonly<{ ok: true; value: T }>
	| Readonly<{ ok: false; error: ObjectStorageFailure }>

/** Bearer material: deliver only through an authorized route; never persist or log. */
export type ObjectCapability = Readonly<{
	url: string
	method: 'PUT' | 'GET'
	headers: Readonly<Record<string, string>>
	expiresAt: Date
}>

export type ObjectInspection = Readonly<{ presence: 'PRESENT'; bytes: number }> |
	Readonly<{ presence: 'ABSENT' }>

export interface ObjectStorage {
	issueCreateOnlyWrite(input: Readonly<{ key: string; lifetimeSeconds: number }>): Promise<StorageResult<ObjectCapability>>
	inspect(key: string, signal?: AbortSignal): Promise<StorageResult<ObjectInspection>>
	/** Reads through a bounded provider stream; never returns partial bytes. */
	retrieve(input: Readonly<{ key: string; maxBytes: number; signal?: AbortSignal }>): Promise<StorageResult<Uint8Array>>
	issuePrivateRead(input: Readonly<{ key: string; lifetimeSeconds: number }>): Promise<StorageResult<ObjectCapability>>
	deleteExact(key: string, signal?: AbortSignal): Promise<StorageResult<void>>
	/** ABSENT is authoritative only after a successful direct private inspection. */
	classifyPresence(key: string, signal?: AbortSignal): Promise<StorageResult<'PRESENT' | 'ABSENT'>>
}

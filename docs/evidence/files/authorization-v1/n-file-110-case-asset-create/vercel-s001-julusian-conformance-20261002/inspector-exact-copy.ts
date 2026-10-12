/** R001 structural layer over the unchanged original encoded byte sequence. */
export const R001_LIMITS = Object.freeze({
	encodedBytes: 33_554_432,
	width: 9_000,
	height: 9_000,
	pixels: 50_000_000,
	metadataBytes: 262_144,
	segments: 512,
	progressiveScans: 128,
})

export type JpegStructure = Readonly<{
	width: number
	height: number
	components: 1 | 3
	progressive: boolean
	segments: number
	scans: number
	metadataBytes: number
}>

export class R001Unavailable extends Error {
	constructor() { super('Clinical JPEG unavailable') }
}

function reject(): never { throw new R001Unavailable() }

const frameMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf])

export function inspectR001(bytes: Uint8Array, signal?: AbortSignal): JpegStructure {
	if (!(bytes instanceof Uint8Array) || bytes.length < 4 ||
		bytes.length > R001_LIMITS.encodedBytes || bytes[0] !== 0xff || bytes[1] !== 0xd8) reject()
	let position = 2
	let entropy = false
	let sawFrame = false
	let progressive = false
	let width = 0
	let height = 0
	let components: 1 | 3 = 1
	let segments = 0
	let scans = 0
	let metadataBytes = 0
	let restart: number | null = null
	while (position < bytes.length) {
		if (signal?.aborted) reject()
		if (entropy) {
			while (position < bytes.length && bytes[position] !== 0xff) {
				if ((position & 0xffff) === 0 && signal?.aborted) reject()
				position++
			}
			if (position === bytes.length) reject()
			const markerStart = position
			while (position < bytes.length && bytes[position] === 0xff) position++
			if (position === bytes.length) reject()
			const marker = bytes[position++]
			if (marker === 0x00) continue
			if (marker >= 0xd0 && marker <= 0xd7) {
				if (restart === null || marker !== 0xd0 + restart) reject()
				restart = (restart + 1) & 7
				continue
			}
			entropy = false
			position = markerStart
		}
		if (bytes[position++] !== 0xff) reject()
		while (position < bytes.length && bytes[position] === 0xff) position++
		if (position === bytes.length) reject()
		const marker = bytes[position++]
		if (marker === 0xd9) {
			if (!sawFrame || scans === 0 || position !== bytes.length) reject()
			return Object.freeze({ width, height, components, progressive, segments, scans, metadataBytes })
		}
		if (marker === 0x00 || marker === 0xd8 || marker === 0x01 ||
			(marker >= 0xd0 && marker <= 0xd7)) reject()
		if (position + 2 > bytes.length) reject()
		const length = (bytes[position] << 8) | bytes[position + 1]
		if (length < 2 || position + length > bytes.length) reject()
		const start = position + 2
		const payload = length - 2
		position += length
		if (++segments > R001_LIMITS.segments) reject()
		if ((marker >= 0xe0 && marker <= 0xef) || marker === 0xfe) {
			metadataBytes += payload
			if (metadataBytes > R001_LIMITS.metadataBytes) reject()
		}
		if (frameMarkers.has(marker)) {
			if (sawFrame || scans || (marker !== 0xc0 && marker !== 0xc2) ||
				payload < 6 || bytes[start] !== 8) reject()
			height = (bytes[start + 1] << 8) | bytes[start + 2]
			width = (bytes[start + 3] << 8) | bytes[start + 4]
			const count = bytes[start + 5]
			if (count !== 1 && count !== 3) reject()
			components = count
			if (payload !== 6 + components * 3 || !width || !height ||
				width > R001_LIMITS.width || height > R001_LIMITS.height ||
				width * height > R001_LIMITS.pixels) reject()
			progressive = marker === 0xc2
			sawFrame = true
		} else if (marker === 0xda) {
			if (!sawFrame || payload < 4) reject()
			const scanComponents = bytes[start]
			if (scanComponents < 1 || scanComponents > components ||
				payload !== 1 + scanComponents * 2 + 3) reject()
			if (++scans > R001_LIMITS.segments ||
				(progressive && scans > R001_LIMITS.progressiveScans)) reject()
			restart = restart === null ? null : 0
			entropy = true
		} else if (marker === 0xdd) {
			if (payload !== 2) reject()
			const interval = (bytes[start] << 8) | bytes[start + 1]
			restart = interval ? 0 : null
		} else if (marker !== 0xc4 && marker !== 0xdb && marker !== 0xfe &&
			!(marker >= 0xe0 && marker <= 0xef)) reject()
	}
	reject()
}

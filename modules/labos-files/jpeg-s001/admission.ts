import 'server-only'

import { S001Unavailable } from './identity'

// Symbol.for keeps one slot even if Next bundles this module into two server
// chunks inside the same Node process.
const slotKey = Symbol.for('labos.files.jpeg-s001.active')
const slots = globalThis as unknown as { [key: symbol]: { occupied: boolean } | undefined }
const slot = slots[slotKey] ??= { occupied: false }

/** Process-local, zero-waiter admission. Never stores image or provider state. */
export function acquireS001Admission(): () => void {
	if (slot.occupied) throw new S001Unavailable()
	slot.occupied = true
	let released = false
	return () => {
		if (released) return
		released = true
		slot.occupied = false
	}
}

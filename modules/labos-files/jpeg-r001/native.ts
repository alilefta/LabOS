import 'server-only'

import { createHash } from 'node:crypto'
import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process'
import { readFile, realpath, stat } from 'node:fs/promises'
import { resolve } from 'node:path'

import { R001Unavailable, type JpegStructure, R001_LIMITS } from './inspect'

const EXPECTED_SOURCE = '00bbb812bf8ad9099e8021b3b224b8cfb9db6e25ff726def8fa14d48a27c17b3'
const EXPECTED_BINARY = '24cdebf1552770d1e6edf7307d47f6124184e918839a928bc4b1ebfbd77a05d5'
const WALL_MS = 10_000
const QUEUE_MS = 5_000
const ACTIVE_MAX = 2
const QUEUE_MAX = 2
const STDOUT_MAX = 95
const STDERR_MAX = 95

type Waiter = { id: string; resolve: (release: () => void) => void; reject: () => void; timer: NodeJS.Timeout; signal?: AbortSignal; abort?: () => void }
const waiting: Waiter[] = []
let active = 0
const children = new Set<ChildProcessWithoutNullStreams>()
let shutdownHookInstalled = false

function fail(): never { throw new R001Unavailable() }
function sha256(bytes: Uint8Array): string { return createHash('sha256').update(bytes).digest('hex') }

function assignNext() {
	const next = waiting.shift()
	if (!next) { active--; return }
	clearTimeout(next.timer)
	if (next.signal && next.abort) next.signal.removeEventListener('abort', next.abort)
	next.resolve(makeRelease())
}
function makeRelease(): () => void {
	let released = false
	return () => { if (!released) { released = true; assignNext() } }
}

/** Queue contains only opaque request identifiers and resolver functions. */
export function acquireNativeSlot(id: string, signal?: AbortSignal): Promise<() => void> {
	if (!id || signal?.aborted) return Promise.reject(new R001Unavailable())
	if (active < ACTIVE_MAX) { active++; return Promise.resolve(makeRelease()) }
	if (waiting.length >= QUEUE_MAX) return Promise.reject(new R001Unavailable())
	return new Promise((resolveSlot, rejectSlot) => {
		const waiter: Waiter = {
			id,
			resolve: resolveSlot,
			reject: () => rejectSlot(new R001Unavailable()),
			timer: setTimeout(() => expire(), QUEUE_MS), signal,
		}
		const expire = () => {
			const index = waiting.indexOf(waiter)
			if (index < 0) return
			waiting.splice(index, 1)
			if (signal && waiter.abort) signal.removeEventListener('abort', waiter.abort)
			clearTimeout(waiter.timer)
			waiter.reject()
		}
		waiter.abort = expire
		signal?.addEventListener('abort', expire, { once: true })
		waiting.push(waiter)
	})
}

export async function verifyR001HelperIdentity(applicationRoot = process.cwd()): Promise<string> {
	try {
		if (process.platform !== 'win32' || process.arch !== 'x64') fail()
		const root = resolve(applicationRoot)
		const file = resolve(root, 'native/bin/win32-x64/r001-codec.exe')
		const manifestFile = resolve(root, 'native/bin/win32-x64/r001-codec.manifest.json')
		if ((await realpath(file)).toLowerCase() !== file.toLowerCase() || !(await stat(file)).isFile()) fail()
		const manifest = JSON.parse(await readFile(manifestFile, 'utf8')) as Record<string, unknown>
		if (manifest.protocol !== 'LJ01' || manifest.platform !== 'win32' ||
			manifest.architecture !== 'x64' || manifest.libjpegTurboVersion !== '3.2.0' ||
			manifest.sourceSha256 !== EXPECTED_SOURCE ||
			manifest.executableSha256 !== EXPECTED_BINARY ||
			manifest.installerSha256 !== '662761d8ba8dae04aec74023ebaeceb856c2b56b9b59cfd180759d26300dda42' ||
			manifest.headerSha256 !== 'ea0fbba47e9e5da192a487df4df3cf01a338b86a0a85d154ef329dd7b5439043' ||
			manifest.staticLibrarySha256 !== 'b9640752d84cfbac3efcce70096c3a586ab6ad95b1163541ba9a11446a3337cc') fail()
		if (sha256(await readFile(file)) !== EXPECTED_BINARY) fail()
		return file
	} catch { fail() }
}

// Starts availability/identity verification when this server-only module loads.
// Each invocation rechecks the on-disk identity immediately before spawn.
const startupIdentity = verifyR001HelperIdentity().then(() => true, () => false)

function registerShutdownHook() {
	if (shutdownHookInstalled) return
	shutdownHookInstalled = true
	process.once('exit', () => { for (const child of children) child.kill() })
}

export async function decodeR001WithNative(bytes: Buffer, structure: JpegStructure, signal?: AbortSignal): Promise<void> {
	if (signal?.aborted || bytes.length === 0 || bytes.length > R001_LIMITS.encodedBytes) fail()
	let executable: string
	try {
		if (!(await startupIdentity)) fail()
		executable = await verifyR001HelperIdentity()
	} catch { fail() }
	const header = Buffer.alloc(8)
	header.write('LJ01', 0, 'ascii')
	header.writeUInt32LE(bytes.length, 4)
	const frame = Buffer.concat([header, bytes])
	let child: ChildProcessWithoutNullStreams
	const spawnedAt = performance.now()
	try { child = spawn(executable, [String(process.pid)], { stdio: ['pipe', 'pipe', 'pipe'], windowsHide: true, shell: false, env: { NODE_ENV: process.env.NODE_ENV } }) } catch { fail() }
	registerShutdownHook()
	children.add(child)
	let stdout = Buffer.alloc(0)
	let stderrBytes = 0
	let invalid = false
	const terminate = () => { invalid = true; child.kill() }
	const timer = setTimeout(terminate, Math.max(0, WALL_MS - (performance.now() - spawnedAt)))
	signal?.addEventListener('abort', terminate, { once: true })
	try {
		child.stdout.on('data', (chunk: Buffer) => {
			if (stdout.length + chunk.length >= 96) return terminate()
			stdout = Buffer.concat([stdout, chunk])
		})
		child.stderr.on('data', (chunk: Buffer) => {
			stderrBytes += chunk.length
			if (stderrBytes > STDERR_MAX) terminate()
		})
		child.stdin.on('error', terminate)
		const closed = new Promise<{ code: number | null; signal: NodeJS.Signals | null }>((done) => {
			child.once('error', () => { invalid = true; done({ code: null, signal: null }) })
			child.once('close', (code, closeSignal) => done({ code, signal: closeSignal }))
		})
		child.stdin.end(frame)
		const outcome = await closed
		const line = stdout.toString('ascii')
		const match = /^LJ01 OK ([1-9]\d*) ([1-9]\d*) ([13]) ([1-9]\d*)\n$/.exec(line)
		if (invalid || outcome.code !== 0 || outcome.signal || stderrBytes !== 0 ||
			stdout.length > STDOUT_MAX || !match ||
			Number(match[1]) !== structure.width || Number(match[2]) !== structure.height ||
			Number(match[3]) !== structure.components || Number(match[4]) !== structure.height) fail()
	} finally {
		clearTimeout(timer)
		signal?.removeEventListener('abort', terminate)
		children.delete(child)
		frame.fill(0)
	}
}

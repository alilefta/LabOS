'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

type Stage = 'selected' | 'intent' | 'uploading' | 'validating' | 'attaching' | 'done' | 'error' | 'cancelled'
const MAX_BYTES = 33_554_432
const suffix = /\.(jpe?g|png|webp)$/i

export function CaseImageUpload({ caseId }: { caseId: string }) {
	const router = useRouter()
	const [file, setFile] = useState<File | null>(null)
	const [stage, setStage] = useState<Stage>('selected')
	const [message, setMessage] = useState('Choose a JPG, PNG or WebP clinical photograph (up to 32 MiB).')
	const controller = useRef<AbortController | null>(null)
	const busy = ['intent', 'uploading', 'validating', 'attaching'].includes(stage)
	const endpoint = `/api/cases/${encodeURIComponent(caseId)}/clinical-upload`

	function select(candidate: File | undefined) {
		if (!candidate) return
		if (!suffix.test(candidate.name)) {
			setFile(null); setStage('error'); setMessage('Choose a .jpg, .jpeg, .png or .webp file.'); return
		}
		if (candidate.size < 1 || candidate.size > MAX_BYTES) {
			setFile(null); setStage('error'); setMessage('The photograph must be between 1 byte and 32 MiB.'); return
		}
		setFile(candidate); setStage('selected'); setMessage(`${candidate.name} selected.`)
	}

	async function run() {
		if (!file || busy) return
		const abort = new AbortController()
		controller.current = abort
		try {
			setStage('intent'); setMessage('Preparing a private upload…')
			const intent = await fetch(`${endpoint}/intent`, { method: 'POST',
				headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename: file.name }),
				cache: 'no-store', signal: abort.signal })
			if (!intent.ok) throw new Error('Upload preparation failed. Please retry.')
			const grant: { uploadGrantId: string; upload: {
				url: string; method: string; headers: Record<string, string>; expiresAt: string } } = await intent.json()
			if (grant.upload.method !== 'PUT' || grant.upload.headers['If-None-Match'] !== '*' ||
				Date.parse(grant.upload.expiresAt) <= Date.now()) throw new Error('The upload grant expired. Please retry.')
			setStage('uploading'); setMessage('Uploading original photograph…')
			const uploaded = await fetch(grant.upload.url, { method: 'PUT', headers: grant.upload.headers,
				body: file, signal: abort.signal, referrerPolicy: 'no-referrer' })
			if (!uploaded.ok) throw new Error(uploaded.status === 412 ? 'This upload grant is no longer available. Please retry.' :
				'Upload failed. Please retry.')
			if (Date.parse(grant.upload.expiresAt) <= Date.now()) throw new Error('The upload grant expired. Please retry.')
			setStage('validating'); setMessage('Verifying the original photograph…')
			const completed = await fetch(`${endpoint}/complete`, { method: 'POST',
				headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ uploadGrantId: grant.uploadGrantId }),
				cache: 'no-store', signal: abort.signal })
			if (!completed.ok) throw new Error('Photograph validation failed. Check the file and retry.')
			setStage('attaching'); setMessage('Attaching to this Case…')
			const attached = await fetch(`${endpoint}/attach`, { method: 'POST',
				headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ uploadGrantId: grant.uploadGrantId }),
				cache: 'no-store', signal: abort.signal })
			if (!attached.ok) throw new Error('Attachment failed. Please retry.')
			setStage('done'); setMessage('Clinical photograph attached successfully.')
			setFile(null)
			router.refresh()
		} catch (error) {
			if (abort.signal.aborted) { setStage('cancelled'); setMessage('Upload cancelled. Select or retry a file.') }
			else { setStage('error'); setMessage(error instanceof Error ? error.message : 'Upload failed. Please retry.') }
		} finally { controller.current = null }
	}

	return <div className="lab-card p-4 space-y-3">
		<div className="flex flex-wrap items-center gap-3">
			<label className="text-sm font-semibold text-foreground">Add clinical photograph
				<input type="file" accept=".jpg,.jpeg,.png,.webp" disabled={busy}
					onChange={(event) => select(event.target.files?.[0])} className="block mt-2 text-xs text-muted-foreground" />
			</label>
			{file && !busy && <button type="button" onClick={run}
				className="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
				{stage === 'error' || stage === 'cancelled' ? 'Retry upload' : 'Upload photograph'}
			</button>}
			{busy && <button type="button" onClick={() => controller.current?.abort()}
				className="rounded-md border border-border px-3 py-2 text-xs font-semibold">Cancel</button>}
		</div>
		<p role="status" aria-live="polite" className="text-xs text-muted-foreground">{message}</p>
	</div>
}

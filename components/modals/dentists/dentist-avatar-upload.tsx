'use client'

import { useCallback, useState } from 'react'
import type { FileRejection } from 'react-dropzone'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import { ImagePlus, Loader2, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useUploadThing } from '@/utils/uploadThing'

export type DentistAvatarUploadStage =
	| { mode: 'create' }
	| { mode: 'update'; dentistId: string }

type DentistAvatarFormValues = {
	avatarUrl?: string | null
	imageUploadGrantId?: string
}

/** Existing avatar URLs are display-only; only a staged grant can replace one. */
export function DentistAvatarUpload({ stage }: { stage: DentistAvatarUploadStage }) {
	const { setValue, watch, formState } = useFormContext<DentistAvatarFormValues>()
	const avatarUrl = watch('avatarUrl')
	const imageUploadGrantId = watch('imageUploadGrantId')
	const [localPreview, setLocalPreview] = useState<string | null>(null)
	const [localStagedGrantId, setLocalStagedGrantId] = useState<string | null | undefined>(undefined)
	const hasLocalStagedPreview = localStagedGrantId === null || (localStagedGrantId !== undefined && localStagedGrantId === imageUploadGrantId)
	const preview = hasLocalStagedPreview ? localPreview : avatarUrl || null

	const { isUploading, startUpload } = useUploadThing('dentistAvatar', {
		onClientUploadComplete: (result) => {
			const uploadGrantId = result?.[0]?.serverData?.uploadGrantId
			if (!uploadGrantId) {
				setLocalStagedGrantId(undefined)
				setLocalPreview(null)
				toast.error('Upload failed', { description: 'The upload authorization handoff was missing.' })
				return
			}
			setValue('imageUploadGrantId', uploadGrantId, { shouldDirty: true, shouldValidate: true })
			setLocalPreview(result[0].ufsUrl || result[0].url)
			setLocalStagedGrantId(uploadGrantId)
			toast.success('Practitioner avatar uploaded successfully')
		},
		onUploadError: (error) => {
			setLocalStagedGrantId(undefined)
			setLocalPreview(null)
			setValue('imageUploadGrantId', undefined, { shouldDirty: true, shouldValidate: true })
			toast.error('Upload failed', { description: error.message })
		},
	})

	const onDrop = useCallback(async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
		if (acceptedFiles.length) {
			setLocalPreview(URL.createObjectURL(acceptedFiles[0]))
			setLocalStagedGrantId(null)
			await startUpload([acceptedFiles[0]], stage)
		}
		if (fileRejections.length) toast.error('Upload rejected', { description: fileRejections[0].errors[0].message })
	}, [stage, startUpload])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/png': [], 'image/jpeg': [], 'image/webp': [] }, maxFiles: 1, maxSize: 4 * 1024 * 1024 })
	const clearStaged = (event: React.MouseEvent) => {
		event.stopPropagation()
		if (!hasLocalStagedPreview) return
		setLocalStagedGrantId(undefined)
		setLocalPreview(null)
		setValue('imageUploadGrantId', undefined, { shouldDirty: true, shouldValidate: true })
	}

	return <div className="flex flex-col items-center gap-4 w-full mb-6">
		<div {...getRootProps()} className={cn('group relative flex flex-col items-center justify-center w-28 h-28 rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden', isDragActive ? 'border-primary bg-primary/5' : 'border-border bg-slate-50 dark:bg-white/2', preview && 'border-solid', formState.errors.avatarUrl && 'border-destructive')}>
			<input {...getInputProps()} />
			{preview ? <><Image src={preview} alt="Practitioner avatar" fill className="object-cover p-1 rounded-2xl" />
				<div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center"><Button type="button" size="icon" variant="destructive" onClick={clearStaged} disabled={!hasLocalStagedPreview} title={hasLocalStagedPreview ? 'Clear staged avatar' : 'Removing a persisted avatar is unavailable'}><Trash2 size={16} /></Button></div></> :
				<div className="flex flex-col items-center gap-2 text-muted-foreground"><ImagePlus size={20} /><span className="text-[10px] font-bold uppercase">Upload Avatar</span></div>}
			{isUploading && <div className="absolute inset-0 bg-background/80 flex items-center justify-center"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>}
		</div>
		<div className="text-center"><p className="text-[13px] text-foreground font-semibold">Practitioner avatar</p><p className="text-[11px] text-muted-foreground mt-0.5">PNG, JPEG, or WebP (Max 4MB)</p></div>
	</div>
}

'use client'

import { useState } from 'react'
import { Box, Eye, FileCode2, FileLock2, ImageIcon, Layers, Video } from 'lucide-react'
import { ClinicalAssetLightbox } from '@/components/shared/file-assets/clinical-asset-lightbox'
import { cn } from '@/lib/utils'
import type { CaseAssetSummary } from '@/schema/composed/case-asset-file.details'

interface Props {
	assets: CaseAssetSummary[]
}

export function DigitalAssetVault({ assets }: Props) {
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
	const legacyAssets = assets.filter(
		(asset): asset is Extract<CaseAssetSummary, { storageMode: 'LEGACY_URL_UNVERIFIED' }> =>
			asset.storageMode === 'LEGACY_URL_UNVERIFIED',
	)

	if (assets.length === 0) {
		return (
			<div className="lab-card p-12 flex flex-col items-center justify-center text-center border-dashed">
				<Layers className="w-8 h-8 text-slate-400 mb-4" />
				<h3 className="text-lg font-bold text-foreground">No digital assets found</h3>
				<p className="text-sm text-muted-foreground mt-1">This case does not have any attached 3D scans or clinical photos.</p>
			</div>
		)
	}

	return (
		<section className="space-y-6">
			<div className="flex items-center gap-3">
				<div className="w-1.5 h-6 bg-ai rounded-full" />
				<h2 className="text-xl font-bold text-foreground">Digital Asset Vault</h2>
				<span className="text-xs font-mono font-bold text-muted-foreground">{assets.length} {assets.length === 1 ? 'FILE' : 'FILES'}</span>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
				{assets.map((asset) => {
					const is3D = asset.assetFileType === 'SCANNERFILE'
					const isVideo = asset.assetFileType === 'VIDEO'
					const icon = is3D ? <FileCode2 className="w-4 h-4" /> : isVideo ? <Video className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />
					if (asset.storageMode === 'MANAGED_PRIVATE') {
						return (
							<div key={asset.id} data-asset-id={asset.id} className="min-w-0 rounded-md border border-border bg-card overflow-hidden">
								<div className="aspect-square flex flex-col items-center justify-center gap-3 bg-muted/40 p-4 text-center">
									<FileLock2 className="w-9 h-9 text-muted-foreground" aria-hidden="true" />
									<span className="text-xs font-semibold text-muted-foreground">Content unavailable</span>
								</div>
								<div className="p-3 border-t border-border space-y-1">
									<p className="text-sm font-semibold text-foreground break-words">{asset.title || 'Untitled Asset'}</p>
									<p className="text-xs text-muted-foreground flex items-center gap-1">{icon}<span>{asset.assetFileType}</span></p>
									{asset.description && <p className="text-xs text-muted-foreground break-words">{asset.description}</p>}
								</div>
							</div>
						)
					}

					return (
						<button
							key={asset.id}
							type="button"
							data-asset-id={asset.id}
							aria-label={`Preview ${asset.title || 'Untitled Asset'}`}
							onClick={() => setLightboxIndex(legacyAssets.findIndex((item) => item.id === asset.id))}
							className="group min-w-0 rounded-md border border-border bg-card overflow-hidden text-left hover:border-ai/50 focus-visible:outline-2 focus-visible:outline-ai"
						>
							<div className="relative aspect-square overflow-hidden bg-muted/40">
								{asset.assetFileType === 'IMAGE' ? (
									<img src={asset.documentUrl} alt={asset.title ?? 'Asset File'} className="w-full h-full object-cover" />
								) : isVideo ? (
									<video src={asset.documentUrl} className="w-full h-full object-cover" />
								) : (
									<div className="w-full h-full flex items-center justify-center"><Box className="w-10 h-10 text-primary" /></div>
								)}
								<Eye className="absolute top-3 right-3 w-4 h-4 text-white drop-shadow-md opacity-0 group-hover:opacity-100" aria-hidden="true" />
							</div>
							<div className="p-3 border-t border-border space-y-1">
								<p className="text-sm font-semibold text-foreground truncate">{asset.title || 'Untitled Asset'}</p>
								<p className={cn('text-xs text-muted-foreground flex items-center gap-1', is3D && 'text-primary')}>{icon}<span>.{asset.fileExtension}</span></p>
							</div>
						</button>
					)
				})}
			</div>

			<ClinicalAssetLightbox
				key={lightboxIndex ?? 'closed'}
				isOpen={lightboxIndex !== null}
				onClose={() => setLightboxIndex(null)}
				assets={legacyAssets}
				initialIndex={lightboxIndex ?? 0}
			/>
		</section>
	)
}

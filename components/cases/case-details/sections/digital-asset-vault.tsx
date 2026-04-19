"use client";

import { useState } from "react";
import { Box, ImageIcon, Video, Download, Eye, Layers, FileCode2, ExternalLink, Play } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ClinicalAssetLightbox } from "@/components/shared/file-assets/clinical-asset-lightbox";
import { AssetFileType } from "@/schema/base/enums.base";
import { CaseAssetFileDetailsUI } from "@/schema/composed/case-asset-file.details";

interface Props {
	assets: CaseAssetFileDetailsUI[];
}

export function DigitalAssetVault({ assets }: Props) {
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

	if (!assets || assets.length === 0) {
		return (
			<div className="lab-card p-12 flex flex-col items-center justify-center text-center border-dashed">
				<div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4">
					<Layers className="w-8 h-8 text-slate-400" />
				</div>
				<h3 className="text-lg font-bold text-foreground">No digital assets found</h3>
				<p className="text-sm text-muted-foreground max-w-xs mt-1">This case does not have any attached 3D scans or clinical photos.</p>
			</div>
		);
	}

	return (
		<section className="space-y-6 animate-in fade-in duration-700 delay-400">
			{/* --- VAULT HEADER --- */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<div className="w-1.5 h-6 bg-ai rounded-full" />
					<h2 className="text-xl font-bold tracking-tight text-foreground">Digital Asset Vault</h2>
					<span className="px-2 py-0.5 rounded-md bg-ai/10 border border-ai/20 text-[10px] font-mono font-bold text-ai">{assets.length} FILES</span>
				</div>

				<Button variant="outline" size="sm" className="rounded-xl border-border bg-white dark:bg-white/5 font-semibold text-xs h-9">
					<Download className="w-3.5 h-3.5 mr-2" /> Download All (.zip)
				</Button>
			</div>

			{/* --- ASSET GRID --- */}
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
				{assets.map((asset, index) => {
					const is3D = asset.assetFileType === "SCANNERFILE";
					const isVideo = asset.assetFileType === "VIDEO";
					const isImage = asset.assetFileType === "IMAGE";

					return (
						<div
							key={asset.id}
							onClick={() => setLightboxIndex(index)}
							className={cn(
								"group relative aspect-square rounded-[24px] border transition-all duration-300 cursor-pointer overflow-hidden shadow-sm",
								is3D ? "border-primary/20 bg-primary/[0.02] hover:border-primary/50" : "border-border bg-card hover:border-ai/50",
							)}
						>
							{/* 1. Thumbnail Render */}
							<div className="absolute inset-0 z-0">
								{isImage ? (
									<img src={asset.documentUrl} alt={asset.title ?? "Asset File"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
								) : isVideo ? (
									<div className="w-full h-full bg-slate-900 flex items-center justify-center">
										<video src={asset.documentUrl} className="w-full h-full object-cover opacity-60" />
										<Play className="w-8 h-8 text-white opacity-80" />
									</div>
								) : (
									/* 3D Model Placeholder */
									<div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#121214] dark:to-[#09090B] flex items-center justify-center relative overflow-hidden">
										{/* Subtle technical grid background for 3D files */}
										<div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[size:10px_10px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]" />
										<Box className="w-10 h-10 text-primary opacity-40 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500" />
									</div>
								)}
							</div>

							{/* 2. Glassmorphic Footer Overlay */}
							<div className="absolute inset-x-0 bottom-0 p-3 bg-white/60 dark:bg-black/40 backdrop-blur-md border-t border-white/20 dark:border-white/5 z-10">
								<div className="flex items-center justify-between gap-2">
									<div className="min-w-0">
										<p className="text-[11px] font-bold text-foreground truncate">{asset.title}</p>
										<p className="text-[9px] font-mono text-muted-foreground uppercase tracking-tighter">.{asset.fileExtension} • 14.2 MB</p>
									</div>
									<div
										className={cn(
											"w-6 h-6 rounded-lg flex items-center justify-center shrink-0 shadow-inner",
											is3D ? "bg-primary text-white" : "bg-white/80 dark:bg-white/10 text-muted-foreground",
										)}
									>
										{is3D ? <FileCode2 className="w-3.5 h-3.5" /> : isVideo ? <Video className="w-3.5 h-3.5" /> : <ImageIcon className="w-3.5 h-3.5" />}
									</div>
								</div>
							</div>

							{/* 3. Hover "Awwwards" Action Overlay */}
							<div className="absolute inset-0 bg-primary/20 dark:bg-primary/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 z-20">
								<div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-xl scale-90 group-hover:scale-100 transition-transform duration-300">
									<Eye className="w-5 h-5" />
								</div>
							</div>

							{/* 4. Type Badge (Static) */}
							<div className="absolute top-3 right-3 z-10">
								{is3D && <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[8px] font-black uppercase tracking-widest shadow-lg animate-pulse">3D MESH</span>}
							</div>
						</div>
					);
				})}
			</div>

			{/* --- CINEMATIC LIGHTBOX --- */}
			<ClinicalAssetLightbox isOpen={lightboxIndex !== null} onClose={() => setLightboxIndex(null)} assets={assets} initialIndex={lightboxIndex ?? 0} />
		</section>
	);
}

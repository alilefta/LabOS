"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Download, Box, ImageIcon, Video, Info, FileText } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AssetFileType } from "@/schema/base/enums.base";
import dynamic from "next/dynamic";

const ScannerFilesViewer = dynamic(() => import("./scanner-files-viewer").then((m) => m.ScannerFilesViewer), {
	ssr: false,
	loading: () => <div className="w-full h-full flex items-center justify-center text-foreground text-sm font-medium animate-pulse">Loading 3D Engine...</div>,
});

interface Asset {
	id?: string;
	title: string;
	description?: string | null;
	documentUrl?: string;
	assetFileType: AssetFileType;
	fileExtension: string; // Added to match your new schema
}

interface Props {
	isOpen: boolean;
	onClose: () => void;
	assets: Asset[];
	initialIndex: number;
}

const getIcon = (type: AssetFileType) => {
	switch (type) {
		case "SCANNERFILE":
			return <Box className="w-5 h-5" />;
		case "IMAGE":
			return <ImageIcon className="w-5 h-5" />;
		case "VIDEO":
			return <Video className="w-5 h-5" />;
	}
};

export function ClinicalAssetLightbox({ isOpen, onClose, assets, initialIndex }: Props) {
	const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
	// const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (isOpen) {
			setCurrentIndex(initialIndex);
			setLoading(true);
		}
	}, [isOpen, initialIndex]);

	// // Reset index when modal opens
	// useEffect(() => {
	// 	if (isOpen) setCurrentIndex(initialIndex);
	// }, [isOpen, initialIndex]);

	// Action-bound loading state (NO useEffect needed)
	const handleNext = (e?: React.MouseEvent | KeyboardEvent) => {
		e?.stopPropagation();
		setLoading(true);
		setCurrentIndex((prev) => (prev + 1) % assets.length);
	};

	const handlePrev = (e?: React.MouseEvent | KeyboardEvent) => {
		e?.stopPropagation();
		setLoading(true);
		setCurrentIndex((prev) => (prev - 1 + assets.length) % assets.length);
	};

	// Keyboard Navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!isOpen) return;
			if (e.key === "ArrowRight") handleNext();
			if (e.key === "ArrowLeft") handlePrev();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, assets.length]);

	if (!assets || assets.length === 0) return null;

	// --- CRITICAL FIX: Safe Array Bounds ---
	// If the array shrinks in the background (deletion), force the index back into bounds
	const safeIndex = Math.min(currentIndex, Math.max(0, assets.length - 1));
	const currentAsset = assets[safeIndex];

	// Ultimate safety check
	if (!currentAsset) return null;

	const isImage = currentAsset.assetFileType === "IMAGE";
	const isVideo = currentAsset.assetFileType === "VIDEO";
	const is3D = currentAsset.assetFileType === "SCANNERFILE";

	const supported3D = ["stl", "obj", "ply", "gltf", "glb"];
	const canRender3D = is3D && currentAsset.documentUrl && currentAsset.fileExtension && supported3D.includes(currentAsset.fileExtension.toLowerCase());
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			{/* Accessibility requirements */}
			<DialogTitle className="sr-only">Asset Preview Lightbox</DialogTitle>
			<DialogDescription className="sr-only">Detailed view of clinical asset with metadata.</DialogDescription>

			<DialogContent
				className="max-w-[100vw]! w-screen h-screen max-h-screen p-0 border-none bg-[#09090B]/95 backdrop-blur-2xl rounded-none flex flex-col overflow-hidden [&>button]:hidden z-[100]"
				showCloseButton={false}
			>
				{/* --- TOP NAVIGATION BAR --- */}
				<div className="h-16 shrink-0 flex items-center justify-between px-6 border-b border-white/10 bg-black/20">
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white">
							{getIcon(currentAsset.assetFileType)}
							<span className="text-[11px] font-bold uppercase tracking-widest">{currentAsset.assetFileType}</span>
						</div>
						<div className="flex flex-col">
							<span className="text-sm font-bold text-white truncate max-w-md">{currentAsset.title || "Untitled Asset"}</span>
							<span className="text-[10px] text-zinc-400 font-mono">
								File {currentIndex + 1} of {assets.length}
							</span>
						</div>
					</div>

					<div className="flex items-center gap-4">
						{currentAsset.documentUrl && (
							<Button variant="outline" size="sm" className="h-9 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white" asChild>
								<a href={currentAsset.documentUrl} download target="_blank" rel="noreferrer">
									<Download className="w-4 h-4 mr-2" /> Download
								</a>
							</Button>
						)}
						<div className="w-px h-6 bg-white/10 mx-2" />
						<Button variant="ghost" size="icon" onClick={onClose} className="h-10 w-10 rounded-full bg-white/5 text-white hover:bg-destructive hover:text-white transition-colors">
							<X className="w-5 h-5" />
						</Button>
					</div>
				</div>

				{/* --- MAIN LIGHTBOX AREA --- */}
				<div className="flex-1 flex flex-col lg:flex-row min-h-0 relative">
					{/* Left/Main: The Media Viewer (75%) */}
					<div className="flex-1 relative flex items-center justify-center p-4 sm:p-12 min-h-0 bg-black/40">
						{isImage && currentAsset.documentUrl ? (
							<div key={currentAsset.documentUrl} className="relative w-full h-full flex items-center justify-center animate-in zoom-in-95 duration-500">
								<div className="relative w-full h-full flex items-center justify-center">
									{loading && (
										<div className="absolute inset-0 flex items-center justify-center">
											<div className="animate-spin h-8 w-8 border-2 border-white/20 border-t-white rounded-full" />
										</div>
									)}

									<Image
										src={currentAsset.documentUrl}
										alt={currentAsset.title}
										priority
										fill
										className={cn("object-contain rounded-xl shadow-2xl ring-1 ring-white/10 transition-opacity duration-300", loading ? "opacity-0" : "opacity-100")}
										onLoadingComplete={() => setLoading(false)}
									/>
								</div>
							</div>
						) : isVideo && currentAsset.documentUrl ? (
							<div className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-black animate-in zoom-in-95 duration-500">
								<video src={currentAsset.documentUrl} controls autoPlay className="w-full h-auto max-h-[70vh] outline-none" />
							</div>
						) : canRender3D && currentAsset.documentUrl ? (
							<div className="absolute inset-0 w-full h-full animate-in zoom-in-95 duration-500">
								<ScannerFilesViewer url={currentAsset.documentUrl} extension={currentAsset.fileExtension} />
							</div>
						) : (
							/* UNSUPPORTED / 3D SCAN STATE */
							// Maybe here will goes the viewer if the currentAsset.fileExtension is supported
							<div className="flex flex-col items-center justify-center text-center max-w-md animate-in fade-in duration-500">
								<div className="w-24 h-24 rounded-[24px] bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
									<Box className="w-12 h-12" />
								</div>
								<h3 className="text-2xl font-bold text-white mb-2">3D Scan Data</h3>
								<p className="text-sm text-zinc-400 leading-relaxed mb-8">
									In-browser 3D rendering for <span className="font-mono text-white bg-white/10 px-1 rounded">.{currentAsset.fileExtension}</span> is disabled to conserve
									performance. Download the file to open it in Exocad or 3Shape.
								</p>
								{currentAsset.documentUrl && (
									<Button className="rounded-xl h-12 px-8 bg-primary text-white shadow-premium font-bold hover:bg-primary/90" asChild>
										<a href={currentAsset.documentUrl} download target="_blank" rel="noreferrer">
											<Download className="w-4 h-4 mr-2" /> Download Mesh Data
										</a>
									</Button>
								)}
							</div>
						)}

						{/* Arrow Navigation (Floating) */}
						{assets.length > 1 && (
							<>
								<Button
									variant="ghost"
									size="icon"
									onClick={handlePrev}
									className="absolute left-4! top-1/2! active:-translate-x-1! -translate-y-1/2! w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black hover:text-white border border-white/10 backdrop-blur-md shadow-2xl transition-all"
								>
									<ChevronLeft className="w-6 h-6" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									onClick={handleNext}
									className="absolute right-4! top-1/2! -translate-y-1/2! active:translate-x-1!  w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black hover:text-white border border-white/10 backdrop-blur-md shadow-2xl transition-all"
								>
									<ChevronRight className="w-6 h-6" />
								</Button>
							</>
						)}
					</div>

					{/* Right: Metadata Panel (25%) */}
					<div className="w-full lg:w-80 shrink-0 bg-[#121214] border-l border-white/5 p-6 flex flex-col overflow-y-auto">
						<div className="flex items-center gap-2 mb-6">
							<FileText className="w-4 h-4 text-primary" />
							<h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">Clinical Notes</h4>
						</div>

						<div className="space-y-6">
							<div>
								<label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Asset Name</label>
								<p className="text-sm font-semibold text-white wrap-break-word">{currentAsset.title || "No title provided"}</p>
							</div>

							<div>
								<label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Description / Notes</label>
								{currentAsset.description ? (
									<div className="p-4 rounded-xl bg-white/5 border border-white/5 text-sm text-zinc-300 leading-relaxed italic">&quot;{currentAsset.description}&quot;</div>
								) : (
									<p className="text-sm text-zinc-600 italic">No clinical notes attached to this file.</p>
								)}
							</div>
						</div>

						<div className="mt-auto pt-8">
							<div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex gap-3 items-start">
								<Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
								<p className="text-[10px] text-zinc-400 leading-relaxed font-medium">
									<span className="text-primary font-bold uppercase mr-1">LabOS Vault:</span>
									This asset is staged and will be permanently sealed when the case is submitted.
								</p>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

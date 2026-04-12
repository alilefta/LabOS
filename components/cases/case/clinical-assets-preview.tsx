"use client";

import { Controller, useFieldArray, Control, UseFormGetValues } from "react-hook-form";
import { Box, ImageIcon, Video, Trash2, Eye, Play } from "lucide-react";
import { CreateCaseInput } from "@/schema/composed/case.details";
import { AssetFileType } from "@/schema/base/enums.base";
import { CustomFieldWithLabel } from "@/components/ui/custom/custom-field-with-label";
import Image from "next/image";
import { ClinicalAssetLightbox } from "@/components/shared/file-assets/clinical-asset-lightbox";
import { memo, useState } from "react";
import { cn } from "@/lib/utils";

const getIcon = (type: AssetFileType) => {
	switch (type) {
		case "SCANNERFILE":
			return <Box className="w-8 h-8 text-primary/60 mb-2" />;
		case "IMAGE":
			return <ImageIcon className="w-8 h-8 text-ai/60 mb-2" />;
		case "VIDEO":
			return <Video className="w-8 h-8 text-amber-500/60 mb-2" />;
	}
};

interface Asset {
	id?: string;
	title: string;
	description?: string | null;
	documentUrl?: string;
	assetFileType: AssetFileType;
	fileExtension: string;
}

interface Props {
	control: Control<CreateCaseInput>;
	getValues: UseFormGetValues<CreateCaseInput>;
}
export const ClinicalAssetPreview = memo(function ClinicalAssetPreview({ control, getValues }: Props) {
	const { fields, remove } = useFieldArray({
		control,
		name: "caseAssetFiles",
	});
	const isEmpty = fields.length === 0;
	// Lightbox State
	const [lightboxState, setLightboxState] = useState<{
		stableAssets: Asset[]; // frozen at open time
		index: number;
	} | null>(null);

	const openAssetLightboxModal = (index: number) => {
		setLightboxState({
			stableAssets: [...getValues("caseAssetFiles")],
			index,
		});
	};

	if (isEmpty) return null;

	return (
		<div className="space-y-4">
			<h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Attachment Review</h4>
			{/* --- EMPTY STATE --- */}
			{/* {isEmpty && (
				<div className="h-40 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center bg-slate-50/50 dark:bg-white/2 animate-in fade-in zoom-in-95 duration-300">
					<div className="w-12 h-12 rounded-xl bg-white dark:bg-[#121214] border border-border shadow-sm flex items-center justify-center mb-4">
						<FileSearch className="w-6 h-6 text-slate-400 dark:text-zinc-500" />
					</div>
					<p className="text-sm font-bold text-foreground">No technical assets attached.</p>
					<p className="text-[11px] text-muted-foreground mt-1 max-w-sm text-center">
						Upload 3D scans, Rx documents, or patient photos in the dropzone above to review and annotate them here.
					</p>
				</div>
			)} */}

			{/* --- ATTACHMENT GRID --- */}
			{!isEmpty && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
					{fields.map((field, index) => {
						const currentLiveAsset = fields[index] || field;
						const fileType = currentLiveAsset?.assetFileType;

						const isImage = fileType === "IMAGE";
						const isVideo = fileType === "VIDEO";

						return (
							<div
								key={field.id}
								className="group relative rounded-2xl border border-border bg-card shadow-sm overflow-hidden flex flex-col hover:border-primary/40 hover:shadow-md transition-all duration-300"
							>
								{/* Visual Header / Thumbnail */}
								<div className="h-36 bg-slate-100 dark:bg-[#09090B] border-b border-border relative flex flex-col items-center justify-center overflow-hidden">
									{/* 1. IMAGE RENDERING */}
									{isImage && currentLiveAsset.documentUrl ? (
										<Image src={currentLiveAsset.documentUrl} alt="Asset" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
									) : isVideo && currentLiveAsset.documentUrl ? (
										<>
											<video
												src={currentLiveAsset.documentUrl}
												className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
												preload="metadata"
												muted
											/>
											<div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
												<div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
													<Play className="w-4 h-4 ml-0.5" />
												</div>
											</div>
										</>
									) : (
										// 3D MODEL FALLBACK UI
										<div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
											{getIcon(currentLiveAsset.assetFileType)}
											<span className="text-xs font-bold text-foreground line-clamp-1 mb-2">{currentLiveAsset.title}</span>
											<span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest bg-background/80 px-2 py-0.5 rounded-md backdrop-blur-md shadow-sm border border-border">
												{currentLiveAsset.fileExtension || currentLiveAsset.assetFileType}
											</span>
										</div>
									)}

									{/* --- HYBRID INTERACTION UX --- */}

									{/* 1. DESKTOP Hover Overlay (Hidden on Mobile/Tablet) */}
									<div className="hidden lg:flex absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 items-center justify-center gap-4 z-20">
										<button
											title="View in full screen"
											type="button"
											onClick={() => openAssetLightboxModal(index)}
											className="w-12 h-12 rounded-full bg-white/20 hover:bg-primary border border-white/30 text-white flex items-center justify-center shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50"
										>
											<Eye className="w-5 h-5" />
										</button>
										<button
											title="Remove the asset"
											type="button"
											onClick={() => remove(index)}
											className="w-12 h-12 rounded-full bg-white/20 hover:bg-destructive border border-white/30 text-white flex items-center justify-center shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-destructive/50"
										>
											<Trash2 className="w-5 h-5" />
										</button>
									</div>

									{/* 2. MOBILE / TABLET Floating Actions (Always visible, hidden on Desktop) */}
									<div className="flex lg:hidden absolute top-2 right-2 z-20 gap-2">
										<button
											type="button"
											title="View in full screen"
											onClick={() => openAssetLightboxModal(index)}
											className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
										>
											<Eye className="w-4 h-4" />
										</button>
										<button
											type="button"
											title="Remove the asset"
											onClick={() => remove(index)}
											className="w-9 h-9 rounded-full bg-destructive/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
										>
											<Trash2 className="w-4 h-4" />
										</button>
									</div>
								</div>

								{/* Metadata Editor */}
								<div className="p-4 space-y-4 flex-1 flex flex-col bg-card">
									<Controller
										control={control}
										name={`caseAssetFiles.${index}.title`}
										render={({ field: inputField, fieldState }) => (
											<CustomFieldWithLabel field={inputField} fieldState={fieldState} fieldTitle="Asset Name" nameInSchema={`caseAssetFiles.${index}.title`}>
												<input
													{...inputField}
													className={cn(
														"w-full h-10 px-3 bg-slate-50 dark:bg-[#121214] border border-border rounded-xl text-xs outline-none transition-all",
														fieldState.invalid ? "border-destructive focus:ring-destructive/20" : "focus:ring-2 focus:ring-primary/20 focus:border-primary",
													)}
												/>
											</CustomFieldWithLabel>
											// <InputWithLabel field={inputField} fieldState={fieldState} fieldTitle="Asset Name" nameInSchema={`caseAssetFiles.${index}.title`} />
										)}
									/>
									<Controller
										control={control}
										name={`caseAssetFiles.${index}.description`}
										render={({ field: inputField, fieldState }) => (
											<CustomFieldWithLabel
												field={inputField}
												fieldState={fieldState}
												fieldTitle="Clinical Notes"
												nameInSchema={`caseAssetFiles.${index}.description`}
												isOptional
											>
												<textarea
													{...inputField}
													value={inputField.value || ""}
													placeholder="e.g. Note the distal margin..."
													className={cn(
														"w-full min-h-15 p-3 bg-slate-50 dark:bg-[#121214] border border-border rounded-xl text-xs outline-none transition-all resize-none custom-scrollbar",
														fieldState.invalid ? "border-destructive focus:ring-destructive/20" : "focus:ring-2 focus:ring-primary/20 focus:border-primary",
													)}
												/>
											</CustomFieldWithLabel>
										)}
									/>
								</div>
							</div>
						);
					})}
				</div>
			)}

			{/* LIGHTBOX RENDER */}
			<ClinicalAssetLightbox
				key={lightboxState?.index ?? -1} // ← remounts when a different asset is opened
				isOpen={lightboxState !== null}
				onClose={() => setLightboxState(null)}
				assets={lightboxState?.stableAssets ?? []}
				initialIndex={lightboxState?.index ?? 0}
			/>
		</div>
	);
});

ClinicalAssetPreview.displayName = "ClinicalAssetPreview";

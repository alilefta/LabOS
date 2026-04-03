"use client";

import { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { UploadCloud, X, Loader2, Info, Box, ImageIcon, Video } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useUploadThing } from "@/utils/uploadThing";
import { toast } from "sonner";
import { AssetFileType } from "@/schema/base/enums.base"; // Adjust import path
import { ClientUploadedFileData } from "uploadthing/types";
import { CreateCaseAssetFilesInput } from "@/schema/composed/case-asset-file.details";

// Internal state tracking for the UI progress (before it hits the form)
interface UploadingFile {
	tempId: string;
	name: string;
	size: string;
	progress: number;
	status: "uploading" | "complete" | "error";
	type: AssetFileType;
	fileExtension: string;
}

const getFileExtension = (fileName: string): string => {
	return fileName.split(".").pop()?.toLowerCase() || "unknown";
};

const getAssetFileType = (fileName: string): AssetFileType => {
	const ext = getFileExtension(fileName);
	if (["jpg", "jpeg", "png", "webp"].includes(ext)) return "IMAGE";
	if (["mp4", "webm", "mov"].includes(ext)) return "VIDEO";
	if (["stl", "obj", "ply", "dcm"].includes(ext)) return "SCANNERFILE";
	return "IMAGE"; // Fallback
};

const getFileIcon = (type: AssetFileType) => {
	switch (type) {
		case "SCANNERFILE":
			return <Box className="w-5 h-5" />;
		case "IMAGE":
			return <ImageIcon className="w-5 h-5" />;
		case "VIDEO":
			return <Video className="w-5 h-5" />;
	}
};

export function CaseFileUploadZone({ onUploadFiles }: { onUploadFiles: (UploadedFiles: CreateCaseAssetFilesInput[]) => void }) {
	// const { control } = useFormContext<CreateCaseInput>();
	// const { fields, append, remove } = useFieldArray({
	// 	control,
	// 	name: "caseAssetFiles",
	// });

	const [totalUploadedFiles, setTotalUploadedFiles] = useState<number>(0);

	const onNewAssetsUploaded = useCallback(
		(
			assets: ClientUploadedFileData<{
				uploadedBy: string;
				labId: string;
			}>[],
		) => {
			// Map the completed UploadThing response into the Zod Schema
			const newAssets = assets.map((file) => ({
				title: file.name,
				description: "",
				documentUrl: file.ufsUrl || file.url,
				assetFileType: getAssetFileType(file.name),
				fileExtension: getFileExtension(file.name), // <--- HERE
			}));

			// Append to the actual form state
			onUploadFiles(newAssets);
			setTotalUploadedFiles(newAssets.length);
		},
		[onUploadFiles],
	);

	// UI tracking for files currently uploading
	const [activeUploads, setActiveUploads] = useState<UploadingFile[]>([]);

	const { startUpload } = useUploadThing("caseAssetsRoute", {
		onClientUploadComplete: (res) => {
			if (!res) return;

			onNewAssetsUploaded(res);
			toast.success(`${res.length} asset(s) successfully secured.`);

			// Clear from "active uploads" UI since they are now in the form state
			setActiveUploads((prev) => prev.filter((u) => !res.find((r) => r.name === u.name)));
		},
		onUploadError: (error) => {
			toast.error("Asset upload failed", { description: error.message });
			// Mark all currently uploading as error
			setActiveUploads((prev) => prev.map((f) => ({ ...f, status: "error" })));
		},
		onUploadProgress: (progress) => {
			// Update the visual progress bar for all active uploads
			// (UploadThing currently fires a single aggregate progress event for the batch)
			setActiveUploads((prev) => prev.map((f) => (f.status === "uploading" ? { ...f, progress } : f)));
		},
	});

	const onDrop = useCallback(
		async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
			if (acceptedFiles?.length) {
				// 1. Add to visual UI queue
				const uiFiles: UploadingFile[] = acceptedFiles.map((file) => ({
					tempId: Math.random().toString(36).substring(7),
					name: file.name,
					size: (file.size / (1024 * 1024)).toFixed(2),
					progress: 0,
					status: "uploading",
					type: getAssetFileType(file.name),
					fileExtension: getFileExtension(file.name), // <--- HERE
				}));

				setActiveUploads((prev) => [...prev, ...uiFiles]);

				// 2. Trigger UploadThing
				await startUpload(acceptedFiles);
			}

			if (fileRejections?.length) {
				toast.error("Asset rejected", { description: fileRejections[0].errors[0].message });
			}
		},
		[startUpload],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"application/octet-stream": [".stl", ".obj", ".ply", ".dcm"],
			"image/*": [".jpg", ".jpeg", ".png"],
			"video/*": [".mp4", ".mov"],
		},
		maxSize: 100 * 1024 * 1024, // 100MB (adjust to your UploadThing config)
	});

	return (
		<div className="space-y-6 animate-in fade-in duration-500">
			{/* HEADER */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h3 className="text-[13px] font-bold text-slate-700 dark:text-zinc-300">Case Attachments</h3>
					<TooltipProvider delayDuration={150}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
							</TooltipTrigger>
							<TooltipContent className="glass-ai-panel border-border shadow-xl p-3 max-w-[240px]">
								<p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest mb-1">Supported Formats</p>
								<p className="text-xs text-foreground font-medium leading-relaxed">3D Scans (.stl, .obj, .dcm) and clinical photography. Max 100MB per file.</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<span className="text-[11px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">{totalUploadedFiles} Secured</span>
			</div>

			{/* DROPZONE */}
			<div
				{...getRootProps()}
				className={cn(
					"relative group border-2 border-dashed rounded-2xl p-10 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden",
					isDragActive ? "border-primary bg-primary/5 scale-[1.01]" : "border-border bg-slate-50 dark:bg-white/[0.02] hover:border-primary/40 hover:bg-slate-50/80 dark:hover:bg-white/5",
				)}
			>
				<input {...getInputProps()} />

				{/* Decorative background blur on hover */}
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

				<div className="w-12 h-12 rounded-xl bg-white dark:bg-[#121214] border border-border flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-all shadow-sm relative z-10">
					<UploadCloud className={cn("w-5 h-5 transition-colors", isDragActive ? "text-primary" : "text-slate-400 dark:text-zinc-500 group-hover:text-primary")} />
				</div>
				<p className="text-sm font-bold text-foreground relative z-10">Click or Drag Clinical Files</p>
				<p className="text-[11px] text-muted-foreground mt-1 relative z-10">STL, OBJ, JPG, PNG or MP4</p>
			</div>

			{/* ACTIVE UPLOADS QUEUE */}
			{activeUploads.length > 0 && (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{activeUploads.map((file) => (
						<div key={file.tempId} className="p-4 rounded-xl border border-border bg-card shadow-sm flex items-center gap-4 animate-in zoom-in-95 duration-200">
							<div
								className={cn(
									"w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
									file.status === "error" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary",
								)}
							>
								{file.status === "error" ? <X className="w-4 h-4" /> : <Loader2 className="w-4 h-4 animate-spin" />}
							</div>

							<div className="flex-1 min-w-0">
								<div className="flex items-center justify-between mb-1.5">
									<span className="text-xs font-bold text-foreground truncate max-w-[150px]">{file.name}</span>
									<span className="text-[10px] font-mono font-medium text-muted-foreground">{file.size} MB</span>
								</div>
								<Progress value={file.progress} className={cn("h-1.5", file.status === "error" && "bg-destructive/20 [&>div]:bg-destructive")} />
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

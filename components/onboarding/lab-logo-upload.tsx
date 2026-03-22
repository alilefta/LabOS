"use client";

import { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { Trash2, Loader2, ImageIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { useUploadThing } from "@/utils/uploadThing";
import { CreateLabAndLabUserInput } from "@/schema/composed/lab.details";

export function LabLogoUpload() {
	const { setValue, watch, formState } = useFormContext<CreateLabAndLabUserInput>();
	const imageUrl = watch("lab.brandAvatarUrl");
	const [preview, setPreview] = useState<string | null>(imageUrl ?? null);

	// 1. UPLOADTHING LOGIC
	const { isUploading, startUpload } = useUploadThing("labLogoImage", {
		onClientUploadComplete: (res) => {
			const url = res[0].ufsUrl;
			setValue("lab.brandAvatarUrl", url, { shouldValidate: true });
			toast.success("Logo uploaded successfully");
		},
		onUploadError: (error) => {
			setPreview(null); // Reset on fail
			toast.error("Upload failed", { description: error.message });
		},
	});
	const onDrop = useCallback(
		async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
			if (acceptedFiles?.length) {
				const file = acceptedFiles[0];

				// Optimistic Preview
				const objectUrl = URL.createObjectURL(file);
				setPreview(objectUrl);

				// Trigger Upload
				await startUpload([file]);
			}

			if (fileRejections?.length) {
				toast.error("Upload rejected", { description: fileRejections[0].errors[0].message });
			}
		},
		[startUpload],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { "image/png": [], "image/jpeg": [], "image/webp": [], "image/svg+xml": [] },
		maxFiles: 1,
		maxSize: 4 * 1024 * 1024, // 4MB
	});

	const handleRemove = (e: React.MouseEvent) => {
		e.stopPropagation();
		setPreview(null);
		setValue("lab.brandAvatarUrl", "", { shouldValidate: true });
	};
	const hasError = !!formState.errors.lab?.brandAvatarUrl;

	return (
		<div className="flex flex-col items-center gap-4 w-full mb-8">
			<div
				{...getRootProps()}
				className={cn(
					"group relative flex flex-col items-center justify-center w-32 h-32 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden shadow-sm",
					// Drag state
					isDragActive ? "border-primary bg-primary/5 scale-105" : "border-border bg-slate-50 dark:bg-white/5 hover:border-primary/50 hover:bg-slate-100 dark:hover:bg-white/10",
					// Preview state
					preview && "border-solid border-border shadow-md",
					// Error state
					hasError && "border-destructive bg-destructive/5 hover:border-destructive/80",
				)}
			>
				<input {...getInputProps()} />

				{preview ? (
					<>
						<Image src={preview} alt="Lab Logo" fill className="object-cover" />

						{/* Hover Remove Overlay */}
						<div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center">
							<Button
								type="button"
								size="icon"
								variant="destructive"
								onClick={handleRemove}
								className="rounded-xl w-10 h-10 shadow-lg scale-90 group-hover:scale-100 transition-transform"
							>
								<Trash2 size={16} />
							</Button>
						</div>
					</>
				) : (
					<div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
						<div className="p-3 bg-white dark:bg-[#121214] rounded-xl shadow-sm ring-1 ring-border group-hover:ring-primary/50 transition-all">
							<ImageIcon size={20} className="text-slate-400 dark:text-zinc-500 group-hover:text-primary transition-colors" />
						</div>
						<span className="text-[11px] font-semibold uppercase tracking-wider">Upload Logo</span>
					</div>
				)}

				{/* Loading Overlay (Glassmorphism) */}
				{isUploading && (
					<div className="absolute inset-0 bg-background/80 rounded-2xl backdrop-blur-md flex flex-col items-center justify-center gap-2 z-10">
						<Loader2 className="w-6 h-6 text-primary animate-spin" />
					</div>
				)}
			</div>

			<div className="text-center">
				<p className="text-[13px] text-muted-foreground font-medium">Upload your lab&apos;s brand logo</p>
				<p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-1">SVG, PNG, or JPG (Max 4MB)</p>
			</div>

			{hasError && <p className="text-[12px] font-medium text-destructive mt-1">{formState.errors.lab?.brandAvatarUrl?.message}</p>}
		</div>
	);
}

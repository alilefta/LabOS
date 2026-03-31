"use client";

import { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { Trash2, Loader2, ImagePlus } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { useUploadThing } from "@/utils/uploadThing";

interface Props<S extends FieldValues> {
	nameInSchema: FieldPath<S>; // e.g. "product.imageUrl"
	label: string;
}

/**
 *
 * @param nameInSchema - The path to the image URL field in the form schema (e.g., "product.imageUrl")
 * @param label - The titile for the success message (e.g., "Product Catalog)
 * @returns
 */
export function CatalogImageUpload<S extends FieldValues>({ nameInSchema, label }: Props<S>) {
	const { setValue, watch, formState } = useFormContext();
	const imageUrl = watch(nameInSchema);
	const [preview, setPreview] = useState<string | null>(imageUrl ?? null);

	// 1. UPLOADTHING LOGIC - Updated to your new file route
	const { isUploading, startUpload } = useUploadThing("genericAvatar", {
		onClientUploadComplete: (res) => {
			if (!res || res.length === 0) return;
			// Using ufsUrl as per your updated UploadThing config
			const url = res[0].ufsUrl || res[0].ufsUrl;
			setValue(nameInSchema as string, url, { shouldValidate: true });
			toast.success(`${label} image uploaded`);
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

				// Optimistic Preview (instant UI feedback)
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
		setValue(nameInSchema as string, "", { shouldValidate: true });
	};

	// Safely check for errors on the imageUrl field
	const hasError = !!formState.errors?.imageUrl;

	return (
		<div className="flex flex-col items-center gap-4 w-full mb-6">
			<div
				{...getRootProps()}
				className={cn(
					"group relative flex flex-col items-center justify-center w-28 h-28 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden shadow-sm",
					// Drag state
					isDragActive ? "border-primary bg-primary/5 scale-105" : "border-border bg-slate-50 dark:bg-white/[0.02] hover:border-primary/50 hover:bg-slate-100 dark:hover:bg-white/5",
					// Preview state
					preview && "border-solid border-border shadow-md",
					// Error state
					hasError && "border-destructive bg-destructive/5 hover:border-destructive/80",
				)}
			>
				<input {...getInputProps()} />

				{preview ? (
					<>
						<Image src={preview} alt="Category Icon" fill className="object-cover p-1 rounded-2xl" />

						{/* Hover Remove Overlay */}
						<div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center">
							<Button type="button" size="icon" variant="destructive" onClick={handleRemove} className="rounded-xl w-9 h-9 shadow-lg scale-90 group-hover:scale-100 transition-transform">
								<Trash2 size={16} />
							</Button>
						</div>
					</>
				) : (
					<div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
						<div className="p-2.5 bg-white dark:bg-[#121214] rounded-xl shadow-sm ring-1 ring-border group-hover:ring-primary/50 transition-all">
							<ImagePlus size={20} className="text-slate-400 dark:text-zinc-500 group-hover:text-primary transition-colors" />
						</div>
						<span className="text-[10px] font-bold uppercase tracking-wider">Upload Icon</span>
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
				<p className="text-[13px] text-foreground font-semibold">{label} Image</p>
				<p className="text-[11px] text-muted-foreground mt-0.5">SVG or Transparent PNG recommended</p>
			</div>

			{hasError && (
				<div className="text-[12px] font-medium text-destructive mt-1 flex items-center gap-1.5">
					<div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse"></div>
					{formState.errors.imageUrl?.message as string}
				</div>
			)}
		</div>
	);
}

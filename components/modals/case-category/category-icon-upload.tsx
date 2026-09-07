"use client";

import { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { Trash2, Loader2, ImagePlus } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { useUploadThing } from "@/utils/uploadThing";

export type CategoryIconUploadStage =
	| { mode: "create" }
	| { mode: "update"; categoryId: string };

type CategoryImageFormValues = {
	imageUrl?: string | null;
	imageUploadGrantId?: string;
};

interface Props {
	stage: CategoryIconUploadStage;
}

export function CategoryIconUpload({ stage }: Props) {
	const { setValue, watch, formState } = useFormContext<CategoryImageFormValues>();
	const imageUrl = watch("imageUrl");
	const imageUploadGrantId = watch("imageUploadGrantId");
	const [localPreview, setLocalPreview] = useState<string | null>(null);
	const [localStagedGrantId, setLocalStagedGrantId] = useState<
		string | null | undefined
	>(undefined);
	const hasLocalStagedPreview =
		localStagedGrantId === null ||
		(localStagedGrantId !== undefined && localStagedGrantId === imageUploadGrantId);
	const preview = hasLocalStagedPreview ? localPreview : imageUrl || null;

	const { isUploading, startUpload } = useUploadThing("categoryIconAvatar", {
		onClientUploadComplete: (res) => {
			if (!res || res.length === 0) return;

			const uploadGrantId = res[0].serverData?.uploadGrantId;
			if (!uploadGrantId) {
				setLocalStagedGrantId(undefined);
				setLocalPreview(null);
				toast.error("Upload failed", {
					description: "The upload authorization handoff was missing.",
				});
				return;
			}

			const visualPreviewUrl = res[0].ufsUrl || res[0].url;
			setValue("imageUploadGrantId", uploadGrantId, {
				shouldDirty: true,
				shouldValidate: true,
			});
			setLocalPreview(visualPreviewUrl);
			setLocalStagedGrantId(uploadGrantId);
			toast.success("Category image uploaded successfully");
		},
		onUploadError: (error) => {
			setLocalStagedGrantId(undefined);
			setLocalPreview(null);
			setValue("imageUploadGrantId", undefined, {
				shouldDirty: true,
				shouldValidate: true,
			});
			toast.error("Upload failed", { description: error.message });
		},
	});

	const onDrop = useCallback(
		async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
			if (acceptedFiles?.length) {
				const file = acceptedFiles[0];
				const objectUrl = URL.createObjectURL(file);

				setLocalPreview(objectUrl);
				setLocalStagedGrantId(null);
				await startUpload([file], stage);
			}

			if (fileRejections?.length) {
				toast.error("Upload rejected", {
					description: fileRejections[0].errors[0].message,
				});
			}
		},
		[stage, startUpload],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { "image/png": [], "image/jpeg": [], "image/webp": [], "image/svg+xml": [] },
		maxFiles: 1,
		maxSize: 4 * 1024 * 1024,
	});

	const handleRemove = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!hasLocalStagedPreview) return;

		setLocalStagedGrantId(undefined);
		setLocalPreview(null);
		setValue("imageUploadGrantId", undefined, {
			shouldDirty: true,
			shouldValidate: true,
		});
	};

	const hasError = !!formState.errors?.imageUrl;

	return (
		<div className="flex flex-col items-center gap-4 w-full mb-6">
			<div
				{...getRootProps()}
				className={cn(
					"group relative flex flex-col items-center justify-center w-28 h-28 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden shadow-sm",
					isDragActive ? "border-primary bg-primary/5 scale-105" : "border-border bg-slate-50 dark:bg-white/2 hover:border-primary/50 hover:bg-slate-100 dark:hover:bg-white/5",
					preview && "border-solid border-border shadow-md",
					hasError && "border-destructive bg-destructive/5 hover:border-destructive/80",
				)}
			>
				<input {...getInputProps()} />

				{preview ? (
					<>
						<Image src={preview} alt="Category Icon" fill className="object-cover p-1 rounded-2xl" />

						<div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center">
							<Button
								type="button"
								size="icon"
								variant="destructive"
								onClick={handleRemove}
					disabled={!hasLocalStagedPreview}
					title={
						 hasLocalStagedPreview
										? "Clear staged image"
										: "Removing a persisted image is unavailable"
								}
								className="rounded-xl w-9 h-9 shadow-lg scale-90 group-hover:scale-100 transition-transform"
							>
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

				{isUploading && (
					<div className="absolute inset-0 bg-background/80 rounded-2xl backdrop-blur-md flex flex-col items-center justify-center gap-2 z-10">
						<Loader2 className="w-6 h-6 text-primary animate-spin" />
					</div>
				)}
			</div>

			<div className="text-center">
				<p className="text-[13px] text-foreground font-semibold">Category Image</p>
				<p className="text-[11px] text-muted-foreground mt-0.5">SVG or Transparent PNG recommended</p>
			</div>

			{hasError && (
				<p className="text-[12px] font-medium text-destructive mt-1 flex items-center gap-1.5">
					<div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse"></div>
					{formState.errors.imageUrl?.message as string}
				</p>
			)}
		</div>
	);
}

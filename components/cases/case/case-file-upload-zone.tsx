"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileIcon, X, CheckCircle2, Loader2, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function CaseFileUploadZone() {
	const [files, setFiles] = useState<any[]>([]);

	const onDrop = useCallback((acceptedFiles: File[]) => {
		// Mocking the upload process with a timeout
		const newFiles = acceptedFiles.map((file) => ({
			id: Math.random().toString(),
			name: file.name,
			size: (file.size / (1024 * 1024)).toFixed(2),
			progress: 0,
			status: "uploading",
		}));

		setFiles((prev) => [...prev, ...newFiles]);

		// Simulate progress for each file
		newFiles.forEach((file) => {
			let p = 0;
			const interval = setInterval(() => {
				p += Math.random() * 30;
				if (p >= 100) {
					p = 100;
					clearInterval(interval);
					setFiles((current) => current.map((f) => (f.id === file.id ? { ...f, progress: 100, status: "complete" } : f)));
				} else {
					setFiles((current) => current.map((f) => (f.id === file.id ? { ...f, progress: p } : f)));
				}
			}, 400);
		});
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"application/octet-stream": [".stl", ".obj", ".ply"],
			"image/*": [".jpg", ".jpeg", ".png"],
		},
	});

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Clinical Assets</h3>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Info className="w-3.5 h-3.5 text-muted-foreground" />
							</TooltipTrigger>
							<TooltipContent className="glass-ai-panel p-2 text-[10px] max-w-[200px]">Supported: 3D Scans (STL, OBJ) and Patient Photos. Max 50MB per file.</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<span className="text-[10px] font-mono text-muted-foreground">{files.length} Files Attached</span>
			</div>

			<div
				{...getRootProps()}
				className={cn(
					"relative group border-2 border-dashed rounded-2xl p-10 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer",
					isDragActive ? "border-primary bg-primary/5 scale-[1.01]" : "border-border bg-slate-50/50 dark:bg-white/2 hover:border-primary/40 hover:bg-slate-50 dark:hover:bg-white/5",
				)}
			>
				<input {...getInputProps()} />
				<div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
					<UploadCloud className={cn("w-6 h-6 transition-colors", isDragActive ? "text-primary" : "text-slate-400")} />
				</div>
				<p className="text-sm font-bold text-foreground">Click or Drag Scans & Photos</p>
				<p className="text-[11px] text-muted-foreground mt-1">STL, OBJ, PLY, PNG or JPG</p>
			</div>

			{/* ACTIVE UPLOAD LIST */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{files.map((file) => (
					<div key={file.id} className="lab-card p-4 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2">
						<div
							className={cn(
								"w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
								file.status === "complete" ? "bg-emerald-500/10 text-emerald-500" : "bg-primary/10 text-primary",
							)}
						>
							{file.status === "complete" ? <CheckCircle2 className="w-5 h-5" /> : <Loader2 className="w-5 h-5 animate-spin" />}
						</div>

						<div className="flex-1 min-w-0">
							<div className="flex items-center justify-between mb-1">
								<span className="text-xs font-bold text-foreground truncate max-w-[150px]">{file.name}</span>
								<span className="text-[10px] font-mono text-muted-foreground">{file.size} MB</span>
							</div>
							<Progress value={file.progress} className="h-1" />
						</div>

						<button className="text-muted-foreground hover:text-destructive transition-colors">
							<X className="w-4 h-4" />
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

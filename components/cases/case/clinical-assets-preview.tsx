"use client";

import { FileBox, ImageIcon, Eye, Trash2 } from "lucide-react";

export function ClinicalAssetPreview() {
	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{/* 3D SCAN CARD */}
				<div className="lab-card group relative overflow-hidden">
					<div className="aspect-square bg-slate-100 dark:bg-white/5 flex flex-col items-center justify-center p-6 text-center">
						<FileBox className="w-12 h-12 text-primary/40 mb-3" />
						<p className="text-[10px] font-bold text-primary uppercase tracking-widest">3D Scan (STL)</p>
						<p className="text-[11px] font-bold text-foreground mt-1 truncate w-full px-4">upper_jaw_final.stl</p>
					</div>
					<div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-2">
						<button className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
							<Eye className="w-4 h-4" />
						</button>
						<button className="w-9 h-9 rounded-xl bg-destructive text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
							<Trash2 className="w-4 h-4" />
						</button>
					</div>
				</div>

				{/* IMAGE CARD */}
				<div className="lab-card group relative overflow-hidden">
					<div className="aspect-square bg-slate-100 dark:bg-white/5 relative">
						{/* Mock Image Placeholder */}
						<div className="absolute inset-0 flex items-center justify-center">
							<ImageIcon className="w-12 h-12 text-slate-300 dark:text-zinc-700" />
						</div>
						<div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/60 to-transparent">
							<p className="text-[10px] font-bold text-white truncate">shade_matching_side_view.jpg</p>
						</div>
					</div>
					<div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-2">
						<button className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
							<Eye className="w-4 h-4" />
						</button>
						<button className="w-9 h-9 rounded-xl bg-destructive text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
							<Trash2 className="w-4 h-4" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export function FilterChip({ label, onRemove, variant = "default" }: { label: string; onRemove: () => void; variant?: "default" | "ai" | "danger" }) {
	return (
		<div
			className={cn(
				"flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider shadow-sm",
				variant === "ai"
					? "bg-ai/5 border-ai/20 text-ai"
					: variant === "danger"
						? "bg-rose-500/5 border-rose-500/20 text-rose-600 dark:text-rose-500"
						: "bg-background border-border text-foreground",
			)}
		>
			{label}
			<button title="Dismiss filter" onClick={onRemove} className="hover:text-rose-500 transition-colors">
				<X className="w-3 h-3" />
			</button>
		</div>
	);
}

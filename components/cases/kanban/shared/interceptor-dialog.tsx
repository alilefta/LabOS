"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { memo } from "react";

interface KanbanInterceptorDialogProps {
	isOpen: boolean;
	isUpdating: boolean;
	warningMessage: string | null;
	onCancel: () => void;
	onConfirm: () => void;
}

export const KanbanInterceptorDialog = memo(function KanbanInterceptorDialog({ isOpen, isUpdating, warningMessage, onCancel, onConfirm }: KanbanInterceptorDialogProps) {
	return (
		<AlertDialog open={isOpen} onOpenChange={(open) => !open && !isUpdating && onCancel()}>
			<AlertDialogContent className="rounded-2xl border-border shadow-premium dark:bg-[#121214] z-100">
				<AlertDialogHeader>
					<div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border bg-amber-500/10 border-amber-500/20 text-amber-500">
						<AlertTriangle className="w-6 h-6" />
					</div>
					<AlertDialogTitle className="text-xl font-bold tracking-tight">Production Warning</AlertDialogTitle>
					<AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed mt-2">{warningMessage}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="mt-6 gap-3 sm:gap-0">
					<AlertDialogCancel disabled={isUpdating} onClick={onCancel} className="rounded-xl h-10 font-semibold border-border hover:bg-secondary">
						Cancel Move
					</AlertDialogCancel>
					<AlertDialogAction
						disabled={isUpdating}
						onClick={(e) => {
							e.preventDefault(); // Prevent auto-close so we can show spinner
							onConfirm();
						}}
						className="rounded-xl h-10 bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-sm"
					>
						{isUpdating && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
						Continue Anyway
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
});

"use client";

import { useAction } from "next-safe-action/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCcw, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { syncOverdueInvoicesAction } from "@/actions/invoices/admin-actions/sync-overdue-invoices-action";
import { handleSafeActionError } from "@/lib/safe-action-helpers";

interface Props {
	labId: string;
}

export function SyncLedgerButton({ labId }: Props) {
	const queryClient = useQueryClient();

	const { executeAsync: syncLedger, isExecuting } = useAction(syncOverdueInvoicesAction, {
		onSuccess: ({ data }) => {
			const count = data.updatedCount;

			// 1. INVALIDATE ALL INVOICING CACHES [3]
			// This instantly refreshes your Vitals, Risk Radar, and Data Table!
			queryClient.invalidateQueries({ queryKey: ["ar-vitals", labId] });
			queryClient.invalidateQueries({ queryKey: ["invoices-list", labId] });
			queryClient.invalidateQueries({ queryKey: ["ar-risk-radar", labId] });

			// 2. High-UX Toast feedback [4]
			if (count > 0) {
				toast.success("Ledger Synchronized", {
					description: `${count} invoice(s) officially marked as past due.`,
				});
			} else {
				toast.success("Ledger Synchronized", {
					description: "All accounts are currently in good standing.",
				});
			}
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	return (
		<Button
			variant="outline"
			type="button"
			disabled={isExecuting}
			onClick={() => syncLedger()}
			className={cn("h-10 rounded-xl border-border bg-white dark:bg-white/5 text-foreground font-semibold shadow-sm transition-all text-xs", isExecuting && "opacity-80")}
		>
			{isExecuting ? (
				<LoaderCircle className="w-4 h-4 mr-2 animate-spin text-primary" />
			) : (
				<RefreshCcw className="w-4 h-4 mr-2 text-muted-foreground group-hover:text-foreground transition-colors" />
			)}
			<span>{isExecuting ? "Syncing..." : "Sync Ledger"}</span>
		</Button>
	);
}

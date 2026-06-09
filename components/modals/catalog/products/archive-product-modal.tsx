'use client'

import { memo, useCallback } from 'react'
import { toast } from 'sonner'
import { Archive } from 'lucide-react'
// import { useAction } from "next-safe-action/hooks";

import { DestructiveActionModal } from '@/components/ui/custom/destructive-action-modal'
// import { archiveProductAction } from "@/actions/catalog/products/archive-product";

interface ArchiveProductModalProps {
	isOpen: boolean
	onClose: () => void
	productId: string
	productName: string
	isCurrentlyArchived: boolean
	onSuccess?: () => void
}

export const ArchiveProductModal = memo(function ArchiveProductModal({
	isOpen,
	onClose,
	productId,
	productName,
	isCurrentlyArchived,
	onSuccess,
}: ArchiveProductModalProps) {
	// --- SERVER ACTION (Commented out for now) ---
	const isExecuting = false

	/*
	const { executeAsync: toggleArchiveStatus, isExecuting } = useAction(archiveProductAction, {
		onSuccess: () => {
			toast.success(
				isCurrentlyArchived 
					? `${productName} restored to active catalog.` 
					: `${productName} archived successfully.`
			);
			if (onSuccess) onSuccess();
			onClose();
		},
		onError: ({ error }) => {
			toast.error(error.serverError?.message || "Failed to update product status.");
		}
	});
	*/

	const handleConfirm = useCallback(async () => {
		console.log(
			`Toggling archive status for product ${productId}. Current state: ${isCurrentlyArchived}`,
		)

		// MOCK EXECUTION
		toast.success(
			isCurrentlyArchived
				? `${productName} restored to active catalog.`
				: `${productName} archived successfully.`,
		)
		if (onSuccess) onSuccess()
		onClose()

		// REAL EXECUTION
		// await toggleArchiveStatus({ id: productId, archive: !isCurrentlyArchived });
	}, [productId, productName, isCurrentlyArchived, onSuccess, onClose])

	// --- DYNAMIC CONTENT BASED ON STATE ---
	const title = isCurrentlyArchived ? 'Restore Product' : 'Archive Product'

	const description = isCurrentlyArchived
		? `Are you sure you want to restore "${productName}" to the active catalog?`
		: `Are you sure you want to archive "${productName}"?`

	const warningText = isCurrentlyArchived
		? 'Restoring this product will immediately make it available for technicians and receptionists to select on new case prescriptions.'
		: 'Archiving this product will hide it from the New Case prescription screen. Existing active cases and historical invoices using this product will remain unaffected.'

	const actionLabel = isCurrentlyArchived
		? 'Restore Product'
		: 'Archive Product'

	return (
		<DestructiveActionModal
			isOpen={isOpen}
			onClose={onClose}
			isExecuting={isExecuting}
			onConfirm={handleConfirm}
			icon={Archive}
			title={title}
			description={description}
			warningText={warningText}
			actionLabel={actionLabel}
		/>
	)
})

ArchiveProductModal.displayName = 'ArchiveProductModal'

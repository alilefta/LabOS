'use client'

import { memo, useCallback } from 'react'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'
// import { useAction } from "next-safe-action/hooks";

import { DestructiveActionModal } from '@/components/ui/custom/destructive-action-modal'
import { useAction } from 'next-safe-action/hooks'
import { deleteProductAction } from '@/actions/catalog/products/delete-product'
// import { deleteProductAction } from "@/actions/catalog/products/delete-product";

interface DeleteProductModalProps {
	isOpen: boolean
	onClose: () => void
	productId: string
	productName: string
	onSuccess?: () => void
}

export const DeleteProductModal = memo(function DeleteProductModal({
	isOpen,
	onClose,
	productId,
	productName,
	onSuccess,
}: DeleteProductModalProps) {
	// --- SERVER ACTION (Commented out for now) ---

	const { executeAsync: deleteProduct, isExecuting } = useAction(
		deleteProductAction,
		{
			onSuccess: () => {
				toast.success(`${productName} deleted permanently.`)
				if (onSuccess) onSuccess()
				onClose()
			},
			onError: ({ error }) => {
				toast.error(error.serverError?.message || 'Failed to delete product.')
			},
		},
	)

	const handleConfirm = useCallback(async () => {
		await deleteProduct({ id: productId })
	}, [productId, deleteProduct])

	return (
		<DestructiveActionModal
			isOpen={isOpen}
			onClose={onClose}
			isExecuting={isExecuting}
			onConfirm={handleConfirm}
			icon={Trash2} // Using Trash2 for hard deletes instead of Archive
			title="Permanently Delete Product"
			description={`Are you completely sure you want to delete "${productName}"? This action cannot be undone.`}
			warningText="This action is only allowed if the product has never been used in a clinical case. If this product is linked to existing data, the deletion will be rejected by the server to protect accounting history. We strongly recommend Archiving instead."
			actionLabel="Delete Permanently"
			requireConfirmationText="DELETE" // <--- The Security Barrier!
		/>
	)
})

DeleteProductModal.displayName = 'DeleteProductModal'

'use client'

import { memo, useCallback } from 'react'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'

import { DestructiveActionModal } from '@/components/ui/custom/destructive-action-modal'
import { handleSafeActionError } from '@/lib/safe-action-helpers'
import { deleteCategoryAction } from '@/actions/catalog/categories/delete-category'

interface DeleteCategoryModalProps {
	isOpen: boolean
	onClose: () => void
	categoryId: string
	categoryName: string
	onSuccess?: () => void
}

export const DeleteCategoryModal = memo(function DeleteCategoryModal({
	isOpen,
	onClose,
	categoryId,
	categoryName,
	onSuccess,
}: DeleteCategoryModalProps) {
	// --- REAL SERVER ACTION ---
	const { executeAsync: deleteCategory, isExecuting } = useAction(
		deleteCategoryAction,
		{
			onSuccess: () => {
				toast.success(`Category "${categoryName}" deleted permanently.`)
				if (onSuccess) onSuccess()
				onClose()
			},
			onError: ({ error }) => {
				handleSafeActionError(error)
			},
		},
	)

	const handleConfirm = useCallback(async () => {
		console.log(`Hard deleting Category ${categoryId}.`)
		await deleteCategory({ id: categoryId })
	}, [categoryId, deleteCategory])

	return (
		<DestructiveActionModal
			isOpen={isOpen}
			onClose={onClose}
			isExecuting={isExecuting}
			onConfirm={handleConfirm}
			icon={Trash2} // Using Trash2 to visually distinguish from Soft-Delete/Archive
			title="Permanently Delete Category"
			description={`Are you completely sure you want to delete "${categoryName}"? This action cannot be undone.`}
			warningText="This is a top-level category. Deleting it will trigger a CASCADE DELETE, instantly destroying all Departments, Products, and Pricing Plans nested inside it. The server will reject this action if ANY of those nested items have ever been used in a clinical case."
			actionLabel="Delete Category Tree"
			requireConfirmationText={categoryName} // <--- Strict Security Barrier!
		/>
	)
})

DeleteCategoryModal.displayName = 'DeleteCategoryModal'

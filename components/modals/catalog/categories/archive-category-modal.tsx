'use client'

import { memo, useCallback } from 'react'
import { toast } from 'sonner'
import { Archive, RotateCcw } from 'lucide-react'

import { DestructiveActionModal } from '@/components/ui/custom/destructive-action-modal'
import { useAction } from 'next-safe-action/hooks'
import { toggleArchiveCategoryAction } from '@/actions/catalog/categories/archive-category'

interface ArchiveCategoryModalProps {
	isOpen: boolean
	onClose: () => void
	categoryId: string
	categoryName: string
	isCurrentlyArchived: boolean
	onSuccess?: () => void
}

export const ArchiveCategoryModal = memo(function ArchiveCategoryModal({
	isOpen,
	onClose,
	categoryId,
	categoryName,
	isCurrentlyArchived,
	onSuccess,
}: ArchiveCategoryModalProps) {
	const { executeAsync: toggleArchiveStatus, isExecuting } = useAction(
		toggleArchiveCategoryAction,
		{
			onSuccess: () => {
				toast.success(
					isCurrentlyArchived
						? `${categoryName} category restored to active catalog.`
						: `${categoryName} category archived.`,
				)
				if (onSuccess) onSuccess()
				onClose()
			},
			onError: ({ error }) => {
				toast.error(
					error.serverError?.message || 'Failed to update category status.',
				)
			},
		},
	)

	const handleConfirm = useCallback(async () => {
		console.log(
			`Toggling archive status for category ${categoryId}. Current state: ${isCurrentlyArchived}`,
		)

		await toggleArchiveStatus({
			id: categoryId,
			isArchived: !isCurrentlyArchived,
		})
	}, [categoryId, isCurrentlyArchived, toggleArchiveStatus])

	// --- DYNAMIC CONTENT BASED ON STATE ---
	const title = isCurrentlyArchived ? 'Restore Category' : 'Archive Category'
	const Icon = isCurrentlyArchived ? RotateCcw : Archive

	const description = isCurrentlyArchived
		? `Are you sure you want to restore "${categoryName}"?`
		: `Are you sure you want to archive the "${categoryName}" category?`

	const warningText = isCurrentlyArchived
		? 'Restoring this top-level category will immediately make all of its nested departments, products, and pricing plans visible again in the New Case prescription screen.'
		: 'This is a top-level category. Archiving it will hide it, AND EVERYTHING NESTED INSIDE IT (all departments, products, and pricing plans), from the New Case screen. Existing active cases will remain completely unaffected.'

	const actionLabel = isCurrentlyArchived
		? 'Restore Category'
		: 'Archive Category'

	return (
		<DestructiveActionModal
			isOpen={isOpen}
			onClose={onClose}
			isExecuting={isExecuting}
			onConfirm={handleConfirm}
			icon={Icon}
			title={title}
			description={description}
			warningText={warningText}
			actionLabel={actionLabel}
		/>
	)
})

ArchiveCategoryModal.displayName = 'ArchiveCategoryModal'

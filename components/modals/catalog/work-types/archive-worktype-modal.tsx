'use client'

import { memo, useCallback } from 'react'
import { toast } from 'sonner'
import { Archive, RotateCcw } from 'lucide-react'

import { DestructiveActionModal } from '@/components/ui/custom/destructive-action-modal'
import { toggleArchiveWorkTypeAction } from '@/actions/catalog/worktypes/archive-worktype'
import { useAction } from 'next-safe-action/hooks'

interface ArchiveWorkTypeModalProps {
	isOpen: boolean
	onClose: () => void
	workTypeId: string
	workTypeName: string
	isCurrentlyArchived: boolean
	onSuccess?: () => void
}

export const ArchiveWorkTypeModal = memo(function ArchiveWorkTypeModal({
	isOpen,
	onClose,
	workTypeId,
	workTypeName,
	isCurrentlyArchived,
	onSuccess,
}: ArchiveWorkTypeModalProps) {
	const { executeAsync: toggleArchiveStatus, isExecuting } = useAction(
		toggleArchiveWorkTypeAction,
		{
			onSuccess: () => {
				toast.success(
					isCurrentlyArchived
						? `${workTypeName} department restored.`
						: `${workTypeName} department archived.`,
				)
				if (onSuccess) onSuccess()
				onClose()
			},
			onError: ({ error }) => {
				toast.error(
					error.serverError?.message || 'Failed to update work type status.',
				)
			},
		},
	)

	const handleConfirm = useCallback(async () => {
		console.log(
			`Toggling archive status for work type ${workTypeId}. Current state: ${isCurrentlyArchived}`,
		)

		await toggleArchiveStatus({
			id: workTypeId,
			isArchived: !isCurrentlyArchived,
		})
	}, [workTypeId, isCurrentlyArchived, toggleArchiveStatus])

	// --- DYNAMIC CONTENT BASED ON STATE ---
	const title = isCurrentlyArchived
		? 'Restore Department'
		: 'Archive Department'
	const Icon = isCurrentlyArchived ? RotateCcw : Archive

	const description = isCurrentlyArchived
		? `Are you sure you want to restore "${workTypeName}"?`
		: `Are you sure you want to archive the "${workTypeName}" department?`

	const warningText = isCurrentlyArchived
		? 'Restoring this Work Type will immediately make all of its nested products and pricing plans visible again in the New Case prescription screen.'
		: 'Archiving this Work Type will hide it, ALONG WITH all of its nested products and pricing plans, from the New Case screen. Existing active cases and invoices will remain completely unaffected.'

	const actionLabel = isCurrentlyArchived
		? 'Restore Department'
		: 'Archive Department'

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

ArchiveWorkTypeModal.displayName = 'ArchiveWorkTypeModal'

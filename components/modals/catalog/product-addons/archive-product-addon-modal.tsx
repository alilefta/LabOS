'use client'

import { memo, useCallback } from 'react'
import { toast } from 'sonner'
import { Archive, RotateCcw } from 'lucide-react'

import { DestructiveActionModal } from '@/components/ui/custom/destructive-action-modal'
import { toggleArchiveProductAddonAction } from '@/actions/catalog/product-addons/archive-addon'
import { useAction } from 'next-safe-action/hooks'

interface ArchiveProductAddonModalProps {
	isOpen: boolean
	onClose: () => void
	addonId: string
	addonName: string
	isCurrentlyArchived: boolean
	onSuccess?: () => void
}

export const ArchiveProductAddonModal = memo(function ArchiveProductAddonModal({
	isOpen,
	onClose,
	addonId,
	addonName,
	isCurrentlyArchived,
	onSuccess,
}: ArchiveProductAddonModalProps) {
	// --- SERVER ACTION (Commented out for now) ---

	const { executeAsync: toggleArchiveStatus, isExecuting } = useAction(
		toggleArchiveProductAddonAction,
		{
			onSuccess: () => {
				toast.success(
					isCurrentlyArchived
						? `Add-on "${addonName}" restored to active catalog.`
						: `Add-on "${addonName}" archived successfully.`,
				)
				if (onSuccess) onSuccess()
				onClose()
			},
			onError: ({ error }) => {
				toast.error(
					error.serverError?.message || 'Failed to update add-on status.',
				)
			},
		},
	)

	const handleConfirm = useCallback(async () => {
		if (onSuccess) onSuccess()
		onClose()

		await toggleArchiveStatus({ id: addonId, isArchived: !isCurrentlyArchived })
	}, [addonId, isCurrentlyArchived, onSuccess, onClose, toggleArchiveStatus])

	// --- DYNAMIC CONTENT BASED ON STATE ---
	const title = isCurrentlyArchived ? 'Restore Add-on' : 'Archive Add-on'
	const Icon = isCurrentlyArchived ? RotateCcw : Archive

	const description = isCurrentlyArchived
		? `Are you sure you want to restore "${addonName}" as an active option?`
		: `Are you sure you want to archive the "${addonName}" add-on?`

	const warningText = isCurrentlyArchived
		? 'Restoring this add-on will immediately make it available for technicians to attach to new case prescriptions.'
		: 'Archiving this add-on will hide it from the New Case prescription screen. Because your system takes financial snapshots, existing active cases and historical invoices using this add-on will remain completely unaffected.'

	const actionLabel = isCurrentlyArchived ? 'Restore Add-on' : 'Archive Add-on'

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

ArchiveProductAddonModal.displayName = 'ArchiveProductAddonModal'

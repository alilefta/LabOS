'use client'

import { memo, useCallback } from 'react'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'

import { DestructiveActionModal } from '@/components/ui/custom/destructive-action-modal'
import { useAction } from 'next-safe-action/hooks'
import { deleteProductAddonAction } from '@/actions/catalog/product-addons/delete-addon'

interface DeleteProductAddonModalProps {
	isOpen: boolean
	onClose: () => void
	addonId: string
	addonName: string
	onSuccess?: () => void
}

export const DeleteProductAddonModal = memo(function DeleteProductAddonModal({
	isOpen,
	onClose,
	addonId,
	addonName,
	onSuccess,
}: DeleteProductAddonModalProps) {
	const { executeAsync: deleteAddon, isExecuting } = useAction(
		deleteProductAddonAction,
		{
			onSuccess: () => {
				toast.success(`Add-on "${addonName}" deleted permanently.`)
				if (onSuccess) onSuccess()
				onClose()
			},
			onError: ({ error }) => {
				toast.error(error.serverError?.message || 'Failed to delete add-on.')
			},
		},
	)

	const handleConfirm = useCallback(async () => {
		await deleteAddon({ id: addonId })
	}, [addonId, deleteAddon])

	return (
		<DestructiveActionModal
			isOpen={isOpen}
			onClose={onClose}
			isExecuting={isExecuting}
			onConfirm={handleConfirm}
			icon={Trash2}
			title="Delete Product Add-on"
			description={`Are you sure you want to permanently delete "${addonName}"?`}
			warningText="This action will permanently erase the add-on from the catalog. The server will automatically reject this deletion to protect your financial records if this add-on has EVER been attached to a clinical case. If it has been used, you must Archive it instead."
			actionLabel="Delete Add-on"
			requireConfirmationText="DELETE" // Standard leaf-node security barrier
		/>
	)
})

DeleteProductAddonModal.displayName = 'DeleteProductAddonModal'

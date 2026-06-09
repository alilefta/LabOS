'use client'

import { memo, useCallback } from 'react'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'
// import { useAction } from "next-safe-action/hooks";

import { DestructiveActionModal } from '@/components/ui/custom/destructive-action-modal'
// import { deleteWorkTypeAction } from "@/actions/catalog/work-types/delete-work-type";

interface DeleteWorkTypeModalProps {
	isOpen: boolean
	onClose: () => void
	workTypeId: string
	workTypeName: string
	onSuccess?: () => void
}

export const DeleteWorkTypeModal = memo(function DeleteWorkTypeModal({
	isOpen,
	onClose,
	workTypeId,
	workTypeName,
	onSuccess,
}: DeleteWorkTypeModalProps) {
	// --- SERVER ACTION (Commented out for now) ---
	const isExecuting = false

	/*
	const { executeAsync: deleteWorkType, isExecuting } = useAction(deleteWorkTypeAction, {
		onSuccess: () => {
			toast.success(`${workTypeName} department deleted permanently.`);
			if (onSuccess) onSuccess();
			onClose();
		},
		onError: ({ error }) => {
			toast.error(error.serverError?.message || "Failed to delete work type department.");
		}
	});
	*/

	const handleConfirm = useCallback(async () => {
		console.log(`Hard deleting work type ${workTypeId}.`)

		// MOCK EXECUTION
		toast.success(`"${workTypeName}" has been permanently deleted.`)
		if (onSuccess) onSuccess()
		onClose()

		// REAL EXECUTION
		// await deleteWorkType({ id: workTypeId });
	}, [workTypeId, workTypeName, onSuccess, onClose])

	return (
		<DestructiveActionModal
			isOpen={isOpen}
			onClose={onClose}
			isExecuting={isExecuting}
			onConfirm={handleConfirm}
			icon={Trash2}
			title="Delete Department"
			description={`Are you completely sure you want to delete the "${workTypeName}" department?`}
			warningText="Deleting this Work Type will also permanently delete all Products and Pricing Plans nested inside it. This action cannot be undone. If any of these items are linked to existing cases, the database will reject the deletion to preserve clinical history."
			actionLabel="Delete Department"
			requireConfirmationText={workTypeName} // <--- Forces them to type the actual name!
		/>
	)
})

DeleteWorkTypeModal.displayName = 'DeleteWorkTypeModal'

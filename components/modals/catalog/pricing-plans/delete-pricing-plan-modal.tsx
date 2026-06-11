'use client'

import { memo, useCallback } from 'react'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'
// import { useAction } from "next-safe-action/hooks";

import { DestructiveActionModal } from '@/components/ui/custom/destructive-action-modal'
import { useAction } from 'next-safe-action/hooks'
// import { deletePricingPlanAction } from "@/actions/catalog/pricing-plans/delete-pricing-plan";

interface DeletePricingPlanModalProps {
	isOpen: boolean
	onClose: () => void
	pricingPlanId: string
	pricingPlanName: string
	onSuccess?: () => void
}

export const DeletePricingPlanModal = memo(function DeletePricingPlanModal({
	isOpen,
	onClose,
	pricingPlanId,
	pricingPlanName,
	onSuccess,
}: DeletePricingPlanModalProps) {
	// --- SERVER ACTION (Commented out for now) ---
	const isExecuting = false
	// const { executeAsync: deletePricingPlan, isExecuting } = useAction(
	// 	deletePricingPlanAction,
	// 	{
	// 		onSuccess: () => {
	// 			toast.success(`Pricing plan "${pricingPlanName}" deleted permanently.`)
	// 			if (onSuccess) onSuccess()
	// 			onClose()
	// 		},
	// 		onError: ({ error }) => {
	// 			toast.error(
	// 				error.serverError?.message || 'Failed to delete pricing plan.',
	// 			)
	// 		},
	// 	},
	// )

	const handleConfirm = useCallback(async () => {
		console.log(`Hard deleting pricing plan ${pricingPlanId}.`)

		// await deletePricingPlan({ id: pricingPlanId });
	}, [pricingPlanId, pricingPlanName, onSuccess, onClose])

	return (
		<DestructiveActionModal
			isOpen={isOpen}
			onClose={onClose}
			isExecuting={isExecuting}
			onConfirm={handleConfirm}
			icon={Trash2}
			title="Delete Pricing Plan"
			description={`Are you sure you want to permanently delete "${pricingPlanName}"?`}
			warningText="This will remove the pricing plan from the catalog. Historical cases and generated invoices that already used this rate will NOT be affected. However, you will not be able to select this rate for any future cases."
			actionLabel="Delete Pricing Plan"
			requireConfirmationText="DELETE"
		/>
	)
})

DeletePricingPlanModal.displayName = 'DeletePricingPlanModal'

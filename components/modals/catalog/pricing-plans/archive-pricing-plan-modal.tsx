'use client'

import { memo, useCallback } from 'react'
import { toast } from 'sonner'
import { Archive, RotateCcw } from 'lucide-react'

import { DestructiveActionModal } from '@/components/ui/custom/destructive-action-modal'
import { toggleArchivePricingPlanAction } from '@/actions/catalog/pricing-plans/archive-pricing-plan'
import { useAction } from 'next-safe-action/hooks'

interface ArchivePricingPlanModalProps {
	isOpen: boolean
	onClose: () => void
	pricingPlanId: string
	pricingPlanName: string
	isCurrentlyArchived: boolean
	onSuccess?: () => void
}

export const ArchivePricingPlanModal = memo(function ArchivePricingPlanModal({
	isOpen,
	onClose,
	pricingPlanId,
	pricingPlanName,
	isCurrentlyArchived,
	onSuccess,
}: ArchivePricingPlanModalProps) {
	// --- SERVER ACTION (Commented out for now) ---

	const { executeAsync: toggleArchiveStatus, isExecuting } = useAction(
		toggleArchivePricingPlanAction,
		{
			onSuccess: () => {
				toast.success(
					isCurrentlyArchived
						? `${pricingPlanName} restored to active pricing tiers.`
						: `${pricingPlanName} archived successfully.`,
				)
				if (onSuccess) onSuccess()
				onClose()
			},
			onError: ({ error }) => {
				toast.error(
					error.serverError?.message || 'Failed to update pricing plan status.',
				)
			},
		},
	)

	const handleConfirm = useCallback(async () => {
		console.log(
			`Toggling archive status for pricing plan ${pricingPlanId}. Current state: ${isCurrentlyArchived}`,
		)

		// REAL EXECUTION
		await toggleArchiveStatus({
			id: pricingPlanId,
			isArchived: !isCurrentlyArchived,
		})
	}, [pricingPlanId, isCurrentlyArchived, toggleArchiveStatus])

	// --- DYNAMIC CONTENT BASED ON STATE ---
	const title = isCurrentlyArchived
		? 'Restore Pricing Plan'
		: 'Archive Pricing Plan'
	const Icon = isCurrentlyArchived ? RotateCcw : Archive

	const description = isCurrentlyArchived
		? `Are you sure you want to restore "${pricingPlanName}" to your active pricing tiers?`
		: `Are you sure you want to archive "${pricingPlanName}"?`

	const warningText = isCurrentlyArchived
		? 'Restoring this plan will make it immediately available to be selected as the billing rate on new case prescriptions.'
		: 'Archiving this plan removes it from the New Case selection menus. Any existing active cases or completed invoices currently using this rate will remain completely unaffected.'

	const actionLabel = isCurrentlyArchived
		? 'Restore Pricing Plan'
		: 'Archive Pricing Plan'

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

ArchivePricingPlanModal.displayName = 'ArchivePricingPlanModal'
